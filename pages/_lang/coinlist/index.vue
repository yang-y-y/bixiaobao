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
            <HomeNav navIdx="0"/>
            <div class="">
              
              <div class="el-loading-mask" v-if="loading"><div class="el-loading-spinner"><svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg><!----></div></div>
              <div class="pages-top">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  @current-change="handleCurrentChange"
                  :page-size="100"
                  :current-page="page"
                  >
                </el-pagination>
              </div>
              <Mtable v-bind:Tdata="listdatalist" v-bind:isload="loading"/>
              <div class="pages">
                <a :href="'/?page='+Number(page-1)">l</a>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="listdata?listdata.count:0"
                  @current-change="handleCurrentChange"
                  :page-size="100"
                  :hide-on-single-page="true"
                  :current-page="page"
                ></el-pagination>
                <a :href="'/?page='+Number(page+1)">n</a>
              </div>
            </div>
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
// import myheader from "~/pages/_lang/commen/header";
// import {getSocket,webSocketClose} from '~/plugins/socket.js';
let timestamp = new Date().getTime();
let newtime = (timestamp / 10).toFixed(0);
let clickNum = 0;

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
    // pageId:{
    //   type:String,
    //   required:true
    // }
  },
  name: "coinlist",
  data() {
    return {
      navIdx: 0,
      // path:"ws://192.144.218.132:8088/ws",
      socket:"",
      wsData:0, // 保存 websocket 数据对象
      wsUpDown:0,
      sendCodeData: ["bitcoin","ethereum"],
      changeStatu:0,
      rateCur:1,
      listdata: [], //币种数据
      listdatalist:[],
      loading: true,
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
    let oncur = 'CNY'

    if(store.state.coinlist!=''){
      return false
    }
    
    let [tokenliset] =  await Promise.all([
      $axios.get(
      "v1/token/list/?currency=" +
        currency +
        "&language=" +
        urdata +
        "&page=" +
        pages
      ).catch(err => {console.log(err)})
    ]);
    store.commit('setCoinlist',tokenliset.data.data.results)
    return {
      listdata: tokenliset.data.data,
      listdatalist:tokenliset.data.data.results,
      page: pages,
      loading: false,
    };
  },
  created() {
    // 实例被创建之后执行代码
    // this.loadData(this.$store.state.currency,1)
    this.getnewprice(this.listdatalist,this.page)
    
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // VeLine,
    // myheader,
    // getSocket

  },
  destroyed: function() {
　  //页面销毁时关闭长连接
    webSocketClose()
  },
  methods: {
    // 方法this.socket = new WebSocket('ws://192.144.218.132:8088/ws')
    getWstoken(listdata){
      this.$axios
        .get("global/ws/token/")
        .then(({ data }) => {
          let getdata = data.data.results
          let newdata = []
          for(let i=0;i<getdata.length;i++){
            newdata.push(getdata[i].code)
          }
          this.sendCodeData=newdata;
          if(this.page==1){
            this.getSocketData(listdata);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getSocketData(listdata) {
        let params = this.sendCodeData;
        
        getSocket('wss://api.bixiaobao.com/ws',JSON.stringify(params),(data, ws) => {
                // 保存数据对象, 以便发送消息
              //  this.wsUpDown = Number(getwsData[0].change).toFixed(2);
                if(data){
                  let  getwsData = JSON.parse(data.data);
                  this.wsData = getwsData
                  let arr2 = getwsData
                  
                  let arr3list = []
                  for (let i=0;i<arr2.length;i++) {
                      arr3list.push({
                          code: arr2[i].name,
                          price_global: arr2[i].price,
                      }); /*属性值*/
                  }
                  for(let i = 0; i < listdata.length; i++){
                    listdata[i].isnew = false;
                  }
                  this.listdatalist = listdata
                  let _this = this;
                  setTimeout(function(){
                    _this.uniqueArrws22(listdata,getwsData)
                  },500)
                }
                
            }
        );
    },
    uniqueArrws22(olddata,newdata){
      for(let i = 0; i < olddata.length; i++){
          for(let j = 0; i < newdata.length; j++){
              if (olddata[j].code == newdata[i].name) {
                  olddata[j].isnew = true;
                  if(Number(olddata[j].price_global) > Number(newdata[i].price)){
                     olddata[j].updown = 'down';
                  }else if(Number(olddata[j].price_global) < Number(newdata[i].price)){
                     olddata[j].updown = 'up';

                  }
                  olddata[j].price_global = newdata[i].price
                  olddata[j].increase24h = newdata[i].change
                  break;
              }
          }
      }
      this.listdatalist = olddata
    }, 
    uniqueArr(arr1,arr2) {
      let arr3= []
      for(let i=0;i<arr1.length;i++){
          let newarr = {...arr1[i], ...arr2[i]}
          arr3.push(newarr)
      }
      this.listdatalist = arr3
    },
    formatter(row, column) {
      return row.address;
    },
    loadData(currency, page) {
      this.$axios
        .get("v1/token/list/", {
          params: {
            currency: currency,
            language: this.language,
            page: page,
          },
        })
        .then(({ data }) => {
          this.listdata= data.data;
          this.listdatalist = data.data.results;
          this.loading = false;
          this.getnewprice(data.data.results,page)
          
        }).catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    getnewprice(olddata,page){
      this.$axios.get(
      "v1/token/price/list/",{
        params: {
          currency: this.$store.state.currency,
          language: this.language,
          page: page,
          t:newtime
        },
      }).then(({data})=>{
          this.uniqueArr(olddata,data.data.results)
      }).catch(err => {console.log(err)})

    },
    // gotoDatail(data) {
    //   let routeUrl = this.$router.resolve({
    //     path: "/" + this.$i18n.locale + "/coinlist/" + data.code,
    //   });
    //   window.open(routeUrl.href, "_blank");
    // },
    handleCurrentChange(val) {
      this.loading = true;
      this.page = val;
      this.loadData(this.$store.state.currency,val)
      this.$store.commit('setCoinlist','')
    },
    getMag(msg) {
      this.$store.commit('setCoinlist','')
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
      // console.log('adaf')
      // this.loading = true;
      // this.loadData(this.currency, this.page);
    },
    initCharts(datas) {
      if (process.client) { 
        let self = this;
        if (!datas) return false;
        datas.forEach((value, index) => {
          this.$nextTick(function () {
            this.paintChart(index, value);
          });
        });
      }
    },
    paintChart(i, params) {
      if(!params.score.rows){
        return false
      }
      let lineChart = this.$echarts.init(
        document.getElementById("lineChart" + i),
        "",
        { devicePixelRatio: 2 }
      );
      let seriesData = [];
      let xAxisData = [];
      let colorSty = params.increase24h >= 0 ? "#34a25f" : "#d53c3c";
      let sData = params.score.rows;
      for (let i = 0; i < sData.length; i++) {
        seriesData.push(sData[i].指数);
        xAxisData.push(sData[i].日期);
      }
      let option = {
        color: ["#3398DB"],
        tooltip: {
          show: false,
        },
        grid: {
          left: "0%",
          right: "1%",
          bottom: "1%",
          top: "0",
        },
        xAxis: [
          {
            type: "category",
            data: xAxisData,
            show: false,
          },
        ],
        yAxis: [
          {
            type: "value",
            show: false,
          },
        ],
        series: [
          {
            type: "line",
            data: seriesData,
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 0.6,
                color: colorSty,
              },
            },
          },
        ],
      };
      lineChart.setOption(option);
    },
  },
  mounted() {
    // 页面进入时加载内容
    // this.getWstoken(this.listdatalist);

    // this.initWebSocket();
    // let self = this;
    // setTimeout(function(){
    //   self.listdata.results.forEach((value,index)=>{
    //       self.paintChart(index,value)
    //   })
    // },300)
    
  },
  watch: {
    // 监测变化
     listdatalist:{
        handler:function(val,oldval){
          let _this = this;
          _this.changeStatu = 0;
          for(let i=0;i<val.length;i++){
               if(val[i].price_global>oldval[i].price_global){
                  _this.changeStatu = 1;

                }else if(val[i].price_global<oldval[i].price_global){
                  _this.changeStatu = 2;
                }
          }

          setTimeout(function(){
            _this.changeStatu = 0;
          },500)

          let ralist  = this.$store.state.ratelist
            let raNew = []
            for(let i=0;i<ralist.length;i++){
              if(this.$store.state.currency=='CNY'){
                raNew = ralist[0].rate
              }else if(this.$store.state.currency=='USD'){
                raNew = ralist[1].rate
              }else{
                raNew = ralist[2].rate
              }
            }
            this.rateCur = Number(raNew)
            // console.log(raNew)
          

        },
        deep:true//对象内部的属性监听，也叫深度监听
      },
  },
  updated() {
        // console.log('App.vue finish re-render')
  },
  // 离开当前页面销毁内容
  destroyed() {
  }
};

</script>
