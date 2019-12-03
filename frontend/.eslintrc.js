module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true,
  },
  extends: [
    'airbnb', 'plugin:react/recommended'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { 'extensions': ['.js', '.jsx'] }],
    'no-underscore-dangle':0,
    'import/prefer-default-export':0,
    'react/prop-types':0,
    'react/destructuring-assignment':[1, 'always', { 'ignoreClassFields': true }],
    'react/jsx-props-no-spreading': 'off',
    'no-plusplus':[2, { "allowForLoopAfterthoughts": true }],
    "jsx-a11y/click-events-have-key-events":0,
    "jsx-a11y/no-noninteractive-element-interactions":1,
    "react/no-unused-state":1,
    "no-param-reassign": [2, { "props": false }],
  },
};
