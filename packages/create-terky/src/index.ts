import { defaultDir, FRAMEWORKS, isEmpty, mkdirSync} from './utils.ts'
import { createRepo } from './actions/git.ts'
import { green, red, reset,  } from 'kolorist'
import prompts from 'prompts'
import path from "path"
import ora from 'ora'
async function main () {
  const result = await prompts([
    {
      type: 'text',
      name: 'projectName',
      message: reset('👉 项目名称 | Project name:'),
      initial: defaultDir
    },
    {
      type: 'select',
      name: 'template',
      message: reset('👉 选择模板 | Select template:'),
      choices: FRAMEWORKS.map((framework) => ({
          title: framework.color(framework.name),
          value: framework.value,
      }))
    }
  ], {
    onCancel: () => {
      console.log(red('✖') + '操作被取消 | Operation canceled')
    }
  })
  const { projectName, template } = result
  const root = path.join(process.cwd(), projectName)
  if (isEmpty(root)) {
    console.log(red('✖') + `目录已存在 | Directory already exists: /${projectName}`)
    return
  }
  await createRepo(root, template,)
  console.log(green('✔') + `创建成功 | Created successfully`)
  console.log(`\n`)
  console.log(`👉 进入目录 | cd ${projectName}`)
  console.log(`\n`)
  console.log(`👉 安装依赖 | npm install`)
  console.log(`\n`)
  console.log(`👉 启动项目 | npm run start`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
