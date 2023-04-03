import path from 'node:path';
import fs from 'fs-extra';
import minimist from 'minimist';

const args = minimist(process.argv.slice(2));
function main() {
  const { config, template } = args;
  const apiPath = path.join(process.cwd(), config);
  const apiData = JSON.parse(fs.readFileSync(apiPath, "utf-8"));
  console.log(apiData);
}
main();
