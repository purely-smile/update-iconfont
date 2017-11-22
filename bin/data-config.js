const path = require("path");
const fs = require("fs");

const { HOME } = process.env;
const dataPath = path.resolve(HOME, "./.update-iconfont-config.json");
module.exports = {
  readData() {
    if (!fs.existsSync(dataPath)) {
      fs.writeFileSync(dataPath, "{}");
      console.log(`已创建配置文件:${dataPath}`);
    }
    return JSON.parse(fs.readFileSync(dataPath, "utf8") || "{}");
  },
  writeData(projName, projPath) {
    const data = this.readData();
    data[projName] = projPath;
    fs.writeFileSync(dataPath, JSON.stringify(data));
  }
};
