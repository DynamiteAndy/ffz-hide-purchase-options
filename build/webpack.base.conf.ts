import { resolve } from 'path';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';

export const baseConfig = {
  resolve: {
    extensions: ['.js', '.ts'],
    plugins: [new TsconfigPathsPlugin()]
  },
  optimization: {
    minimize: false,
    moduleIds: 'named'
  },
  entry: './src/index.ts',
  output: {
    path: resolve(__dirname, '../dist')
  },
  target: 'web',
  module: {
    rules: [
      {
        test: /\.m?ts$/,
        use: [
          {
            loader: 'esbuild-loader',
            options: {
              target: 'ES2020'
            }
          }
        ]
      },
      {
        test: /\.s?[ac]ss$/i,
        use: [
          {
            loader: resolve(__dirname, './loaders/sass-to-string-loader.ts')
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: []
};
