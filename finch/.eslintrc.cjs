module.exports = {
  extends: 'kentcdodds',
  overrides: [{
    files: ['src/**/*.test.js'],
    env: {
      jest: true,
    },
  }],
};
