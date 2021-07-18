module.exports = {
  extends: ['kentcdodds', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'no-console': ['error'],
    'prettier/prettier': 'error',
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      env: {
        jest: true,
      },
    },
  ],
};
