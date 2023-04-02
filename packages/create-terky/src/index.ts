import { defaultDir, FRAMEWORKS, isEmpty, mkdirSync} from './utils.ts'
import { createRepo } from './actions/git.ts'
import { red, reset,  } from 'kolorist'
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
  const spinner = ora('正在创建项目 | Creating project...').start()
  const { projectName, template } = result
  const root = path.join(process.cwd(), projectName)
  if (isEmpty(root)) {
    console.log(red('✖') + `目录已存在 | Directory already exists: /${projectName}`)
    ora().fail('创建失败 | Create failed')
    spinner.stop()
    return
  }
  spinner.text = '正在创建目录 | Creating directory...'
  await mkdirSync(projectName)
  await createRepo(root, template, spinner)
  spinner.succeed('创建成功 | Create success')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
