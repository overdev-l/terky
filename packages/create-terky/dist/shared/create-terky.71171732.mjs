import { yellow, blue } from 'kolorist';
import fs from 'fs';

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
const generateTypescript = (data) => {
  console.log(data);
};
const generateJavascript = (data) => {
  console.log(data);
};

export { FRAMEWORKS as F, generateJavascript as a, defaultDir as d, generateTypescript as g, isEmpty as i, mkdirSync as m };
