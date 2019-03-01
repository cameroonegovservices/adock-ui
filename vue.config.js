const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()]
  },
  productionSourceMap: true,
  devServer: {
    allowedHosts: [".serveo.net"]
  }
};
