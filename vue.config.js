const { defineConfig } = require('@vue/cli-service')
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = defineConfig({
  chainWebpack: (config) => {
    config.resolve.alias.set('#', resolve('types'))
  }
})
