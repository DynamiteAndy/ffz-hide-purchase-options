import { resolve } from 'path';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import StatoscopeWebpackPlugin from '@statoscope/webpack-plugin';
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
        loader: 'ts-loader'
      },
      {
        test: /\.s?[ac]ss$/i,
        use: ['sass-to-string', 'sass-loader']
      }
    ]
  },
  plugins: process.env.webpack_analyse ? [new BundleAnalyzerPlugin(), new StatoscopeWebpackPlugin()] : []
};
