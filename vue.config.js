const webpack = require('webpack')
const path = require('path')

let publicPath

if (process.env.NODE_ENV === 'development') {
  publicPath = `https://${process.env.HOST}:${+process.env.PORT || 9000}/`
} else {
  publicPath = process.env.PUBLIC_PATH
}

console.log(`Build for ${process.env.NODE_ENV}: ${publicPath}`)

const configureWebpack = {
  devtool: 'cheap-module-eval-source-map',
  performance: {
    hints: false
  },
  plugins: [
    new webpack.NormalModuleReplacementPlugin(/node_modules\/ant-design-vue\/dist\/antd\.less/, path.resolve(__dirname, 'src/assets/css/antd.less'))
  ],
  output: {
    libraryExport: 'default',
    libraryTarget: 'umd',
    library: '[name]',
    filename: 'bundle.js'
  }
}

if (process.env.NODE_ENV === 'prod') {
  configureWebpack.devtool = '#hidden-source-map'
  configureWebpack.optimization = {
    minimize: true,
    splitChunks: {
      chunks: 'async',
      automaticNameDelimiter: '-',
      name: true
    }
  }
}

module.exports = {
  outputDir: 'build',
  publicPath,
  configureWebpack,
  chainWebpack: config => {
    config.optimization.delete('splitChunks')
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    host: process.env.HOST,
    port: +process.env.PORT || 9000,
    disableHostCheck: true,
    hot: true,
    hotOnly: true,
    inline: true,
    https: true,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    overlay: {
      warnings: false,
      errors: true
    },
    watchOptions: {
      poll: true
    }
  }
}
