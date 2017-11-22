const inquirer = require("inquirer");
const dataConfig = require("./data-config");

const prompt = inquirer.createPromptModule();
module.exports = function selectConfig(action) {
  const data = dataConfig.readData();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return Promise.reject("未获取到配置信息，请通过update-iconfont -a 来添加配置");
  }
  return prompt({
    name: "proj",
    message: `请选择需要${action}的项目名称`,
    type: "list",
    choices: keys,
    default: 0
  }).then(null, err => {
    console.log(err);
  });
};
