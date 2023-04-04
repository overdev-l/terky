import path from 'node:path';
import { g as generateTypescript, a as generateJavascript } from './shared/create-terky.d81616f2.mjs';
import fs from 'fs-extra';
import minimist from 'minimist';
import 'kolorist';
import 'fs';

const args = minimist(process.argv.slice(2));
function main() {
  const { config, template } = args;
  const apiPath = path.join(process.cwd(), config);
  const apiData = JSON.parse(fs.readFileSync(apiPath, "utf-8"));
  console.log(apiData);
  if (template.toLowerCase() === "typescript" || template.toLowerCase() === "ts") {
    generateTypescript(apiData);
  } else {
    generateJavascript(apiData);
  }
}
main();
