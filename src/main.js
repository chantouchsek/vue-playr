import VuePlayer from './VuePlayr.vue'

class VuePlayr {
  install = (Vue, options = {}) => {
    const { componentName = 'vue-playr' } = options
    if (options.plyr) {
      VuePlayer.props.options.default = () => {
        return { ...options.plyr }
      }
    }
    if (options.emit) {
      VuePlayer.props.emit.default = () => {
        return [...options.emit]
      }
    }
    Vue.component(componentName, VuePlayer)
  }
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlayer)
}

export default new VuePlayr
