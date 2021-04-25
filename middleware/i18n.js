// 在每个路由改变时被调用 nuxt.config.js配置
export default function({ isHMR, app, server,store, route, params,query, error, redirect ,req }) {

    const defaultLocale =  app.i18n.fallbackLocale // 修改
    // If middleware is called from hot module replacement, ignore it
    if (isHMR) return
    // Get locale from params

    const locale = params.lang || store.state.locale || defaultLocale;
    //不存在该多语言的错误页面跳转
    if (store.state.locales.indexOf(locale) === -1) {
      // return redirect('/' + store.state.locale)
      return error({
        message: 'This language could not be found.',
        statusCode: 404
      })
    }
    // 跳转登录页面
    if (route.query.invite) {
      redirect('/'+ store.state.locale+"/login?invite="+route.query.invite)
    }
    
  // 路由初始化重定向
  //  if (route.fullPath === '') {  // ‘/’是路由文件的base值
  //     return redirect('/' + store.state.locale + '' + route.fullPath)
  //   }
    // Set locale 
  // 需注意 ，vuex 页面刷新后状态将不再保存，若需保存，可使用localstorage


    let cookielang = app.$cookies.get('lang');
    let paramslang = params.lang;
    if(paramslang){
        store.commit('SET_LANG', paramslang)
        app.$cookies.set('lang',paramslang)
    }else if(cookielang){
        store.commit('SET_LANG', cookielang)
    }
    
    
    let cookiecode = app.$cookies.get('task');
    if(cookiecode){
      store.commit('setSerial', cookiecode)
    }

    let cookieToken = app.$cookies.get('token');

    if(cookieToken){
        store.commit('setToken', cookieToken)
    }
    let timestamp = new Date().getTime();
    let newtime = (timestamp/10).toFixed(0)
    store.commit('newTime',newtime)

    let cookiecurrency= app.$cookies.get('currency')
    
    if(query.currency){
      store.commit("setCurrency", query.currency);
      if(query.currency=='CNY'){
        store.commit('curRate','¥')
      }else if(query.currency=='USD'){
        store.commit('curRate','$')
      }else{
        store.commit('curRate','₩')
      }
    }else if(cookiecurrency){
      store.commit("setCurrency", cookiecurrency);
    }else{
      app.$cookies.set('currency',store.state.currency)
    }

    let cookiesymbol = app.$cookies.get('symbol')

    if(cookiesymbol){
      store.commit('curRate',cookiesymbol)
    }else{
      app.$cookies.set('symbol',store.state.curRate)
    }

    // let { data } = app.$axios.get('/token');
    // store.commit('setToken', data.token);

    app.i18n.locale = store.state.locale 
  }