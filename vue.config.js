const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  base: "/todo-test-task/",
  lintOnSave: false,
  css: {
    loaderOptions: {
      sass: {},
    },
  },
});
