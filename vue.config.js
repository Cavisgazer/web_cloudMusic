module.exports = {
  // publicPath: "./",
  configureWebpack: {
      resolve: {
          alias: {
              'assets': '@/assets',
              'common': '@/common',
              'components': '@/components',
              'network': '@/network',
              'views': '@/views',
              'plugins': '@/plugins',
          }
      }
  },
  devServer: {
      proxy: {
          '/api': {
              target: 'http://1.12.227.123:3000/',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/api': ''
              }
          },
          'm7': {
              target: 'http://m7.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m7': ''
              }
          },
          'm701': {
              target: 'http://m701.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m701': ''
              }
          },
          'm8': {
              target: 'http://m8.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m8': ''
              }
          },
          'm801': {
              target: 'http://m801.music.126.net',
              changeOrigin: true,
              ws: true,
              pathRewrite: {
                  '^/m801': ''
              }
          }
      }
  },
  // dev: {
  //   env: require('./dev.env'),
  //   port: 8080,
  //   autoOpenBrowser: true,
  //   assetsSubDirectory: 'static',
  //   assetsPublicPath: '/',
  //   proxyTable: {
  //     '/api': {
  //       target:'http://www.codeman.ink:3000', // 你请求的第三方接口
  //       changeOrigin:true, // 在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
  //       pathRewrite:{  // 路径重写，
  //         '^/api': ''  // 替换target中的请求地址，也就是说以后你在请求http://api.douban.com/v2/XXXXX这个地址的时候直接写成/api即可。
  //       }
  //     }
  //   },
  //   // CSS Sourcemaps off by default because relative paths are "buggy"
  //   // with this option, according to the CSS-Loader README
  //   // (https://github.com/webpack/css-loader#sourcemaps)
  //   // In our experience, they generally work as expected,
  //   // just be aware of this issue when enabling this option.
  //   cssSourceMap: false
  // }
}