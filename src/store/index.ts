import { createStore } from 'vuex'
const modulesFiles = require.context('./modules', true, /\.ts$/)
const modules: any = modulesFiles
  .keys()
  .reduce((moduless: any, modulePath: string) => {
    const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
    const value = modulesFiles(modulePath)
    moduless[moduleName] = value.default
    return moduless
  }, {})
console.log(modules, 'modulesmodules')
const store = createStore({
  modules
})

export default store
