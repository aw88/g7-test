module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    mocha: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'no-console': 'off',
    'no-underscore-dangle': ['error', { allow: ['__set__'] }],
  },
};
