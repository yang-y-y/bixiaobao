import Vue from 'vue';
import VueLazyload from 'vue-lazyload'
 
Vue.use(VueLazyload, {
  preLoad: 1.1,
  error: require('~/assets/cash_icon.png'),
  loading: require('~/assets/loading_small.png'),
  attempt: 10,
  listenEvents: [ 'scroll' ]
})
   