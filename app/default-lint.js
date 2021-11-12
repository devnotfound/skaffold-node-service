module.exports = {
  globals: {
    require: true,
    process: true,
    __dirname: true,
    module: true,
  },
  env: {
    es6: true,
    node: true,
    mocha: true,
  },
  plugins: ['prettier'],
  extends: ['eslint:recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true,
      jsx: true,
    },
  },
  rules: {
    indent: 0,
    quotes: ['error', 'single', { avoidEscape: true, allowTemplateLiterals: true }],
    'no-console': ['error'],
    eqeqeq: ['warn', 'always'],
    strict: 2,
    'no-var': ['error'],
    'no-unused-vars': [
      'error',
      {
        varsIgnorePattern: '^_',
        argsIgnorePattern: '^_',
      },
    ],
    semi: ['error', 'always'],
    'prettier/prettier': ['error', { singleQuote: true, printWidth: 100 }],
    // 'object-shorthand': ['error', 'always'],
  },
};
