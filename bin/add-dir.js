const { exec } = require("child_process");
const fs = require("fs");
const inquirer = require("inquirer");
const dataConfig = require("./data-config");

const prompt = inquirer.createPromptModule();

function writeData(path) {
  const projName = path.split("/").pop();
  dataConfig.writeData(projName, path);
  console.log(`添加成功，${projName}:${path}`);
  console.log("使用update-iconfont -l 查看已添加列表");
}

module.exports = function addDir(dir) {
  const isExist = fs.existsSync(dir);
  if (!isExist) {
    return console.error(`路径不存在:${dir}`);
  }
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
      .map(val => val.trim())
      .filter(Boolean);
    const { length } = dirs;
    if (length === 0) {
      return console.error("未找到iconfont目录", stdout);
    }
    if (length === 1) {
      writeData(dirs[0]);
    } else {
      prompt({
        name: "path",
        message: "在项目中找到了多个iconfont路径,请选择...",
        type: "list",
        choices: dirs,
        default: 0
      }).then(
        ({ path }) => {
          writeData(path);
        },
        error => {
          console.log(error);
        }
      );
    }
  });
};
