import { d as defaultDir, F as FRAMEWORKS, i as isEmpty, m as mkdirSync } from './shared/create-terky.71171732.mjs';
import { existsSync, readdirSync, createReadStream, createWriteStream } from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { reset, red } from 'kolorist';
import prompts from 'prompts';
import ora from 'ora';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createRepo = async (targetDir, template) => {
  if (!existsSync(targetDir)) {
    console.error(`Target directory '${targetDir}' does not exist.`);
    process.exit(1);
  }
  const sourceDir = path.join(__dirname, `../../${template}`);
  readdirSync(sourceDir).forEach((file) => {
    const srcFilePath = path.join(sourceDir, file);
    const destFilePath = path.join(targetDir, file);
    const readStream = createReadStream(srcFilePath);
    const writeStream = createWriteStream(destFilePath);
    readStream.pipe(writeStream);
  });
};

async function main() {
  const result = await prompts([
    {
      type: "text",
      name: "projectName",
      message: reset("\u{1F449} \u9879\u76EE\u540D\u79F0 | Project name:"),
      initial: defaultDir
    },
    {
      type: "select",
      name: "template",
      message: reset("\u{1F449} \u9009\u62E9\u6A21\u677F | Select template:"),
      choices: FRAMEWORKS.map((framework) => ({
        title: framework.color(framework.name),
        value: framework.value
      }))
    }
  ], {
    onCancel: () => {
      console.log(red("\u2716") + "\u64CD\u4F5C\u88AB\u53D6\u6D88 | Operation canceled");
    }
  });
  const spinner = ora("\u6B63\u5728\u521B\u5EFA\u9879\u76EE | Creating project...").start();
  const { projectName, template } = result;
  const root = path.join(process.cwd(), projectName);
  if (isEmpty(root)) {
    console.log(red("\u2716") + `\u76EE\u5F55\u5DF2\u5B58\u5728 | Directory already exists: /${projectName}`);
    ora().fail("\u521B\u5EFA\u5931\u8D25 | Create failed");
    spinner.stop();
    return;
  }
  await mkdirSync(projectName);
  await createRepo(root, template);
  spinner.succeed("\u521B\u5EFA\u6210\u529F | Create success");
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
