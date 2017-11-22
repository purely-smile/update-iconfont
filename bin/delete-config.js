const dataConfig = require("./data-config");
const selectConfig = require("./select-config");

module.exports = function deleteConfig() {
  selectConfig("删除").then(({ proj }) => {
    dataConfig.writeData(proj, null, true);
  });
};
