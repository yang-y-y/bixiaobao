// 在每个路由改变时被调用 nuxt.config.js配置
export default function ({ isHMR, app, store, $cookies,route, params, error, redirect, req }) {
    // console.log( $cookies.get('token'))
    let cookiesearch = $cookies.get('search') || ''
    let removesearch = $cookies.remove('search') ||''

    if (cookiesearch && cookiesearch !== store.state.search) {
        store.commit('SET_SEARCH', cookiesearch)
    }
    if (removesearch && removesearch == store.state.search) {
        store.commit('REMOVE_SEARCH', removesearch)
    }
    
}