module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/typescript",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
    "airbnb",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 13,
    sourceType: "module",
    project: "./tsconfig.eslint.json",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    "import/extensions": ["error", "ignorePackages", { js: "never", jsx: "never", ts: "never", tsx: "never" }],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/explicit-module-boundary-types": "warn",
    "@typescript-eslint/no-explicit-any": "warn",
    "@typescript-eslint/no-empty-function": "warn",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/no-empty-interface": "warn",
    "react/require-default-props": "warn",
    "react/jsx-props-no-spreading": "warn",
    "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
    "import/no-cycle": "warn",
    camelcase: "warn",
    //		indent: ["error", "tab"],
    "linebreak-style": ["error", "unix"],
    //		semi: ["error", "always"],
    //		quotes: ["error", "double"],
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
};
