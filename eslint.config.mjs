import globals from "globals";
import pluginJs from "@eslint/js";
import prettierPlugin from "eslint-plugin-prettier";

export default [
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      prettier: prettierPlugin, // define Prettier as a plugin object
    },
    rules: {
      // enforce consistent indentation
      indent: ["error", 4],

      // require semicolons at the end of lines
      semi: ["error", "always"],

      // enforce consistent spacing inside braces
      "object-curly-spacing": ["error", "always"],

      // allow all properties in the same line if possible
      "object-property-newline": [
        "error",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],

      // Eeforce spacing in arrays
      "array-bracket-spacing": ["error", "never"],

      // enforce single quotes for strings
      quotes: ["error", "single"],

      // enforce trailing commas where valid in ES5
      "comma-dangle": ["error", "always-multiline"],

      // enforce prettier rules
      "prettier/prettier": [
        "error",
        {
          singleQuote: true,
          trailingComma: "es5",
          bracketSpacing: true,
          tabWidth: 4,
          useTabs: false,
        },
      ],
    },
  },
];
