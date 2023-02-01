/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier',
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': ['error', { args: 'after-used', destructuredArrayIgnorePattern: '^_' }],
  },
  parserOptions: {
    ecmaVersion: 'latest',
  },
}
