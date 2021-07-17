module.exports = {
  extends: ['kentcdodds', 'kentcdodds/react', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'react/jsx-filename-extension': [
      'error', {
        'allow': 'as-needed',
      },
    ],

    'prettier/prettier': 'error',
  },
};
