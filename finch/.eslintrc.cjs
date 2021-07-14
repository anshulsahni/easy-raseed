module.exports = {
  extends: 'kentcdodds',
  rules: {
    'no-console': [
      'error',
    ],
  },
  overrides: [{
    files: ['src/**/*.test.js'],
    env: {
      jest: true,
    },
  }],
};
