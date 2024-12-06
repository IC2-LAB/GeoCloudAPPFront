'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
  dev: {
    // Paths
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/bupt': {
        target: 'http://10.82.8.64:12345',
      },
      '/system': {
        //target: 'http://10.1.3.90:8084/',//海南农保
        //target: 'http://10.1.3.66:10082/',//海南农保
        // target: 'http://10.1.3.90:8042/',//浙江
        // target: 'http://10.1.3.90:8032/',//黑龙江
        // target: 'http://10.1.3.90:8022/',//辽宁
        // target: 'http://10.1.3.90:8012/',//海南
        target: 'http://10.1.3.66:9907/',
        ws: true,
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/system': '/'
        }
      },
      '/mj': {
        // 目标 API 地址
        // target: 'http://10.1.100.38:9014/',
        // target: 'http://10.1.3.66:9091/',
        // target: 'http://10.1.4.113:9091/',
        //target: 'http://10.82.8.57:6092/',
        target: 'http://10.1.3.66:6092',
        // target: 'http://10.1.3.32:9091/',
        //target: 'http://10.1.3.71:9091/',
        //target: 'http://10.1.3.66:10091/',
        // target: 'http://10.82.8.64:9092/',
        // 如果要代理 websockets
        // ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        secure: false,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/mj': '/'
        }
      },
      '/sso': {
        // 目标 API 地址
        target: 'https://geocloudsso.cgs.gov.cn/',
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/sso': '/'
        }
      },

      '/dandian': {
        // 目标 API 地址
        // target: 'http://10.1.100.38:9908/',
        //target: 'http://10.1.3.71:9909/',
        //target: 'http://127.0.0.1:9909/',
        // target: 'http://172.25.30.241:9909/',
        // target: 'http://10.82.8.64:9909/',
        //target: 'http://10.82.8.57:9909/',
        target: 'http://10.1.3.66:9909/',
        //target: 'http://localhost:9901'  
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/dandian': '/'
        }

      },
      '/arcgisServer': {
        // 目标 API 地址
        target: ' http://10.1.3.71:8084',
        //target: 'http://10.82.8.57:8084/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/arcgisServer': '/'
        }
      },
      '/mhd': {
        // 目标 API 地址
        target: 'http://10.82.8.57:9081/',
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/mhd': '/'
        }
      },
      '/newsPath': {
        // 目标 API 地址
        target: 'http://10.1.100.158:9527/',
        //target: 'http://10.82.8.57:9527/',h
        // 如果要代理 websockets
        ws: true,
        // 将主机标头的原点更改为目标URL
        changeOrigin: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/newsPath': '/'
        }
      },
      '/material': {
        // 目标 API 地址
        target: 'http://10.82.8.16:8085/',
        //target: 'http://10.82.8.57:8085/',
        // 如果要代理 websockets
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/material': '/'
        }
      },
      '/pushXg': {
        // 目标 API 地址
        target: 'http://10.1.3.59:8030/',
        //tartget: 'http://localhost:8030',
        // 如果要代理 websockets
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/pushXg': '/'
        }
      },
      '/JWRG': {
        // 目标 API 地址
        target: 'http://10.1.3.71:8088/',
        // 如果要代理 websockets
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/JWRG': '/'
        }
      },
      '/metadataExportZip': {
        // 目标 API 地址
        target: 'Z\\shareJGF\\metadataExport\\',
        // 如果要代理 websockets
        ws: true,
        pathRewrite: {
          // 替换target中的请求地址，也就是说以后你在请求http://api.jisuapi.com/XXXXX这个地址的时候直接写成/api即可
          '^/metadataExportZip': '/'
        }
      },
      '/yp': {
        target: 'http://10.1.3.66:10082/',//海南农保
        //target: 'http://10.1.3.90:8084/',//海南农保
        // target: ' http://10.1.3.90:9481/',//浙江
        // target: ' http://10.1.3.90:9381/',//黑龙江
        // target: ' http://10.1.3.93:9281/',//辽宁
        // target: ' http://10.1.3.90:9181/',//海南
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/yp': '/'
        }
      }
    },
    // Various Dev Server settings
    host: '10.1.3.66', // can be overwritten by process.env.HOST
    // host: '127.0.0.1', // can be overwritten by process.env.HOST
    port: 8085, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    autoOpenBrowser: false,
    errorOverlay: true,
    notifyOnErrors: true,
    poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    //poll: false, // https://webpack.js.org/configuration/dev-serverdevserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,

    cssSourceMap: true
  },

  build: {
    // Template for index.html
    index: path.resolve(__dirname, '../dist/index.html'),

    // Paths
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: './',
    productionSourceMap: true,
    devtool: '#source-map',
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    bundleAnalyzerReport: process.env.npm_config_report
  }
}
