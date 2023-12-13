const path = require('path');

module.exports = {
  module: {
    rules: [
      // Règle pour les fichiers CSS
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};
