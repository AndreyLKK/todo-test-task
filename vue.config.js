const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  publicPath: "/todo-test-task/",
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {},
    },
  },
});
