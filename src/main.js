import VuePlayer from './VuePlayer.vue'

VuePlayer.install = (Vue, options = {}) => {
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
  Vue.component(VuePlayer.name, VuePlayer)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(VuePlayer)
}

export default VuePlayer
