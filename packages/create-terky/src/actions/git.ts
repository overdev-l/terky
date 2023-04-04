import path, { dirname } from "path";
import { fileURLToPath } from 'url';
import { execa } from 'execa'
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const createRepo = async (targetDir: string, template: string) => {
  const filePath = path.join(__dirname, `./${template}`)
  await execa('cp', ['-r',filePath, targetDir])
}
