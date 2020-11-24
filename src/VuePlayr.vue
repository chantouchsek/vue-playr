<script>
  import Plyr from 'plyr'

  export default {
    name: 'VuePlayr',
    props: {
      options: {
        type: Object,
        required: false,
        default() {
          return {}
        }
      },
      events: {
        type: Array,
        default() {
          return ['play', 'pause']
        }
      }
    },
    data() {
      return {
        player: {}
      }
    },
    computed: {
      opts() {
        const options = this.options
        if (
          !Object.prototype.hasOwnProperty.call(
            this.options,
            'hideYouTubeDOMError'
          )
        ) {
          options.hideYouTubeDOMError = true
        }
        return options
      }
    },
    mounted() {
      const _this = this
      _this.player = new Plyr(_this.$el, _this.opts)
      if (!_this.player) return
      _this.events.forEach((element) => {
        _this.player.on(element, (e) => {
          _this.emitEvent(e)
        })
      })
    },
    methods: {
      destroyPlyr() {
        try {
          this.player.destroy()
        } catch (e) {
          const message = 'The YouTube player is not attached to the DOM.'
          if (!(this.opts.hideYouTubeDOMError && e.message === message)) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        }
      },
      emitEvent(event) {
        const { plyr } = event.detail
        this.$emit(event.type, plyr)
      }
    },
    beforeUnmount() {
      this.destroyPlyr()
    },
    render() {
      const slots = this.$slots.default
      return typeof slots === 'function' ? slots()[0] : slots
    }
  }
</script>
<style>
@import "~plyr/dist/plyr.css";
</style>
