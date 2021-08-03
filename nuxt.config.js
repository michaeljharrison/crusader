// import axios from 'axios'
import webpack from 'webpack'

export default {
  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Telemon Crusade',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/style/base.scss',
    '@/assets/style/main.scss',
    '@/assets/style/font.scss',
    '@/assets/style/type.scss',
    'ant-design-vue/dist/antd.css',
    '@/assets/style/strongholder.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui',
    { src: '~/plugins/persistedState.client.js' },
    '@/plugins/vue-json-pretty',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
    '@nuxtjs/svg',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/firebase',
  ],

  firebase: {
    config: {
      apiKey: 'AIzaSyBJbFtUL95rKri_xd-_EZtKEf7xlNc0-Jk',
      authDomain: 'crusader.firebaseapp.com',
      projectId: 'crusader-3cc51',
      storageBucket: 'crusader-3cc51.appspot.com',
      messagingSenderId: '177105489838',
      appId: '1:177105489838:web:baf620bdb63389 3483423f',
      measurementId: 'G-MMNYHW03JF',
    },
    services: {
      auth: {
        persistence: 'local', // default
        initialize: {
          onAuthStateChangedMutation: 'SET_authState',
          subscribeManually: false,
        },
        ssr: false, // default
        // emulatorPort: 9099,
        // emulatorHost: 'http://localhost',
        // disableEmulatorWarnings: false,
      },
      firestore: true,
      functions: false,
      storage: true,
      database: false,
      messaging: false,
      performance: false,
      analytics: false,
      remoteConfig: false,
    },
  },

  firestore: {
    memoryOnly: false, // default
    chunkName: process.env.NODE_ENV !== 'production' ? 'firebase-auth' : '[id]', // default
    enablePersistence: true,
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {},

  router: {
    routes: [
      {
        name: 'factions-name',
        path: '/factions/:name?',
        component: 'pages/factions/_name.vue',
      },
      {
        name: 'report-name',
        path: '/combatLog/:name?',
        component: 'pages/combatLog/_name.vue',
      },
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      if (ctx.isDev) {
        config.devtool = ctx.isClient ? 'source-map' : 'inline-source-map'
      }
    },
    plugins: [
      new webpack.ProvidePlugin({
        // global modules
        _: 'lodash',
      }),
    ],
  },
}
