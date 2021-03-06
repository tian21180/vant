// @ts-ignore
import FriendlyErrorsPlugin from '@nuxt/friendly-errors-webpack-plugin';
import sass from 'sass';
import { VueLoaderPlugin } from 'vue-loader';
import {
  STYLE_EXTS,
  SCRIPT_EXTS,
  POSTCSS_CONFIG_FILE
} from '../common/constant';

const CSS_LOADERS = [
  'style-loader',
  'css-loader',
  {
    loader: 'postcss-loader',
    options: {
      config: {
        path: POSTCSS_CONFIG_FILE
      }
    }
  }
];

export const baseConfig = {
  mode: 'development',
  resolve: {
    extensions: [...SCRIPT_EXTS, ...STYLE_EXTS]
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false
              }
            }
          }
        ]
      },
      {
        test: /\.(js|ts|jsx|tsx)$/,
        exclude: /node_modules\/(?!(@vant\/cli))/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.css$/,
        sideEffects: true,
        use: CSS_LOADERS
      },
      {
        test: /\.less$/,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: 'less-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        sideEffects: true,
        use: [
          ...CSS_LOADERS,
          {
            loader: 'sass-loader',
            options: {
              implementation: sass
            }
          }
        ]
      },
      {
        test: /\.md$/,
        use: ['vue-loader', '@vant/markdown-loader']
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new FriendlyErrorsPlugin({
      clearConsole: false,
      logLevel: 'WARNING'
    })
  ]
};
