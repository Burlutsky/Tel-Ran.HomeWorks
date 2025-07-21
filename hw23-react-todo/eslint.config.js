// eslint.config.js

// @ts-check
import js from "@eslint/js";
import react from "eslint-plugin-react-x";
import tseslint from "typescript-eslint";

export default tseslint.config({
  files: ["**/*.ts", "**/*.tsx"],
  extends: [
    js.configs.recommended,
    tseslint.configs.recommended,
    react.configs.recommended,
  ],
  languageOptions: {
    ecmaVersion: 2020,
    globals: globals.browser,
    parser: tseslint.parser,
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      // tsconfigRootDir: import.meta.dirname,
      projectService: true,
      tsconfigRootDir: import.meta.dirname,
    },
  },
  rules: {
    // Put rules you want to override here
    "react-x/no-class-component": "warn",
  },
});

// import js from '@eslint/js'
// import globals from 'globals'
// import reactHooks from 'eslint-plugin-react-hooks'
// import reactRefresh from 'eslint-plugin-react-refresh'
// import tseslint from 'typescript-eslint'
// import { globalIgnores } from 'eslint/config'
//
// export default tseslint.config([
//   globalIgnores(['dist']),
//   {
//     files: ['**/*.{ts,tsx}'],
//     extends: [
//       js.configs.recommended,
//       tseslint.configs.recommended,
//       reactHooks.configs['recommended-latest'],
//       reactRefresh.configs.vite,
//     ],
//     languageOptions: {
//       ecmaVersion: 2020,
//       globals: globals.browser,
//     },
//   },
// ])
