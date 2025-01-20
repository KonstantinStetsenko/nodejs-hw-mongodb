import pluginJs from "@eslint/js";
import globals from "globals";

export default [
  pluginJs.configs.recommended,
  {
    files: ["src/**/*.js"],
    languageOptions: { globals: globals.node },
    rules: {
      semi: "error",
      "no-unused-vars": ["error", { args: "none" }],
      "no-undef": "error",
    },
  },
];
