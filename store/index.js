export const state = () => ({
    bixiaobao: "https://cdn.bixiaobao.com/",
    locales: ['cn', 'en', 'ru', 'tw', 'kr'],
    locale: 'cn',
    currentCoin: 'eth',
    language: 'zh_CN',
    config: [],
    token: '',
    ratelist: [],
    curRate: '$',
    search: '',
    historyList: [],
    currency: 'CNY',
    newtime: [],
    userinfo: [],
    usdprice: 1,
    islogin: false,
    isShow: false,
    serial: '',
    wallet: [],
    type: 0,
    langlist: [],
    coinlist: [],
    setNewlist:[],
    nftlist:[],
    hotlist:[],
    bscelist:[],
    pelist:[],
    pricedata: [],
    exchangelist: [],
    defilist: [],
    HeadLang: [
        {
            value: "1",
            label: "简体中文",
            code: "zh_CN",
            id: "cn",
        },
        {
            value: "2",
            label: "繁体中文",
            code: "zh_tw",
            id: "tw",
        },
        {
            value: "3",
            label: "韩语",
            code: "ko_KR",
            id: "kr",
        },
        {
            value: "4",
            label: "English",
            code: "en",
            id: "en",
        },
        {
            value: "5",
            label: "俄语",
            code: "ru",
            id: "ru",
        }
    ]
})

export const mutations = {
    SET_LANG(state, locale) {
        if (state.locales.includes(locale)) {
            state.locale = locale
            if (locale == 'cn') {
                state.language = 'zh_CN'
            } if (locale == 'kr') {
                state.language = 'ko_KR'
            } if (locale == 'en') {
                state.language = 'en'
            } if (locale == 'ru') {
                state.language = 'ru'
            } if (locale == 'tw') {
                state.language = 'zh_tw'
            }
        }
        //   console.log(locale)
    },
    SET_SEARCH(state, search) {
        if (state.search !== search) {
            state.search = search
        }
    },
    REMOVE_SEARCH(state, search) {
        if (state.search == search) {
            state.search = ''
        }
    },
    configadd(state, object) {
        // state.config.push()
        state.config = object
    },
    setusdt(state, data) {
        state.usdprice = data
    },
    setToken(state, token) {
        state.token = token
    },
    setPageid(state, id) {
        state.pageId = token
    },
    setRate(state, rate) {
        state.ratelist = rate
    },
    curRate(state, rate) {
        state.curRate = rate
    },
    setCurrency(state, currency) {
        state.currency = currency
    },
    newTime(state, newtime) {
        state.newtime = newtime
    },
    setToken(state, token) {
        state.token = token
        state.islogin = true
    },
    setUserinfo(state, user) {
        state.userinfo = user;
        state.islogin = true
    },
    logout(state, bool) {
        state.islogin = bool
    },
    openDlog(state, bool) {
        state.isShow = bool
    },
    loginType(state, type) {
        state.type = type
    },
    setSerial(state, code) {
        state.serial = code
    },
    setWallet(state, val) {
        state.wallet = val
    },
    setLang(state, val) {
        state.langlist = val
    },
    setCoinlist(state, val) {
        state.coinlist = val
    },
    setNewlist(state, val) {
        state.setNewlist = val
    },
    setHotlist(state, val) {
        state.hotlist = val
    },
    setNft(state, val) {
        state.nftlist = val
    },
    setPelist(state, val) {
        state.pelist = val
    },
    setBscelist(state, val) {
        state.bscelist = val
    },
    setExchangelist(state, val) {
        state.exchangelist = val
    },
    setDefilist(state, val) {
        state.defilist = val
    },
    setPricedata(state, val) {
        state.pricedata = val
    },
    setHdLgLst(state, val) {
        state.HeadLang = val

    }


}
export const actions = {
    async nuxtServerInit({ commit }, { app, params, query, req }) {

        // let cookie = req.headers.cookie;
        // let cookieToken = app.$cookies.get('token')
        // await app.$axios.get("global/currency/").then(({ data }) => {
        //     commit("setRate", data.data.results);
        // }).catch(err => { 
        //     console.log(err)
        // });

        // let cookieArr = cookie.split(";");
        // let obj = {} 
        // cookieArr.forEach((i) => {
        //     let arr = i.split("=");
        //     obj[arr[0]] =arr[1];
        // });
        // console.log(obj.JSON)


        // await app.$axios.get("global/info/?currency="+app.store.state.currency).then(({ data }) => {
        //     if(app.store.state.config==''){
        //         commit("configadd", data.data);
        //         commit("setusdt", data.data.usdt_price);
        //     }
        // }).catch(err => {
        //     console.log('-----',err)
        // });

        // if(cookieToken){
        //     if(app.store.state.userinfo!='') return false;
        //     await app.$axios.get("account/info/",{headers: {
        //         'Authorization': 'BIXIAOBAO '+ cookieToken
        //     }}).then(({ data }) => {
        //         commit('setUserinfo', data.data);
        //         console.log('登录检查获取登录信息。。。。。。')

        //     }).catch(err => {
        //         console.log(err)

        //     });

        //     // app.$cookie.set("USER_INVITE", accountinfo.data.data.invite)
        // // }
        if (params.lang) {
            commit('SET_LANG', params.lang)
            app.$cookies.set('lang', params.lang)
        }
        if (query.currency) {
            commit('setCurrency', query.currency)
            app.$cookies.set('currency', query.currency)

        }
        // if(app.store.state.langlist!='') return false;

        // await app.$axios.get("language/list/").then(({ data }) => {
        //     commit('setLang',data.data)
        // }).catch(err => {
        //     console.log(err) 
        // });

        // 重新给用户存值
    }
}