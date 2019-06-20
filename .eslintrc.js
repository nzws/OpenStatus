module.exports = {
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },
  env: {
    node: true,
    es6: true,
    browser: true
  },
  rules: {
    'no-unused-vars': 0
  }
};
