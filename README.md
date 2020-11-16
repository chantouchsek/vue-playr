# vue-playr
> v0.0.7 - [Changelog](https://github.com/chantouch/vue-playr/blob/main/changelog.md)

A vue component for the plyr video & audio player.

This is useful for when you want a nice video player in your Vue app.

It uses [plyr](https://plyr.io) by [sampotts](https://github.com/sampotts) for the players.

Supported player types: HTML5 video, HTML5 audio, YouTube, and Vimeo.

### Demo
A demo of the components (equivalent to the html example include here) can be found at
[chantouch.github.io/vue-playr](https://chantouch.github.io/vue-playr/).

## Installation
```bash
yarn add vue-playr # or npm i vue-playr
```

### Module
```js
// In your main vue file - the one where you create the initial vue instance.
import Vue from 'vue'
import VuePlayr from 'vue-playr'
import 'vue-playr/dist/vue-playr.css'

// Vue 3.x
// The second argument is optional and sets the default config values for every player.
createApp(App)
  .use(VuePlayr, {
    plyr: {}
  })
  .mount('#app')

// Vue 2.x
// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlayr, {
  plyr: {}
})
```

### SSR [(more below)](#ssr)
For SSR, you can import the SSR optimized module, found at `dist/vue-playr.ssr.js`. There is a more in depth description
on how to use it with [nuxt](#nuxt) below.

### Browser
In the browser you can include it as you would any other package with unpkg, along with the stylesheet:

```html
<script type="text/javascript" src="https://unpkg.com/vue"></script>
<script type="text/javascript" src="https://unpkg.com/vue-playr"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-playr/dist/vue-playr.css" />

<!-- You will also need to install the component during app creation -->
<script>
  window.Vue.createApp(VuePlayr).mount('#app')
</script>
```

## Usage
Once installed, it can be used in a template as simply as:

```vue
<!-- video element -->
<vue-playr :options="options">
  <video
    controls
    crossorigin
    playsinline
    data-poster="poster.jpg"
  >
    <source
      size="720"
      src="/path/to/video-720p.mp4"
      type="video/mp4"
    />
    <source
      size="1080"
      src="/path/to/video-1080p.mp4"
      type="video/mp4"
    />
    <track
      default
      kind="captions"
      label="English captions"
      src="/path/to/english.vtt"
      srclang="en"
    />
  </video>
</vue-playr>

<!-- audio element -->
<vue-playr>
  <audio controls crossorigin playsinline>
    <source
        src="/path/to/audio.mp3"
        type="audio/mp3"
    />
    <source
        src="/path/to/audio.ogg"
        type="audio/ogg"
    />
  </audio>
</vue-playr>

<!-- youtube iframe with progressive enhancement (extra queries after the url to optimize the embed) -->
<vue-playr>
  <div class="plyr__video-embed">
    <iframe
      src="https://www.youtube.com/embed/bTqVqk7FSmY?amp;iv_load_policy=3&amp;modestbranding=1&amp;playsinline=1&amp;showinfo=0&amp;rel=0&amp;enablejsapi=1"
      allowfullscreen
      allowtransparency
      allow="autoplay"
    ></iframe>
  </div>
</vue-playr>

<!-- youtube div element -->
<vue-playr>
  <div data-plyr-provider="youtube" data-plyr-embed-id="bTqVqk7FSmY"></div>
</vue-playr>

<!-- vimeo iframe with progressive enhancement (extra queries after the url to optimize the embed) -->
<vue-playr>
  <div class="plyr__video-embed">
    <iframe
      src="https://player.vimeo.com/video/143418951?loop=false&amp;byline=false&amp;portrait=false&amp;title=false&amp;speed=true&amp;transparent=0&amp;gesture=media"
      allowfullscreen
      allowtransparency
      allow="autoplay"
    ></iframe>
  </div>
</vue-playr>

<!-- vimeo div element -->
<vue-playr>
  <div data-plyr-provider="vimeo" data-plyr-embed-id="143418951"></div>
</vue-playr>
```

## Player Instance
To access the player instance, you can use the `player` property from the `refs` attribute.

```html
<template>
  <vue-playr ref="plyr">...</vue-playr>
</template>

<script>
  export default {
    name: 'Component',
    mounted () {
      console.log(this.$refs.plyr.player)
    }
  }
</script>
```

## Examples
Examples of how to use this app can be found [here](https://github.com/chantouch/vue-playr/tree/main/examples).

## Events
If you want to capture events from the plyr instance, you can do so by accessing the player instance through the `ref`
attribute and using that object for events, as you would with a vanilla plyr instance.

Valid events are [here](https://github.com/sampotts/plyr#events).

```html
<template>
  <vue-playr ref="plyr">...</vue-playr>
</template>
<script>
  export default {
    name: 'Component',
    mounted () {
      this.$refs.plyr.player.on('event', () => console.log('event fired'))
    }
</script>
```

## Options
For custom options you can pass an `options` prop which is an object that will be passed to the `new Plyr()` creation.
Available options
[here](https://github.com/sampotts/plyr#options). I have added a new option (`hideYouTubeDOMError`) that hides the error
that is always logged when destroying a YouTube player. It defaults to `true`, and you can disable it and see the error
by setting it to false.

You can also specify the default options when registering the plugin
(these will be ignored if you specify a player-specific options object via props):

```js
createApp(App).use(VuePlayr, {
  plyr: {}
})
```

## SSR
### Nuxt (Vue 2.x)
This should support SSR out of the box. For [nuxt](https://nuxtjs.org/), create a file called `vue-playr.js` in your
plugins folder containing only these three statements:

```js
import Vue from 'vue'
import VuePlayr from 'vue-playr/dist/vue-playr.ssr.js'
import 'vue-playr/dist/vue-playr.css'

// The second argument is optional and sets the default config values for every player.
Vue.use(VuePlayr, {
  plyr: {}
})
```

Then, in your `nuxt.config.js` file add `{ src: '~/plugins/vue-playr', mode: 'client' }` to the plugins array. The
`vue-playr` element should be globally registered now.

The `nuxt.config.js` file should at minimum include this:

```js
export default {
  plugins: [{ src: '~/plugins/vue-playr', mode: 'client' }]
}
```

## Author

**vue-playr** © [Chantouch](https://github.com/chantouch), Released under the [MIT](./LICENSE.md) License.
