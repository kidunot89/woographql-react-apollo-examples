require('dotenv-flow').config({ silent: true });

module.exports = {
  schema: [
    {
      [process.env.REACT_APP_ENDPOINT]: {
        headers: {},
      },
    },
  ],
  verbose: true,
  overwrite: true,
  generates: {
    './src/possibleTypes.json': {
      plugins: [
        'fragment-matcher',
      ],
    },
  },
};
