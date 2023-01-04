module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
      jest: true,
      browser: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
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
      "react/react-in-jsx-scope": "off",
      "react/prop-types": 0
    },
    "settings": {
      "react": {
        "version": "detect"
      }
    }
  };
  