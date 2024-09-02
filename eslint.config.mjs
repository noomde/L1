import globals from "globals";
import pluginJs from "@eslint/js";

// I am not sure how the newer version of eslint works so it might change during the apps progress.

export default [
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    ...pluginJs.configs.recommended,
  },
]
