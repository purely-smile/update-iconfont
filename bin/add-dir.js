const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const dataConfig = require("./data-config");

const prompt = inquirer.createPromptModule();

function writeData(iconfontPath, projName) {
  dataConfig.writeData(projName, iconfontPath);
  console.log(`添加信息，${projName}:${iconfontPath}`);
  console.log("使用update-iconfont -l 查看已添加列表");
}

module.exports = function addDir(dirPath) {
  const dir = dirPath ? path.resolve(process.env.PWD, dirPath.trim()) : dirPath;
  const isExist = fs.existsSync(dir);
  if (!isExist) {
    return console.error(`路径不存在:${dir}`);
  }
  const projName = dir.split("/").pop();
  exec(`find ${dir} -name 'iconfont'`, (err, stdout, stderr) => {
    if (err) {
      return console.log("err:", err);
    }
    if (stderr) {
      return console.log("查找iconfont目录失败");
    }
    if (!stdout) {
      return console.error("未找到iconfont目录");
    }
    const dirs = stdout
      .split("\n")
      .filter(Boolean)
      .map(val => path.resolve(__dirname, val.trim()));
    const { length } = dirs;
    if (length === 0) {
      return console.error("未找到iconfont目录", stdout);
    }
    if (length === 1) {
      writeData(dirs[0], projName);
    } else {
      prompt({
        name: "filepath",
        message: "在项目中找到了多个iconfont路径,请选择...",
        type: "list",
        choices: dirs,
        default: 0
      }).then(
        ({ filepath }) => {
          writeData(filepath, projName);
        },
        error => {
          console.log(error);
        }
      );
    }
  });
};
