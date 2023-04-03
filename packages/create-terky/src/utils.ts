import { blue, yellow } from 'kolorist'
import fs from  'fs'
import minimist from 'minimist'
export const defaultDir = 'terky-app'
export const FRAMEWORKS = [
  {
    name: 'vue3',
    display: 'JavaScript',
    color: yellow,
    value: 'template-vue3'
  },
  {
    name: 'vue3-ts',
    display: 'TypeScript',
    color: blue,
    value: 'template-vue3-ts'
  },
]

export const isEmpty = (dir: string) => fs.existsSync(dir)
export const mkdirSync = (dir: string) => fs.mkdirSync(dir)
export const getArgs = () => minimist(process.argv.slice(2))
export const generateTypescript = (data: any) => {}
export const generateJavascript = (data: any) => {}