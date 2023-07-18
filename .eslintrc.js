module.exports = {
  root: true,
  extends: ['@react-native-community', 'prettier/prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
};
