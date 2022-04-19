// import path from 'path'
// import fs from 'fs'
import colors from 'vuetify/es5/util/colors'

export default {
  // server: {
  //   // https: {
  //   //   key: fs.readFileSync(path.resolve(__dirname, 'ssl/server.key')),
  //   //   cert: fs.readFileSync(path.resolve(__dirname, 'ssl/server.crt')),
  //   // },
  //   port: 3000, // default: 3000
  //   host: '127.0.0.1', // default: localhost
  // },
  /*
   ** Nuxt rendering mode
   ** See https://nuxtjs.org/api/configuration-mode
   */
  mode: 'universal',
  /*
   ** Nuxt target
   ** See https://nuxtjs.org/api/configuration-target
   */
  target: 'server',
  /*
   ** Headers of the page
   ** See https://nuxtjs.org/api/configuration-head
   */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
      },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href: 'https://use.fontawesome.com/releases/v5.15.3/css/all.css',
      },
      {
        rel: 'stylesheet',
        type: 'text/css',
        href:
          'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css',
      },
    ],
    script: [
      {
        src: 'https://use.fontawesome.com/releases/v5.0.13/js/all.js',
        body: true,
      },
      {
        src: '/js/jquery-3.6.0.slim.min.js',
        body: true,
      },
      {
        src: '/js/bootstrap.bundle.min.js',
        body: true,
      },
    ],
  },
  /*
   ** Global CSS
   */
  css: ['~/assets/admin.scss'],
  /*
   ** Plugins to load before mounting the App
   ** https://nuxtjs.org/guide/plugins
   */
  plugins: [
    { src: '@/plugins/mixin.js', mode: 'client' },
    '~/plugins/notify.js',
    '~/plugins/confirm.js',
    '~/plugins/vee-validate.js',
  ],
  /*
   ** Auto import components
   ** See https://nuxtjs.org/api/configuration-components
   */
  components: true,
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    // Doc: https://github.com/nuxt/content
    '@nuxt/content',
    '@nuxtjs/auth-next',
    'nuxt-socket-io',
    '@nuxtjs/recaptcha',
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    // baseURL: 'https://api.iotsnacksbox.io',
    baseURL: 'http://52.45.109.87:5000/api',
    // baseURL: 'https://api.iotsnacksbox.io/',
  },
  /*
   ** Content module configuration
   ** See https://content.nuxtjs.org/configuration
   */
  content: {},
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          background: '#333',
          primary: '#0f1627',
          secondary: '#2d9cb8',
          accent: '#82B1FF',
          error: '#f15e5d',
          info: '#2196F3',
          success: '#4caf4e',
          warning: '#FFC107',
          baground: '#f2f34f',
        },
        dark: {
          background: '#f00',
          primary: '#0f1727',
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: '#f15e5d',
          success: '#4caf4e',
          baground: '#1e1d2e',
        },
      },
    },
  },

  auth: {
    // localStorage: false,
    cookie: {
      options: {
        expires: 7,
        secure: false,
      },
    },
    strategies: {
      local: {
        scheme: 'refresh',
        token: {
          property: 'access_token',
          maxAge: 1800,
          type: 'Bearer',
        },
        refreshToken: {
          property: 'refresh_token',
          required: true,
          data: 'refresh_token',
          tokenRequired: true,
          type: 'Bearer',
        },
        user: {
          property: 'user',
          autoFetch: false,
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          refresh: { url: '/refresh-token', method: 'post' },
          user: { url: '/user', method: 'get' },
          logout: {
            url: '/logout',
            method: 'post',
          },
        },
        autoLogout: false,
      },

      facebook: {
        clientId: '352652462786335',
        userinfo_endpoint: false,
        scope: ['public_profile', 'email'],
      },
      google: {
        clientId:
          '943564522948-plq7dthe55ng8fl16f60f222651jt2hf.apps.googleusercontent.com',
        user: false,
      },
      github: {
        clientId: '62a6f93ad4b02a042402',
        clientSecret: 'b23e57d581df85d5aa25edf5bd79c64bcb5fc0eb',
        scope: ['user:email'],
      },
      linkedin: {
        scheme: 'oauth2',
        endpoints: {
          authorization: 'https://www.linkedin.com/oauth/v2/authorization',
          token: 'https://www.linkedin.com/oauth/v2/accessToken',
          userInfo: 'https://www.api.linkedin.com/oauth/v2/me',
        },
        scope: ['r_liteprofile', 'r_emailaddress'],
        accessType: undefined,
        grantType: 'authorization_code',
        responseType: 'code',
        tokenType: 'Bearer',
        clientId: '8625913ip6ez65',
        clientSecret: '6NkOHalkJWPBP6Qm',
        token_key: 'access_token',
        state: 'kjhdflkjsdhfkjlsahfksayfiusdiou',
      },
    },
    plugins: [{ src: '~/plugins/auth.js', ssr: false }],
  },
  io: {
    sockets: [
      // Required
      {
        // url: 'https://api.iotsnacksbox.io',
        url: 'http://52.45.109.87:5000',
      },
    ],
  },
  /*
   ** Build configuration
   ** See https://nuxtjs.org/api/configuration-build/
   */
  build: {
    transpile: ['vee-validate/dist/rules'],
  },
  recaptcha: {
    hideBadge: true,
    siteKey: '6LevacoZAAAAAIspi952bZKg0xhwvXIyCzu6kTW4',
    version: 3,
  },
}
