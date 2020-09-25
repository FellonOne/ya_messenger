/**
 * СКРИПТ ВЗЯТ С ГИТХАБА! используется для того, чтоб в папке ./dist
 * добавить в импорте файлам расширение .js
 */
const childProcess = require("child_process");
const execSync = childProcess.execSync;
const util = require("util");
const fs = require("fs");
const path = require("path");

//function to recurse dirs finding files
function fromDir(startPath, filter, callback) {
  //console.log('Starting from dir '+startPath+'/');

  if (!fs.existsSync(startPath)) {
    console.log("no dir ", startPath);
    return;
  }

  const files = fs.readdirSync(startPath);
  for (let i = 0; i < files.length; i++) {
    const filename = path.join(startPath, files[i]);
    const stat = fs.lstatSync(filename);
    if (stat.isDirectory()) {
      fromDir(filename, filter, callback); //recurse
    } else if (filter.test(filename)) callback(filename);
  }
}

//this add .js to lines like:  import .* from "\.  <-- only imports from ./ or ../ are touched
function addDotJsToLocalImports(filename) {
  const buf = fs.readFileSync(filename);
  let replaced = buf
    .toString()
    .replace(
      /(import .* from\s+['"])(?!.*\.js['"])(\..*?)(?=['"])/g,
      "$1$2.js"
    );
  if (replaced !== buf.toString()) {
    fs.writeFileSync(filename, replaced);
    console.log("fixed imports at " + filename);
  }
}

//------------------------
//---BUILD TASK START
//------------------------

execSync("npx tsc --build -verbose", { stdio: "inherit" });

//add .js to generated imports so tsconfig.json module:"ES2020" works with node
//see: https://github.com/microsoft/TypeScript/issues/16577
fromDir("./dist", /\.js$/, addDotJsToLocalImports);
