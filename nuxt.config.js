const axios = require('axios')
let timestamp = new Date().getTime();
module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  render: {
    resourceHints: false,
  },
  head: {
    meta: [{
      charset: 'utf-8'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    ],
    script: [
      { src:'https://cdn.bixiaobao.com/language.js',charset:"utf-8"},
      { src: 'https://hm.baidu.com/hm.js?92e8a9e3379f92834124d0fcaf73188c' },
      { src: 'https://wcs.naver.net/wcslog.js' }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: 'https://cdn.bixiaobao.com/favicon.ico'
    }
  ]
  },


  /*
  ** Customize the progress-bar color
  */
  loading: '@/components/loading.vue',
  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  router: {
    base:"/",
    middleware: [
      'i18n',
      'setcookie',
      // 'getip'
      // 'midd'
    ],
  },
  plugins: [
    { src: '@/plugins/iview', ssr: true },
    { src: '@/plugins/element-ui', ssr: true },
    { src: '@/plugins/axios', ssr: true },
    {src:'@/plugins/VueLazyload',ssr:false},
    {src:'@/plugins/i18n',ssr:true},
    {src:'@/plugins/moment',ssr:true},
    {src:'@/plugins/filters',ssr:true},
    {src:'@/plugins/ga',ssr:false},
    {src:'@/plugins/naver',ssr:false},
    {
      src: '@/plugins/vue-infinite-scroll',  // vue-infinite-scroll名字和js文件名字对应就行
      ssr: false // 只在client被打包引用
    }
  ],
  generate: {
    subFolders:false,
    // routes() {
    //   return axios.get('https://api.bixiaobao.com/token/list').then(({data}) => {
    //     return data.data.results.map(user => {
    //       return  '/cn/coinlist/' + user.code + '/en/coinlist/' + user.code&& '/kr/coinlist/' + user.code
    //     })
    //   })
    // },
    routes: [
      '/',
      '/cn',
      '/cn/coinlist/',
      '/cn/coinlist/bitcoin',
      '/cn/defi/',
      
      '/en',
      '/en/coinlist/bitcoin',
      '/en/defi/',

      '/kr',
      '/kr/coinlist/bitcoin',
      '/kr/defi/',
    ]
  },
  /*
  ** Nuxt.js dev-modules
  */
  components: true,
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
    ['cookie-universal-nuxt', { alias: 'cookiz' }],

  ],
  axios: {
    // baseURL: 'https://api.bixiaobao.com/',
    prefix: '/api',
    // credentials: true,
    proxy: true
  },
 
  proxy: {
    '/api': {
      target: 'https://api.bixiaobao.com/', //http://192.144.218.132/https://api.bixiaobao.com/
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    publicPath:'/_nuxt/',
    transpile: [/^element-ui/,/^iview/],
    vendor: ['axios', 'element-ui','iview'],
    extractCSS: { allChunks: true },
    filenames:{         // css 和 js  img 打包时指定文件夹
      app: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
      chunk: ({ isDev }) => isDev ? '[name].js' : '[chunkhash].js',
    },
    optimization: {
      splitChunks: {
        minSize: 30000,
        maxSize: 300000
      }
    },
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
      // console.log(config)
      
    },
    babel: {
      plugins: [
        ['component', {
          'libraryName': 'element-ui',
          'styleLibraryName': 'theme-chalk'
        }
        ],
        ["import", {
          "libraryName": "iview",
          "libraryDirectory": "src/components"
        }]
      ]
    },
    // analyze: true, 	
    // assetFilter: function(assetFilename) {	    		
    //   return assetFilename.endsWith('.js');	    	
    // }
  },
}
