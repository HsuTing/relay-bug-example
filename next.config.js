const webpack = require('webpack');

module.exports = {
  /* eslint-disable no-param-reassign */
  webpack: (config, { isServer }) => {
    config.plugins.push(
      new webpack.DefinePlugin({
        __IS_SERVER__: isServer.toString(),
      }),
    );

    return config;
  },
  /* eslint-enable no-param-reassign */
};
