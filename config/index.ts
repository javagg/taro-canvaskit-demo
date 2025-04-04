import { defineConfig, type UserConfigExport } from '@tarojs/cli'
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin'
import CompressionPlugin from 'compression-webpack-plugin'
import devConfig from './dev'
import prodConfig from './prod'
import path from 'path'

// https://taro-docs.jd.com/docs/next/config#defineconfig-辅助函数
export default defineConfig<'webpack5'>(async (merge, { command, mode }) => {
  const baseConfig: UserConfigExport<'webpack5'> = {
    projectName: 'taro-canvaskit-demo',
    date: '2025-3-11',
    designWidth: 750,
    deviceRatio: {
      640: 2.34 / 2,
      750: 1,
      375: 2,
      828: 1.81 / 2
    },
    sourceRoot: 'src',
    outputRoot: 'dist',
    plugins: [],
    defineConstants: {
    },
    copy: {
      patterns: [
        // h5
        { from: 'assets/canvaskit-nofont/canvaskit.wasm', to: 'dist/assets/canvaskit-nofont' },
        // weapp
        { from: 'assets/canvaskit-nofont/canvaskit.wasm', to: 'dist/canvaskit-nofont/pages' },
      ],
      options: {
      }
    },
    alias: {
      '@/src': path.resolve(__dirname, '..', 'src'),
      '@/assets': path.resolve(__dirname, '..', 'assets'),
    },
    framework: 'solid',
    compiler: {
      type: 'webpack5',
      prebundle: {
        enable: false,
        force: true,
      },
    },
    cache: {
      enable: false // Webpack 持久化缓存配置，建议开启。默认配置请参考：https://docs.taro.zone/docs/config-detail#cache
    },
    mini: {
      optimizeMainPackage: {
        enable: true,
      },
      postcss: {
        pxtransform: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
        chain.plugin('compression-webpack-plugin').use(CompressionPlugin, [{
          filename: "[path][base].br",
          algorithm: "brotliCompress",
          test: /\.(wasm|ttf|otf|woff2)$/,
          deleteOriginalAssets: true,
        }])
        chain.module
          .rule('imports')
          .test(/canvaskit\.js$/)
          .use('import')
          .loader('imports-loader')
          .options({
            // this works only when import dynamically
            imports: [
              "named @/src/poly WebAssembly",
              "named @/src/poly fetch",
              // "named @/src/poly URL",
            ],
            additionalCode: `
                const URL = globalThis.URL;
              `
          });
        chain.merge({
          performance: {
            maxEntrypointSize: 2048000,
            maxAssetSize: 2048000,
          },
        });
      }
    },
    h5: {
      publicPath: '/',
      staticDirectory: 'static',
      output: {
        filename: 'js/[name].[hash:8].js',
        chunkFilename: 'js/[name].[chunkhash:8].js'
      },
      miniCssExtractPluginOption: {
        ignoreOrder: true,
        filename: 'css/[name].[hash].css',
        chunkFilename: 'css/[name].[chunkhash].css'
      },
      postcss: {
        autoprefixer: {
          enable: true,
          config: {}
        },
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
          config: {
            namingPattern: 'module', // 转换模式，取值为 global/module
            generateScopedName: '[name]__[local]___[hash:base64:5]'
          }
        }
      },
      webpackChain(chain) {
        chain.resolve.plugin('tsconfig-paths').use(TsconfigPathsPlugin)
      }
    },
    rn: {
      appName: 'taroDemo',
      postcss: {
        cssModules: {
          enable: false, // 默认为 false，如需使用 css modules 功能，则设为 true
        }
      }
    }
  }


  if (process.env.NODE_ENV === 'development') {
    // 本地开发构建配置（不混淆压缩）
    return merge({}, baseConfig, devConfig)
  }
  // 生产构建配置（默认开启压缩混淆等）
  return merge({}, baseConfig, prodConfig)
})
