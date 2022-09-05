'use strict'
const path = require('path')
const WebpackAliOSSPlugin = require('../webpack-alioss-plugin/output/index') 
const format = WebpackAliOSSPlugin.getFormat('YYMMDD')
console.log(format)
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = {
  outputDir: 'dist/xx',
  assetsDir: format+'/static',
  lintOnSave: false,
  productionSourceMap: false, // webpack调试
  devServer: {
    port: 8080,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    }
  },
  configureWebpack: {
    name: 'plugin-test',
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      // 如果没有配置 oss.config.js , 需要传入参数
      // new WebpackAliOSSPlugin({...})
      new WebpackAliOSSPlugin(
        {
          buildPath: 'dist/xx/**',
          region: 'xxx',
          accessKeyId: "xxx",
          accessKeySecret: "xxxx",
          bucket: 'xxx',
          prefix: '',
          format: format,
          limit: 3
        }
      )
    ]
  },
  chainWebpack: config => {
    // DefinePlugin
    config.plugin('define').tap(args => {
      args[0]['run_server'] = 'development'
      return args
    })
  }
}
