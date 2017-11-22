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
  writeData(projName, projPath, isDelete = false) {
    const data = this.readData();
    if (isDelete) {
      delete data[projName];
    } else {
      data[projName] = projPath;
    }
    fs.writeFileSync(dataPath, JSON.stringify(data));
    console.log("操作成功");
  }
};
