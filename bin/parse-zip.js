const fs = require("fs");
const path = require("path");
const unzip = require("unzip");
const dataConfig = require("./data-config");

// const zipPath = path.resolve(__dirname, "../download.zip");
// const outPath = path.resolve(__dirname, "../output");

module.exports = function parseZip(projName, zipPath) {
  if (!zipPath || !/download\.zip$/.test(zipPath)) {
    return console.log(
      "iconfont 名称必须是download.zip。不支持其他格式。当前zipPath：",
      zipPath
    );
  }
  const data = dataConfig.readData();
  const projPath = data[projName];
  if (!projPath) {
    return console.log("未获取到项目路径:", projName);
  }
  fs
    .createReadStream(zipPath)
    .pipe(unzip.Parse())
    .on("entry", (entry) => {
      if (/iconfont\.eot|svg|woff|css$/.test(entry.path)) {
        const fileName = entry.path.split("/").pop();
        entry.pipe(fs.createWriteStream(path.resolve(projPath, fileName)));
      } else {
        entry.autodrain();
      }
    });
};
