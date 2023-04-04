import { d as defaultDir, F as FRAMEWORKS, i as isEmpty } from './shared/create-terky.d81616f2.mjs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import { execa } from 'execa';
import { reset, red, green } from 'kolorist';
import prompts from 'prompts';
import 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const createRepo = async (targetDir, template) => {
  const filePath = path.join(__dirname, `../${template}`);
  await execa("cp", ["-r", filePath, targetDir]);
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
  const { projectName, template } = result;
  const root = path.join(process.cwd(), projectName);
  if (isEmpty(root)) {
    console.log(red("\u2716") + `\u76EE\u5F55\u5DF2\u5B58\u5728 | Directory already exists: /${projectName}`);
    return;
  }
  await createRepo(root, template);
  console.log(green("\u2714") + `\u521B\u5EFA\u6210\u529F | Created successfully`);
  console.log(`
`);
  console.log(`\u{1F449} \u8FDB\u5165\u76EE\u5F55 | cd ${projectName}`);
  console.log(`
`);
  console.log(`\u{1F449} \u5B89\u88C5\u4F9D\u8D56 | npm install`);
  console.log(`
`);
  console.log(`\u{1F449} \u542F\u52A8\u9879\u76EE | npm run start`);
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
