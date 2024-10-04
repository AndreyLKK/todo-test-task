module.exports = {
  root: true,

  env: {
    node: true,
  },

  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "plugin:prettier/recommended",
    "@vue/typescript",
  ],

  parserOptions: {
    parser: "@typescript-eslint/parser",
  },

  rules: {
    "prettier/prettier": 0,
    "no-console": "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
  },
};
