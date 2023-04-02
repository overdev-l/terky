import { defaultDir, FRAMEWORKS} from './message.ts'
import { red, reset,  } from 'kolorist'
import prompts from 'prompts'
async function main () {
  const response = await prompts([
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
  console.log(response)
}

main()