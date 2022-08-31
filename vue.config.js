const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    port: 11001,
  },
  pluginOptions: {
    electronBuilder: {
      builderOptions: {
        nsis: {
          allowToChangeInstallationDirectory: true,
          oneClick: false,
          installerIcon: "./build/logo.ico", //安装logo
          installerHeaderIcon: "./build/logo.ico", //安装logo
        },
        electronDownload: {
          mirror: "https://npm.taobao.org/mirrors/electron/", //镜像设置
        },
        win: {
          icon: "./build/logo.ico", //打包windows版本的logo
        },
        productName: "LilMartinMusic", //应用的名称
      },
    },
  },
});
