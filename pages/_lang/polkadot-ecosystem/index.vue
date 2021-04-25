<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <el-backtop :bottom="50" :right="30">
      <div class="back-top">
      <i class="el-icon-arrow-up"></i>
      </div>
    </el-backtop>
    <div class="home homelv2 margin">
      <div class="container flex">
        <div class="home_left">
          <div class="quotation">
            <HomeNav navIdx="4"/>
            <div class="blockDtail">
              {{$t('message.pokaDetail')}}
            </div>
            <Mtable v-bind:Tdata="listdatalist" v-bind:isload="loading"/>
            <div class="totalMarketVal">
              <div>
                {{$t('message.总市值')}}：
                <b>{{$store.state.curRate}}{{($store.state.config.market?$store.state.config.market.usd_market_value:'')|formatMoney}}</b>
              </div>
              <p>{{$t('message.更新时间')}}：{{$store.state.config.market?$store.state.config.market.utc_update_time[0]:''}}</p>
            </div>
          </div>
        </div>
        <div class="home_right">
          <Hotlist/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
let timestamp = new Date().getTime();
let newtime = (timestamp / 10).toFixed(0);
export default {
  watchQuery:['page','currency'],
  head() {
    return {
      titleTemplate: this.$t("home.title"),
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.$t("home.description"),
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.$t("home.keywords"),
        },
      ],
    };
  },
  props: {
    // 父辈向子辈传参
  },
  name: "polkadot-ecosystem",
  data() {
    return {
      navIdx:0,
      listdata: [], //币种数据
      listdatalist:[],
      loading: false,
      page: 1,
      currency: this.$store.state.currency,
      language: this.$store.state.language,
    }
  },
  async asyncData({ $axios, $cookies, store,params, query }) {
     let timestamp = new Date().getTime();
    let newtime = (timestamp/10).toFixed(0)
    let urdata = "";
    if (params.lang == "cn") {
      urdata = "zh_CN";
    }else if(params.lang=='kr'){
      urdata = 'ko_KR'
    }else if(params.lang=='ru'){
      urdata = 'ru'
    }else{
      urdata = "en";
    }
    let currency = "";
    currency = $cookies.get("currency")? $cookies.get("currency"):store.state.currency

    let pages = Number(query.page) || 1;

    if(store.state.pelist!=''){
      return false
    }
    
    let [tokenliset] =  await Promise.all([
      $axios.get(
      "ecology/62/?currency=" +
        currency +
        "&language=" +
        urdata +
        "&page=" +
        pages
      ).catch(err => {console.log(err)})
    ]);
    store.commit('setPelist',tokenliset.data.data.results)
    return {
      listdata: tokenliset.data.data,
      listdatalist:tokenliset.data.data.results,
      page: pages,
      loading: false,
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  destroyed: function() {
　  //页面销毁时关闭长连接
  },
  methods: {
    loadData(currency, page) {
      this.$axios
        .get("ecology/62/", {
          params: {
            currency: currency,
            language: this.language,
            page: page,
            type_id:1
          },
        })
        .then(({ data }) => {
          this.listdata= data.data;
          this.listdatalist = data.data.results;
          this.loading = false;
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    getMag(msg) {
      this.$store.commit('setPelist','')
      console.log(msg)
    },
    setLang(msg) {
      let getlang = []
      if (msg == "cn") {
        getlang = "zh_CN";
      }else if(msg=='kr'){
        getlang = 'ko_KR'
      }else if(msg=='ru'){
        getlang = 'ru'
      }else{
        getlang = "en";
      }
      this.language = getlang;
    }
  },
  mounted() {
    // 页面进入时加载内容
    
  },
  watch: {
    // 监测变化
    
  },
  updated() {
  },
  // 离开当前页面销毁内容
  destroyed() {
  }
};

</script>
