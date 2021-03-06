import webpackMerge from 'webpack-merge';

import webpackCommon from './webpack.common.js';

export default webpackMerge(webpackCommon, {
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // hot: true,
    contentBase: './build',
    publicPath: '/',
    compress: true,
    clientLogLevel: 'info',
    stats: {
      assets: false,
      colors: true,
      cached: false,
      cachedAssets: false,
    },
  },
});
