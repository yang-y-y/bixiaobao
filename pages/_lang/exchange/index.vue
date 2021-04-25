<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang"/>
  <div class="home homelv2 margin">
    <div class="container">
        <!-- <h3>{{$t('nav.平台')}}</h3> -->
        <div class="quotation">
          <div class="quotation_nav itemCenter">
            <ul class="itemCenter">
              <li
                v-for="(item,index) in myFollow"
                :key="index"
                @click="handlemyFollow(index)"
                :class="index == navIdx ? 'choice':''"
              >{{item}}</li>
            </ul>
          </div>
          <div  v-if="navIdx == 0" class="now_coin_all">
            <i-table :loading="loading"  :columns="columns1" :data="listdata.results" width="100%" :class="barFixed?'tableflex':''">
              <template slot-scope="{  row }" slot="name">
                <a class="defi_a" :href="'/' + $i18n.locale + '/exchange/' + row.code" target="_blank">
                    <div class="coinFirst">
                      <div>
                        <span><img v-lazy="$store.state.bixiaobao + row.logo_m" width="26" :alt="row.name"/></span>
                      </div>
                      <div class="namcon">
                        <div class="tokenNm">{{row.name||row.name_en}}</div>
                      </div>
                    </div>
                  </a>
                </template>
            </i-table>
            <div class="pages">
                <a :href="'/?page='+Number(page-1)">l</a>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="Number(listdata.count)"
                  @current-change="handleCurrentChange"
                  :page-size="100"
                  :current-page="page"
                  >
                </el-pagination>
                <a :href="'/?page='+Number(page+1)">n</a>
            </div>
          </div>
          <div v-if="navIdx == 1" class="now_coin_all">
            <i-table :loading="loading"  :columns="columns2" :data="listdataDex.results" width="100%" :class="barFixed?'tableflex':''">
              <template slot-scope="{  row }" slot="name">
                  <a class="defi_a" :href="'/' + $i18n.locale + '/exchange/' + row.code" target="_blank">
                    <div class="coinFirst">
                    <div>
                      <span><img v-lazy="$store.state.bixiaobao + row.logo_m" width="26" :alt="$store.state.locale == 'cn'?row.name:row.name_en"/></span>
                    </div>
                    <div class="namcon">
                      <div class="tokenNm">{{row.name||row.name_en}}</div>
                        <p style="font-size:12px">{{row.tags}}</p>
                    </div>
                  </div>
                  </a>
              </template>
            </i-table>
            <div class="pages">
                <a :href="'/?page='+Number(page-1)">l</a>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="Number(listdataDex.count)"
                  @current-change="handleCurrentChange"
                  :page-size="100"
                  :current-page="page"
                  >
                </el-pagination>
                <a :href="'/?page='+Number(page+1)">n</a>
            </div>
          </div>
        </div>
      </div>
  </div>
  </div>
</template>

<script>
import filters from '~/plugins/filters-plus'
// import myheader from "~/pages/_lang/commen/header";
export default {
  watchQuery:['page','currency'],
  head() {
    return {
      titleTemplate: this.$t("exchange.title"),
      meta: [
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("exchange.keywords")
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("exchange.description")
        },

      ]
    };
  },
  props: {
    // 父辈向子辈传参
  },
  name: "exchangelist",
  async asyncData({ $axios,$cookies,store,params,query }) {
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
    let pages = Number(query.page)||1;
    if(store.state.exchangelist!=''){
      return false;
    }
    const { data } = await $axios.get(
      "exchange/list/?currency="+currency+"&language=" +
        urdata + "&page="+pages
    ); //此时就可以用类似相对路径的写法
    store.commit('setExchangelist',data.data)

    return {
      listdata:data.data,
      page:pages,
      loading:false
    };
  },
  data() {
    return {
      language:this.$store.state.language,
      value: [],
      myFollow: ["全球交易所综合排行榜","DEX"],
      currency:this.$store.state.currency||'USD',
      listRate: [1, 7, 0.9, 100, 1000, 7],
      curRate: [], //钱数
      navIdx: 0,
      listdata: [], //币种数据
      listdataDex:[],
      mylistdata: [], //我的收藏
      loading: false,
      chartData: [],
      listCount:[],
      page:1,
      barFixed:false,
      listdataSeo:[],
      columns1: [
        {
          title: "#",
          key: "market_value_index",
          width:'50',
          align:'center'
        },
        {
          title: this.$t('headertop.交易平台'),
          key: "name",
          slot:"name"
        },
        {
          title: this.$t('message.24H成交额') +'('+this.$store.state.curRate+')',
          key: "volume24h",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('div',[
              h('span', filters.formatMoney(params.row.volume24h)),
              h('p', {
                style:'font-size:12px;color:#50546a;line-height:12px'
              },this.$store.state.currency)
            ])
          }
        },
        {
          title: this.$t('message.24H涨幅'),
          key: "increase24h",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('span',{
              attrs:{
                class:params.row.increase24h>=0?'up':'down'
              }
            },params.row.increase24h>=0?'+'+params.row.increase24h + '%':params.row.increase24h + '%')
          },
        },
        {
          title: this.$t('message.币种数量'),
          key: "token_count",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('div',[
              h('span', params.row.token_count)
            ])
          }
        },
        {
          title: this.$t('message.交易对'),
          key: "symbol_count",
          sortable: true,
          align:'right'
        },
        {
          title: this.$t('message.成立时间'),
          key: "online_time",
          sortable: true,
           align:'right',
        },
        // {
        //   title: this.$t('message.7天成交额走势'),
        //   key: "volume",
        //    align:'right',
        //   render: (h, params) => {
        //      return h('div',
        //       [
        //         h("canvas",{
        //           attrs:{
        //             id:'lineChart'+params.index,
        //             width:'50',
        //             height:"15",
        //           }
        //         })
        //       ])
        //   }
        // },
      ],
      columns2: [
        {
          title: "#",
          type: 'index',
          width:'50',
          align:'center'
        },
        {
          title: this.$t('headertop.交易平台'),
          key: "name",
          slot:"name"
        },
        {
          title: this.$t('message.24H成交额') +'('+this.$store.state.curRate+')',
          key: "volume24h",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('div',[
              h('span', filters.formatMoney(params.row.volume24h)),
              h('p', {
                style:'font-size:12px;color:#50546a;line-height:12px'
              },this.$store.state.currency)
            ])
          }
        },
        {
          title: this.$t('message.24H涨幅'),
          key: "increase24h",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('span',{
              attrs:{
                class:params.row.increase24h>=0?'up':'down'
              }
            },params.row.increase24h>=0?'+'+params.row.increase24h + '%':params.row.increase24h + '%')
          },
        },
        {
          title: this.$t('message.币种数量'),
          key: "token_count",
          sortable: true,
           align:'right',
          render: (h, params) => {
            return h('div',[
              h('span', params.row.token_count)
            ])
          }
        },
        {
          title: this.$t('message.交易对'),
          key: "symbol_count",
          sortable: true,
          align:'right'
        },
        {
          title: this.$t('message.成立时间'),
          key: "online_time",
          sortable: true,
           align:'right',
           render: (h, params) => {
            return h('div',[
              h('span', params.row.online_time||'--')
            ])
          }
        },
        // {
        //   title: this.$t('message.7天成交额走势'),
        //   key: "volume",
        //    align:'right',
        //   render: (h, params) => {
        //      return h('div',
        //       [
        //         h("canvas",{
        //           attrs:{
        //             id:'lineChart'+params.index,
        //             width:'50',
        //             height:"15",
        //           }
        //         })
        //       ])
        //   }
        // },
      ]
    };
  },
  created() {
    // 实例被创建之后执行代码
    // this.loadData(this.$store.state.currency,this.$store.state.language);
    // this.initCharts('0');

  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // myheader
  },
  methods: {
    // 方法
    handlemyFollow,
    formatter(row, column) {
      return row.address;
    },
    loadData(currency,language,page) {
      this.loading = true;
      // 18.163.114.150/token/list/?type=1&currency=CNY
      let timestamp = new Date().getTime();
    let newtime = (timestamp/10).toFixed(0)
      this.$axios
        .get("exchange/list/",{params:{
          language:language,
          currency:currency,
          page:page
        }})
        .then(({ data }) => {
          let getdata =  data.data.results
          this.listdata = data.data;
          this.listCount = data.data.count
          let score = []
          for(var i=0;i<getdata.length;i++){
            score.push(getdata[i].volume)
          }
          this.chartData = score
          // this.initCharts('0');
          this.loading = false;
        }).catch((err) => {
        this.loading = false;
        console.log(err);
      });
      
    },loadDataDex(currency,language,page) {
      this.loading = true;
      this.$axios
      .get("exchange/dex/list/",{params:{
        language:language,
        currency:currency,
        page:page,
        t:this.$store.state.newtime
      }})
      .then(({ data }) => {
        let getdata =  data.data.results
        this.listdataDex = data.data;
        this.listCount = data.data.count
        let score = []
        for(var i=0;i<getdata.length;i++){
          score.push(getdata[i].volume)
        }
        this.chartData = score
        // this.initCharts('1');
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
      
    },
    handleCurrentChange(val) {
      this.loading = true;
      // this.loadData(this.currency,this.language,val);
      this.$store.commit('setExchangelist','')
      this.page = val
      this.$router.push({ path:this.$route.path, query:{ page:val } })
    },
    // gotoDatail(row, event, column) {
    //     // this.$router.push({path: '/'+ this.$i18n.locale + "/exchange/" + row.code})
    //     let routeUrl = this.$router.resolve({
    //       path: '/'+ this.$i18n.locale + "/exchange/" + row.code
    //     });
    //     window.open(routeUrl.href, '_blank');
    // },
    getMag(msg){
      this.currency = msg
      this.$store.commit('setExchangelist','')
    },
    setLang(msg){
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
       this.$store.commit('setExchangelist','')
        
      this.language = getlang
      // this.loadData(this.currency,getlang);
      
    },
    handleScroll () {
      var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > 270) {
        this.barFixed = true
      } else {
        this.barFixed = false
      }
    },
    initCharts(type){
      if(process.client){
        let self = this;
        let  typeData1 = self.listdata.results;
        let  typeData2 = self.listdataDex.results;

        if(type=='0'){
          typeData1.forEach((value,index)=>{
          this.$nextTick(function(){
            this.paintChart(index,value)

          })
        })
        }else if(type=='1'){
          typeData2.forEach((value,index)=>{
            this.$nextTick(function(){
            this.paintChart(index,value)

          })
        })
        }
      }
    },
    paintChart(i,params){
    　　let lineChart = this.$echarts.init(document.getElementById("lineChart"+i),'',{devicePixelRatio:2});
        let seriesData = []
        let xAxisData  = []
        let colorSty = params.increase24h>=0?'#34a25f':'#d53c3c'
    　　let sData = params.volume.rows
        for(let i=0;i<sData.length;i++){
          seriesData.push(sData[i].指数)
          xAxisData.push(sData[i].日期)
        }
        let option = {
    　　　　color: ['#3398DB'],
    　　　　tooltip : {
    　　　　　　show:false,
              },
              grid: {
                left: '0%',
                right: '1%',
                bottom: '1%',
                top:'0',
              },
              xAxis : [
                {
                  type : 'category',
                  data : xAxisData,
                  show:false,
                }
              ],
              yAxis : [
                {
                  type : 'value',
                  show:false,
                }
              ],
              series : [
                {
                  type:'line',
                  data:seriesData,
                  showSymbol: false,
                  lineStyle: {
                     normal: {
                      width: 0.6,
                      color:colorSty
                     },
                  }
                }
              ]
    　　}
    　　lineChart.setOption(option)
    }
  },
  mounted() {
    // 页面进入时加载内容
    window.addEventListener('scroll', this.handleScroll);
    this.loadDataDex(this.$store.state.currency,this.$store.state.language)
    
  },
  updated(){
      let self = this
      // setTimeout(function(){
      //   self.listdata.results.forEach((value,index)=>{
      //       self.paintChart(index,value)
      //   })
      // },300)
  },
  watch: {
    // 监测变化
  },
  filters:{
    //数据过滤
  }
};
function handlemyFollow(idx) {
  this.navIdx = idx;
   if(idx=='0'){
    //  this.initCharts('0');
    // this.loadData(this.$store.state.currency,this.$store.state.language)
  }
  if(idx=='1'){
    if(this.listdataDex.results){
      //  this.initCharts('1');
       return false
    }
    this.loadDataDex(this.$store.state.currency,this.$store.state.language)
  }
  
}
</script>
