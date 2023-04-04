import { createReadStream, createWriteStream } from 'fs';
import { existsSync, readdirSync } from 'fs';
import path, { dirname } from "path";
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const createRepo = async (targetDir: string, template: string) => {
    if (!existsSync(targetDir)) {
        console.error(`Target directory '${targetDir}' does not exist.`);
        process.exit(1);
      }
    const sourceDir = path.join(__dirname, `../../${template}`)
      readdirSync(sourceDir).forEach((file: string) => {
        const srcFilePath = path.join(sourceDir, file);
        const destFilePath = path.join(targetDir, file);
      
        const readStream = createReadStream(srcFilePath); // 创建读取流对象 
        const writeStream = createWriteStream(destFilePath);//创建写流对象 
      
        readStream.pipe(writeStream);
      })
 }
