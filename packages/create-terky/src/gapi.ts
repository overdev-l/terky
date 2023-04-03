import path from 'path'
import { getArgs, generateJavascript, generateTypescript } from './utils'
import fs from 'fs-extra'
function main() {
    const { configPath, template } = getArgs()
    const apiPath = path.join(process.cwd(), configPath)
    const apiData = JSON.parse(fs.readFileSync(apiPath, 'utf-8'))
    if (template.toLowerCase() === 'typescript' || template.toLowerCase() === 'ts') {
        generateTypescript(apiData)
    } else {
        generateJavascript(apiData)
    }
}
main()
