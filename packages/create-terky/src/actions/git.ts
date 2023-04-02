import { execa } from 'execa'
import {Ora} from "ora"
import fs from 'fs-extra'
import os from 'os'
export const createRepo = async (dir: string, template: string, spinner: Ora) => {
    const filePath = '.git/info/sparse-checkout'
    const foldersToPull = `/packages/create-terky/${template}/*${os.EOL}`
    const sourceDir = `${dir}/packages/create-terky/${template}`
    await execa('git', ['init'], { cwd: dir  })
    await execa('git', ['remote', 'add', '-f', 'origin', 'git@github.com:overdev-l/terky.git'], { cwd: dir  })
    await execa('git', ['config', 'core.sparsecheckout', 'true'], { cwd: dir  })
    spinner.text = '正在拉取模板 | Pulling template...'
    await fs.writeFileSync(`${dir}/${filePath}`, foldersToPull, { encoding: 'utf-8' })
    await execa('git', ['pull', 'origin', 'master'], {cwd: dir})
    await fs.copy(sourceDir, dir, )
    await execa('rm', ['-rf', '.git'], {cwd: dir})
    await execa('rm', ['-rf', 'packages'], {cwd: dir})
 }
