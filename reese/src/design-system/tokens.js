import colors from './colors.js';

const brand = {
  primary: colors.blue,
  secondary: colors.orange,
  negative: colors.red,
};

export const theme = {

  brand,

  forms: {
    text: {
      general: colors.blue,
      error: brand.negative,
    },

    borders: {
      error: brand.negative,
      general: colors.blue,
    },

    background: {
      general: colors.white,
    },

    border: {
      primary: colors.primary
    }
  },

  buttons: {
    background: {
      primary: brand.primary,
      secondary: brand.secondary,
    },

    text: {
      primary: colors.white,
      secondary: brand.primary,
    },
  },

  borders: {
    secondary: brand.secondary,
  },

  body: {
    background: colors.white,
  }
};
