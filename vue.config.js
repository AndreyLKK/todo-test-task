const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {},
    },
  },
});
