/** @typedef  {import("prettier").Config} PrettierConfig*/
const config = {
  arrowParens: "always",
  printWidth: 80,
  singleQuote: false,
  jsxSingleQuote: false,
  semi: true,
  trailingComma: "all",
  tabWidth: 2,
  // pluginSearchDirs: false,
  plugins: [
    "prettier-plugin-tailwindcss",
  ],
};

module.exports = config;
