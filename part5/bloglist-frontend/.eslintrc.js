module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      jest: true,
    },
    extends: [
      "eslint:recommended",
      "react",
      "prettier"
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      "ecmaFeatures": {
        "jsx": true
      }
    },
    rules: {
      eqeqeq: "error",
      "no-console": 0,
    },
  };
  