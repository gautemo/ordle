/* eslint-env node */
module.exports = {
  root: true,
  extends: ['plugin:vue/vue3-essential', 'eslint:recommended', '@vue/eslint-config-typescript/recommended', 'prettier'],
  env: {
    'vue/setup-compiler-macros': true,
  },
  rules: {
    'vue/return-in-computed-property': 'off',
  },
}
