const dataConfig = require("./data-config");

module.exports = function listConfig() {
  const data = dataConfig.readData();
  const keys = Object.keys(data);
  if (keys.length === 0) {
    return console.log("暂无配置列表，通过update-iconfont -a 添加配置");
  }
  const listStr = keys
    .map((key) => {
      const path = data[key];
      return `${key}:${path}`;
    })
    .join("\n");
  console.log("已添加配置列表，通过update-iconfont -a 添加配置");
  console.log(listStr);
};
