module.exports = {
  'env': {
    'browser': true,
    'es2021': true,
    'node': true,
    'vue/setup-compiler-macros': true
  },
  'extends': [
    'eslint:recommended',
    'plugin:vue/vue3-essential',
  ],
  'parser': 'vue-eslint-parser',
  'plugins': [
    'vue',
    'simple-import-sort'
  ],
  'rules': {
    'eqeqeq': 'error',
    'no-empty-function': 'error',
    'no-multi-spaces': 'error',
    'no-multi-str': 'error',
    'no-self-compare': 'error',
    'no-useless-concat': 'error',
    'require-await': 'error',
    'indent': ['error', 2],
    'no-unneeded-ternary': 'error',
    'arrow-parens': ['error', 'as-needed'],
    'arrow-spacing': 'error',
    'no-duplicate-imports': 0,
    'no-var': 'error',
    'prefer-const': 'error',
    'rest-spread-spacing': 'error',
    '@typescript-eslint/no-var-requires': 0,
    'vue/multi-word-component-names':'off',
    '@typescript-eslint/no-explicit-any': ['off'],
    '@typescript-eslint/ban-types': 'off',
    'quotes': [2, 'single'],
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'semi': [2, 'never'],
    'vue/html-indent': ['error', 2],
    'object-curly-spacing': ['error', 'always'],
    'vue/padding-line-between-blocks': 1
  }
}
