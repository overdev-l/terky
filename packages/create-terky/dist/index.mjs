import { yellow, blue, reset, red } from 'kolorist';
import fs from 'fs';
import { execa } from 'execa';
import fs$1 from 'fs-extra';
import os from 'os';
import prompts from 'prompts';
import path from 'path';
import ora from 'ora';

const defaultDir = "terky-app";
const FRAMEWORKS = [
  {
    name: "vue3",
    display: "JavaScript",
    color: yellow,
    value: "template-vue3"
  },
  {
    name: "vue3-ts",
    display: "TypeScript",
    color: blue,
    value: "template-vue3-ts"
  }
];
const isEmpty = (dir) => fs.existsSync(dir);
const mkdirSync = (dir) => fs.mkdirSync(dir);

const createRepo = async (dir, template, spinner) => {
  const filePath = ".git/info/sparse-checkout";
  const foldersToPull = `/packages/create-terky/${template}/*${os.EOL}`;
  const sourceDir = `${dir}/packages/create-terky/${template}`;
  await execa("git", ["init"], { cwd: dir });
  await execa("git", ["remote", "add", "-f", "origin", "git@github.com:overdev-l/terky.git"], { cwd: dir });
  await execa("git", ["config", "core.sparsecheckout", "true"], { cwd: dir });
  spinner.text = "\u6B63\u5728\u62C9\u53D6\u6A21\u677F | Pulling template...";
  await fs$1.writeFileSync(`${dir}/${filePath}`, foldersToPull, { encoding: "utf-8" });
  await execa("git", ["pull", "origin", "master"], { cwd: dir });
  await fs$1.copy(sourceDir, dir);
  await execa("rm", ["-rf", ".git"], { cwd: dir });
  await execa("rm", ["-rf", "packages"], { cwd: dir });
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
  spinner.text = "\u6B63\u5728\u521B\u5EFA\u76EE\u5F55 | Creating directory...";
  await mkdirSync(projectName);
  await createRepo(root, template, spinner);
  spinner.succeed("\u521B\u5EFA\u6210\u529F | Create success");
}
main().catch((err) => {
  console.error(err);
  process.exit(1);
});
