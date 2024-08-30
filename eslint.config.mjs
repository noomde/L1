import globals from "globals";
import pluginJs from "@eslint/js";


export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...pluginJs.configs.recommended,
    rules: {
      // Custom rule to disallow colon usage
      "no-restricted-syntax": [
        "error",
        {
          selector: "Identifier[name=/.*:.*/]",
          message: "Colons (:) are not allowed in identifiers.",
        },
        {
          selector: "Literal[value=/.*:.*/]",
          message: "Colons (:) are not allowed in literal values.",
        },
      ],
      // Additional rules can be added here
    },
  },
]
