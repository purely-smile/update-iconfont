#!/usr/bin/env node
const prompt = require("prompt");
const meow = require("meow");
const addDir = require("./add-dir");
const listConfig = require("./list-config");
const selectConfig = require("./select-config");
const parseZip = require("./parse-zip");

const cli = meow(
  `
  用法
    update-iconfont <options>
  参数
    -a,--add 添加目录
    -l,--list 目录列表
    -f,--file download.zip 文件路径
    --help 帮助
`,
  {
    alias: {
      a: "add",
      l: "list",
      f: "file"
    }
  }
);

const { add, list, file } = cli.flags;

if (add === true) {
  prompt.start();
  console.log("输入项目路径（zsh可以直接拖动项目目录）");
  prompt.get(["path"], (err, result) => {
    if (err) {
      return console.error("prompt错误", err);
    }
    addDir(result.path);
  });
} else if (typeof add === "string") {
  addDir(add);
} else if (list === true) {
  // 获取配置列表
  listConfig();
} else if (file) {
  selectConfig().then(({ proj }) => {
    parseZip(proj, file);
  });
} else {
  console.log("未知的参数,查看帮助 update-iconfont --help", cli.flags);
}
