const VuetifyLoaderPlugin = require("vuetify-loader/lib/plugin");
module.exports = {
  configureWebpack: {
    plugins: [new VuetifyLoaderPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all"
      }
    }
  },
  productionSourceMap: true
};
