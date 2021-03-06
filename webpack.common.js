/* eslint-env node */

import path from 'path';
import webpack from 'webpack';
import yargs from 'yargs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import StringReplaceWebpackPlugin from 'string-replace-webpack-plugin';
import version from './tools/version';
import config from './tools/config';

const roServerReplacer = {
  loader: StringReplaceWebpackPlugin.replace({
    replacements: [{
      pattern: /<!-- block:READONLY_SERVER-(\d) -->([\s\S]*)<!-- endblock:READONLY_SERVER-\1 -->/g,
      replacement: () => '',
    }]
  })
};

export default {
  entry: {
    demo: './demo/scripts/index.js',
    vendor: [
      'three',
      'mmtf',
      'Smooth',
    ],
  },
  output: {
    publicPath: './',
    path: path.resolve(__dirname, 'build'),
    filename: '[name].[chunkhash].js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules|vendor)/,
      use: [{
        loader: 'babel-loader',
      }],
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    }, {
      test: /\.glsl$/,
      use: ['raw-loader'],
    }, {
      test: /menu.html$/,
      use: config.roServer ? ['raw-loader', roServerReplacer] : ['raw-loader'],
    }, {
      test: /\.html$/,
      exclude: /menu.html$/,
      use: ['raw-loader'],
    }, {
      test: /\.(woff|woff2|eot|ttf|svg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      },
      ],
    }],
  },
  resolve: {
    alias: {
      Miew:    path.resolve(__dirname, 'src/index.js'),
      // lib
      three:   path.resolve(__dirname, 'vendor/js/three.module.js'),
      Smooth:  path.resolve(__dirname, 'vendor/js/Smooth.js'),
      mmtf:    path.resolve(__dirname, 'vendor/js/mmtf.js'),
    },
  },
  node: {
    fs: 'empty',
    path: 'empty',
  },
  plugins: [
    new webpack.DefinePlugin({
      PACKAGE_VERSION: JSON.stringify(version.combined),
      READONLY_SERVER: config.roServer,
      PRESET_SERVER: JSON.stringify(yargs.argv.service),
      COOKIE_PATH: JSON.stringify(yargs.argv.cookiePath),
    }),
    new webpack.IgnorePlugin(/vertx/), // https://github.com/webpack/webpack/issues/353
    new webpack.ProvidePlugin({
      jQuery: 'jquery',
    }),
    new HtmlWebpackPlugin({
      title: 'Miew – 3D Molecular Viewer',
      favicon: 'demo/favicon.ico',
    }),
    new CopyWebpackPlugin([
      {from: 'demo/data', to: 'data'},
      {from: 'demo/images', to: 'images'},
    ]),
    new StringReplaceWebpackPlugin(),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: module => module.context && module.context.indexOf('node_modules') !== -1,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest',
      minChunks: Infinity,
    }),
  ],
  watchOptions: {
    ignored: /node_modules/,
  },
};
