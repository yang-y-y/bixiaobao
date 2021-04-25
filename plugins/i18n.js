import Vue from 'vue'
import VueI18n from 'vue-i18n'
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'
import koLocale from 'element-ui/lib/locale/lang/ko'
import enLocale from 'element-ui/lib/locale/lang/en'
import ruLocale from 'element-ui/lib/locale/lang/ru-RU'
import twLocale from 'element-ui/lib/locale/lang/zh-TW'
import ElementLocale from 'element-ui/lib/locale'

Vue.use(VueI18n)

export default ({ app, store ,route ,$axios,redirect,req}) => {
  let cookielang = app.$cookies.get('lang')||'cn'
  let cookiecurrency =  app.$cookies.get('currency')

  // let DeFiRouter = 'https://www.bixiaobao.com' + cookielang + 'coinlist' + params.id;
  let mobileOrigin = 'https://m.bixiaobao.com'+route.fullPath
 
  let isMobile = (ua) => {
    return !!ua.match(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/)
  }
  let userAgent = req ? req.headers['user-agent'] : ''
  if(isMobile(userAgent)){
    return redirect(mobileOrigin)
  }
  
  // Set i18n instance on app
  // This way we can use it in middleware and pages asyncData/fetch


  // if(!cookielang){
  //   if(process.browser){
  //     if(navigator.language == 'en-US'){
  //       store.commit("SET_LANG", 'en');
  //     }if(navigator.language == 'ko-KR'){
  //       store.commit("SET_LANG", 'kr');
  //     }if(navigator.language == 'ru-RU'){
  //       store.commit("SET_LANG", 'ru');
  //     }if(navigator.language == 'zh_tw'){
  //       store.commit("SET_LANG", 'tw');
  //     }else{
  //       store.commit("SET_LANG", 'cn');
  //     }
  //   }
  // }else{
  //   if(!route.params.lang){
  //       return redirect('/'+cookielang)
  //   }
  // }
  if(!cookiecurrency){
    if(store.state.locale == 'kr'){
      store.commit("setCurrency", 'KRW');
      store.commit("curRate", '₩');
    }else if(store.state.locale == 'cn'){
      store.commit("setCurrency", 'CNY');
      store.commit("curRate", '¥')
    }else{
      store.commit("setCurrency", 'USD');
      store.commit("curRate", '$')
    }
  }


  app.i18n = new VueI18n({
    locale: store.state.locale,
    fallbackLocale: store.state.locale || 'cn',
    messages: {
      cn: {...require('~/locales/cn.json'),...zhLocale},
      en: {...require('~/locales/en.json'),...enLocale},
      kr: {...require('~/locales/kr.json'),...koLocale},
      ru: {...require('~/locales/ru.json'),...ruLocale},
      tw: {...require('~/locales/tw.json'),...twLocale}
    }
  })

  app.i18n.path = (link) => {
    if (app.i18n.locale === app.i18n.fallbackLocale) {
      // return `/${link}`
      return `/${app.i18n.locale}/${link}`
    }

    return `/${app.i18n.locale}/${link}`
  }
  ElementLocale.i18n((key,value)=>app.i18n.t(key,value));

  
}
  