<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="platform homelv2 margin">
      <div class="container">
        <!-- 平台详情头部 -->
        <div class="platform_header flex">
          <!-- 平台详情头部左侧 -->
          <div class="platform_header_left">
            <div class="header_top">
              <div class="excheng_name">
                <img
                  v-if="exchangedata.logo_m"
                  :src="exchangedata.logo_m"
                  :alt="exchangedata.name"
                  class="cover"
                />
                <img v-else src="@/assets/cash_icon.png" class="cover" />

                <div class="itemCenter">
                  <h1>{{ seoData.name || "--" }}</h1>
                  <div class="rank">
                    {{ $t("message.综合排名") }} NO.{{
                      exchangedata.market_value_index || "--"
                    }}
                  </div>
                </div>
              </div>
              <div class="header_cell">
                <div class="tit">{{ $t("message.24H成交额") }}</div>
                <div class="val">
                  {{ $store.state.curRate }}
                  <span class="textBlack">{{
                    exchangedata.volume24h | formatMoney | reverseStr
                  }}</span>
                </div>
              </div>
              <div class="header_cell">
                <div class="tit">{{ $t("message.24H涨幅") }}</div>
                <div class="val">
                  <span v-if="exchangedata.increase24h > 0" class="up"
                    >+{{ exchangedata.increase24h || "--" }}%</span
                  >
                  <span v-else class="down"
                    >{{ exchangedata.increase24h || "--" }}%</span
                  >
                </div>
              </div>
            </div>
            <div class="header_min">
              <div class="header_cell">
                <div>
                  <span class="tit">{{ $t("message.KYC认证") }}</span>
                  <span class="val">{{ $t("message.是") }}</span>
                </div>
                <div>
                  <span class="tit">{{ $t("message.成立时间") }}</span>
                  <span class="val">{{
                    exchangedata.online_time || "--"
                  }}</span>
                </div>
                <div>
                  <span class="tit">{{ $t("message.国家") }}</span>
                  <span class="val">{{ seoData.country || "--" }}</span>
                </div>
                <div class="link">
                  <span class="tit">{{ $t("message.官网地址") }}</span>
                  <span
                    class="val"
                    v-for="(item, key, index) in seoData.websit_url"
                    :key="index"
                  >
                    <a :href="item" target="_blank" rel="nofollow">{{
                      item
                    }}</a>
                  </span>
                </div>
              </div>
              <div class="header_cell">
                <div>
                  <span class="tit">{{ $t("message.交易对") }}</span>
                  <span class="val"
                    >{{ exchangedata.symbol_count || "--"
                    }}{{ $t("message.个") }}</span
                  >
                </div>
                <div>
                  <span class="tit">{{ $t("message.币种数量") }}</span>
                  <span class="val"
                    >{{ exchangedata.token_count || "--"
                    }}{{ $t("message.个") }}</span
                  >
                </div>
                <div>
                  <span class="tit">{{ $t("message.交易支持") }}</span>
                  <span class="val">
                    <span
                      class="tradeType"
                      v-for="(item, index) in seoData.symbol_support"
                      :key="index"
                      >{{ $t("message")[item] }}</span
                    >
                  </span>
                </div>
              </div>
              <div class="header_cell">
                <div>
                  <span class="tit">{{ $t("message.平台币") }}</span>
                  <span class="val">
                    <nuxt-link
                      v-if="platform_token.code"
                      :to="{
                        path:
                          '/' +
                          this.$i18n.locale +
                          '/coinlist/' +
                          platform_token.code,
                      }"
                      >{{ platform_token.token || "--" }}</nuxt-link
                    >
                    <i v-else>{{ $t("message.无") }}</i>
                  </span>
                </div>
                <div>
                  <span class="tit">{{ $t("message.社交账号") }}</span>

                  <span class="val">
                    <!-- <a :href="tecent.weibo_url" target="_blank">微博</a> -->
                    <a
                      :href="tecent.facebook_url"
                      rel="nofollow"
                      target="_blank"
                      >Facebook</a
                    >
                    <a :href="tecent.twitter_url" rel="nofollow" target="_blank"
                      >Twitter</a
                    >
                  </span>
                </div>
              </div>
            </div>
            <div class="header_bot">
              <div class="exchange_text">
                <p>{{ seoData.summary || "--" }}</p>
                <el-button
                  v-if="seoData.summary"
                  class="show_fullText"
                  type="text"
                  @click="openDatail"
                  >{{ $t("message.详细内容") }}</el-button
                >
              </div>
            </div>
          </div>
          <!-- 平台详情头部右侧 -->
          <div class="platform_header_right">
            <div id="radar" ref="radar" style="width: 100%; height: 411px"></div>
          </div>
        </div>
        <!-- 平台详情内容 -->
        <div class="platform_page flex">
          <!-- 平台详情内容左侧 -->
          <div class="platform_page_left">
            <h2>{{ $t("message.行情") }}</h2>
            <!-- 成交额走势 -->
            <div class="quotation">
              <div class="quotation_header">
                <span
                  >{{ exchangedata.name || "--"
                  }}{{ $t("message.成交额走势") }}</span
                >
                <div class="selectDate">
                  <ul>
                    <li
                      v-for="(item, index) in selectDate"
                      :key="index"
                      @click="changeselectDate(index)"
                      :class="selectDateIndex == index ? 'selectactive' : ''"
                    >
                      {{ item.name }}
                    </li>
                  </ul>
                </div>
              </div>
              <div
                id="quotation_Kline"
                ref="quotation_Kline"
                style="width: 100%; height: 400px"
              ></div>
            </div>
            <!-- 平台币对商品信息 -->
            <div class="coin_goods">
              <ul class="flex coin_goods_nav">
                <li class="choice">{{ $t("message.现货") }}</li>
              </ul>
              <div class="now_coin">
                <ul class="coin_name_nav itemCenter">
                  <li
                    v-for="(item, index) in tokens"
                    :key="index"
                    @click="handleCoinGoodsChild(index, item)"
                    :class="index == coinGoodsChildIdx ? 'active' : ''"
                  >
                    {{ item }}
                  </li>
                </ul>
                <div class="now_coin_all">
                  <i-table
                    :loading="loading"
                    :columns="columns1"
                    :data="symbolist.results"
                  ></i-table>
                  <!-- <el-table
                    v-loading="loading"
                    :data="symbolist.results"
                    style="width: 100%"
                    :default-sort="{prop: 'index', order: 'ascending'}"
                  >
                    <el-table-column type="index" label="#" sortable></el-table-column>
                    <el-table-column :label="$t('message.币种')">
                      <template slot-scope="scope">
                        <div class="Coinnames itemCenter">
                          <img v-if="scope.row.logo_s" :src="scope.row.logo_s" />
                          <img v-else src="@/assets/cash_icon.png" />
                          <div>
                            <span>
                              <a
                                :href="'/'+ $store.state.locale+'/coinlist/'+scope.row.code"
                                target="_blank"
                              >{{ scope.row.token}}</a>
                            </span>
                          </div>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column :label="$t('message.交易对')">
                      <template slot-scope="scope">
                        <div>
                          <span>
                            <a :href="scope.row.exchangeurl" target="_blank">{{ scope.row.symbol}}</a>
                          </span>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="price_now"
                      :label="$t('message.最新价')+'('+$store.state.curRate+')'"
                      sortable
                    >
                      <template slot-scope="scope">{{scope.row.price_now}}</template>
                    </el-table-column>

                    <el-table-column prop="amount24h" :label="$t('message.24H成交量')" sortable></el-table-column>
                    <el-table-column
                      prop="volume24h"
                      :label="$t('message.24H额')+'('+$store.state.curRate+')'"
                      sortable
                    >
                      <template slot-scope="scope">{{scope.row.volume24h|formatMoney}}</template>
                    </el-table-column>
                    <el-table-column :label="$t('message.占比')" sortable align="center">
                      <template slot-scope="scope">{{scope.row.exchangepercent}}%</template>
                    </el-table-column>
                    <el-table-column prop="updated" :label="$t('message.更新时间')">
                      <template slot-scope="scope">{{scope.row.updated|formatDate}}</template>
                    </el-table-column>
                  </el-table> -->
                  <div class="pages">
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="symbolist.count"
                      @current-change="handleCurrentChange"
                      :page-size="100"
                      :hide-on-single-page="true"
                      :current-page="page"
                    ></el-pagination>
                  </div>
                </div>
              </div>
            </div>
            <!-- 平台图例显示 -->
            <div class="platform_legend flex">
              <div class="platform_legend_left">
                <div class="title">
                  <span>{{ $t("message.币种成交额占比") }}</span>
                </div>
                <div
                  id="coin_pie_chart"
                  style="width: 100%; height: 390px"
                ></div>
              </div>
              <div class="platform_legend_right">
                <div class="title title_new">
                  <span>{{ $t("message.平台市值排名走势") }}</span>
                </div>
                <div
                  id="coin_line_chart"
                  ref="coin_line_chart"
                  style="width: 100%; height: 390px"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import filters from "~/plugins/filters-plus";
// import myheader from "~/pages/_lang/commen/header";
import echarts from "echarts"; // 引入echarts
let myChart,myChart1,myChart2,myChart3;
export default {
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      title: [],
      keywords: [],
      description: [],
      seoData: [],
      symbolType: [],
      token: "", // 空为全部
      symbolTypecur: "spot", //当前类型
      currency: this.$store.state.currency || "USD", //显示金额的币种
      tokens: [],
      page: 1,
      coinGoodsIdx: 0,
      coinGoodsChildIdx: 0,
      value: "",
      exchangedata: [],
      platform_token: [],
      tecent: [],
      websitdata: [],
      symbolist: [],
      loading: true,
      language: this.$store.state.language,
      selectDateIndex: 3,
      selectDate: [
        {
          name: "7DAY",
          value: [],
        },
        {
          name: "1MONTH",
          value: [],
        },
        {
          name: "3MONTH",
          value: [],
        },
        {
          name: "1YEAR",
          value: [],
        },
      ],
      chartdataVol: [],
      scorevalue: [],
      max: [],
      topData: [],
      topNum: [],
      dealvalue: [],
      dealname: [],
      columns1: [
        {
          title: "#",
          type: "index",
          width: "50",
          align: "center",
        },
        {
          title: this.$t("message.币种"),
          key: "name",
          width: "160",
          render: (h, params) => {
            return h(
              "div",
              {
                style: "display:flex;justify-content:left;align-items:center",
              },
              [
                h("div", [
                  h("img", {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    attrs: {
                      src: this.$store.state.bixiaobao + params.row.logo_s,
                    },
                    style: "width: 26px;height:26px;margin-right:5px",
                  }),
                ]),
                h("div", [
                  h("h3"),
                  [
                    h(
                      "a",
                      {
                        attrs: {
                          href:
                            "/" +
                            this.$store.state.locale +
                            "/coinlist/" +
                            params.row.code,
                          target: "_blank",
                        },
                      },
                      this.$store.state.locale == "cn"
                        ? params.row.token
                        : params.row.code
                    ),
                  ],
                ]),
              ]
            );
          },
        },
        {
          title: this.$t("message.交易对"),
          key: "symbol",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.exchangeurl,
                  target: "_blank",
                  rel: "nofollow",
                },
              },
              params.row.symbol
            );
          },
        },
        {
          title:
            this.$t("message.最新价") + "(" + this.$store.state.curRate + ")",
          key: "price_now",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("span", filters.formatePrice(params.row.price_now));
          },
        },
        {
          title: this.$t("message.24H成交量"),
          key: "amount24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h("span", filters.formatMoney(params.row.amount24h)),
              // h('p', {
              //   style:'font-size:12px;color:#50546a;line-height:12px'
              // },params.row.token)
            ]);
          },
        },
        {
          title:
            this.$t("message.24H额") + "(" + this.$store.state.curRate + ")",
          key: "volume24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h("span", filters.formatMoney(params.row.volume24h)),
              h(
                "p",
                {
                  style: "font-size:12px;color:#50546a;line-height:12px",
                },
                this.$store.state.currency
              ),
            ]);
          },
        },
        {
          title: this.$t("message.占比"),
          key: "tokenpercent",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("span", params.row.tokenpercent + "%");
          },
        },
      ],
    };
  },
  head() {
    return {
      title: `${this.title}`,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.keywords,
        }
      ],
    };
  },
  async asyncData({ $axios, $cookies, params, query,store ,error}) {
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
    let pages = query.page || 1;
    try{
       let [seoDataR, listData] = await Promise.all([
      $axios.get(
        "/exchange/seo/" +
          params.id +
          "/?language=" +
          urdata 
      ).catch(err => {
          console.log(err);
        }),
      $axios.get(
        "/exchange/" +
          params.id +
          "/token/list/spot/?language=" +
          urdata +
          "&currency=" +
          currency +
          "&page=" +
          pages
      ).catch(err => {
          console.log(err);
        }),
    ]);
    return {
      title: seoDataR.data.data.title || params.id,
      keywords: seoDataR.data.data.keyword || params.id,
      description: seoDataR.data.data.description || params.id,
      page: pages,
      seoData: seoDataR.data.data,
      symbolist: listData.data.data,
    };
    }catch(err){
      error({ statusCode: 404, message: '页面未找到' })
    }
  },
  created() {
    // 实例被创建之后执行代码
    let today = this.$moment().format("YYYY-MM-DD");
    let eweek = this.$moment().subtract(1, "weeks").format("YYYY-MM-DD");
    let emonth = this.$moment().subtract(1, "months").format("YYYY-MM-DD");
    let threemonth = this.$moment().subtract(3, "months").format("YYYY-MM-DD");
    let eyear = this.$moment().subtract(1, "years").format("YYYY-MM-DD");
    this.selectDate[0].value.push(eweek, today);
    this.selectDate[1].value.push(emonth, today);
    this.selectDate[2].value.push(threemonth, today);
    this.selectDate[3].value.push(eyear, today);
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // myheader,
  },
  methods: {
    // 方法
    handleCoinGoodsNav,
    handleCoinGoodsChild,
    formatter,
    changeselectDate(id) {
      this.selectDateIndex = id;
      this.$axios
        .get("exchange/trade/list/" + this.$route.params.id + "/", {
          params: {
            start: this.selectDate[id].value[0],
            end: this.selectDate[id].value[1],
          },
        })
        .then(({ data }) => {
          let datas = data.data.results;
          let datalist = [];
          for (let i = 0; i < datas.length; i++) {
            datalist.push([datas[i].date, datas[i].value]);
          }
          this.chartdataVol = datalist;
          this.loading = false;
          this.chartLarge();
        });
    },
    
    async loadData(code, currency, language) {
      // 18.163.114.150/token/list/?type=1&currency=CNY
      await this.$axios
        .get("exchange/info/" + code + "/", {
          params: {
            currency: currency,
            language: language,
          },
        })
        .then(({ data }) => {
          this.symbolType = data.data.symbol_type;
          // if (data.status == "0") {
          //   this.$router.push('/exchange')
          // }
          this.exchangedata = data.data;
          this.platform_token = data.data.platform_token;
          this.tecent = data.data.social;


          this.websitdata = data.data.websit_url;

          let gettokens = data.data.tokens;
          if (this.$store.state.locale != "cn") {
            gettokens.splice(0, 1, "all");
          }
          this.tokens = gettokens;

          this.max = data.data.score.max;
          this.scorevalue = data.data.score.data;

          let topDate = [];
          let topNum = [];
          let topdata = data.data.top;
          for (let i = 0; i < topdata.length; i++) {
            topDate.push(topdata[i].date);
            topNum.push(topdata[i].market_value_index);
            topDate.reverse();
            topDate.sort();
            topNum.reverse();
            topNum.sort();
          }
          this.topDate = topDate;
          this.topNum = topNum;
          let token_deal = data.data.symbol;
          let dealname = [];
          let dealvalue = [];

          for (let key in token_deal) {
            dealname.push(key);
            dealvalue.push({
              name: key,
              value: token_deal[key],
            }); /*属性值*/
          }
          this.dealvalue = dealvalue;
          this.dealname = dealname;
          this.chartHot();
          this.chartBing();
          this.chartline();
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    symboData(params, type, token, language, currency, page) {
      //现货，期货数据
      this.$axios
        .get("exchange/" + params + "/token/list/" + type + "/", {
          params: {
            token: token,
            currency: currency,
            language: language,
            page: page,
          },
        })
        .then(({ data }) => {
          this.symbolist = data.data;

          this.loading = false;
        });
    },
    handleCurrentChange(val) {
      //分页
      this.loading = true;
      this.page = val;
      this.symboData(
        this.$route.params.id,
        this.symbolTypecur,
        this.token,
        this.language,
        this.currency,
        val
      );
      this.$router.push({ path: this.$route.path, query: { page: val } });
    },
    gotoDatail(row, event, column) {
      if (row.token) {
        this.$router.push({
          path: "/" + this.$i18n.locale + "/coinlist/" + row.token,
        });
      } else {
        console.log("no token");
      }
    },
    openDatail() {
      const h = this.$createElement;
      this.$msgbox(
        h(
          "p",
          { style: "max-height:500px;overflow:scroll" },
          this.exchangedata.summary
        ),
        this.exchangedata.token ||
          this.exchangedata.name ||
          "" + "/" + this.exchangedata.code,
        {
          distinguishCancelAndClose: true,
          closeOnPressEscape: true,
          showConfirmButton: false,
        }
      );
    },
    getMag(msg) {
      this.loading = true;
      this.currency = msg;
      this.loadData(this.$route.params.id, msg, this.language);
      this.symboData(
        this.$route.params.id,
        this.symbolTypecur,
        this.token,
        this.language,
        msg
      );
    },
    setLang: function (language) {
      this.loading = true;
      let getlang = [];
      if (language == "cn") {
        getlang = "zh_CN";
      } else {
        getlang = "ko_KR";
      }
      this.loadData(this.$route.params.id, this.currency, getlang);
      this.symboData(
        this.$route.params.id,
        this.symbolTypecur,
        this.token,
        getlang,
        this.currency
      );
      // this.$router.go(0)
    },
    chartHot() {
      myChart = echarts.init(this.$refs.radar);
      if(this.exchangedata.name == ''|| undefined) return false
      // 绘制图表
      myChart.setOption({
        //热力图
        title: { text: "" },
        tooltip: {},
        legend: {
          data: [this.exchangedata.name, this.$t("message.行业平均值")],
          y: "350",
          x: "center",
        },
        radar: {
          nameGap: 5, // 图中工艺等字距离图的距离
          center: ["50%", "45%"], // 图的位置
          radius: 90, //大小
          name: {
            textStyle: {
              color: "#50546A",
            },
          },
          indicator: [
            { name: this.$t("message.交易活跃"), max: this.max[0] },
            { name: this.$t("message.信誉度"), max: this.max[1] },
            { name: this.$t("message.用户热度"), max: this.max[2] },
            { name: this.$t("message.资产实力"), max: this.max[3] },
            { name: this.$t("message.基础实力"), max: this.max[4] },
            { name: this.$t("message.安全性"), max: this.max[5] },
          ],
        },
        series: [
          {
            name: "chars",
            type: "radar",
            symbol: "none",
            data: [
              {
                value: this.scorevalue[0],
                name: this.exchangedata.name,
                lineStyle: {
                  normal: {
                    color: "rgba(3,134,217)",
                    width: "1",
                  },
                },
                areaStyle: {
                  normal: {
                    color: "rgba(3,134,217,0.2)",
                  },
                },
                itemStyle: {
                  normal: {
                    color: "rgba(3,134,217,0.9)",
                  },
                },
              },
              {
                value: this.scorevalue[1],
                name: this.$t("message.行业平均值"),
                lineStyle: {
                  normal: {
                    color: "rgba(233,85,21,0.7",
                    width: "1",
                  },
                },
                areaStyle: {
                  normal: {
                    color: "rgba(233,85,21,0.2)",
                  },
                },
                itemStyle: {
                  normal: {
                    color: "rgba(233,85,21,0.7)",
                  },
                },
              },
            ],
          },
        ],
      });
    },
    chartLarge() {
      // 基于准备好的dom，初始化echarts实例
      myChart1 = echarts.init(this.$refs.quotation_Kline);
      if(this.chartdataVol == ''|| undefined) return false;
      var data0 = splitData(this.chartdataVol);
      // macd计算
      function splitData(rawData) {
        var categoryData = [];
        var volnumb = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(rawData[i][0]);
          volnumb.push(rawData[i][1]); //美元价格
        }
        return {
          categoryData: categoryData.reverse(),
          volnumb: volnumb.reverse(),
        };
      }
      myChart1.setOption({
        //成交额
        backgroundColor: "#fff",
        legend: {
          show: false,
          data: this.$t("message.成交额"),
          type: "scroll",

          icon: "roundRect",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            animation: false,
            type: "cross",
            lineStyle: {
              color: "#333",
              width: 1,
              opacity: 1,
            },
            label: {
              textStyle: {
                color: "#fff",
              },
            },
          },
        },
        xAxis: {
          type: "category",
          data: data0.categoryData,
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
          splitNumber: 20,
          axisLabel: {
            color: "#999",
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },
          axisLine: {
            //刻度线
            lineStyle: {
              width: "0",
            },
          },
        },
        yAxis: {
          boundaryGap: false,
          scale: true,
          type: "value",
          splitLine: {
            //网格线
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
          axisLabel: {
            align: "right",
            padding: [0, 20, 0, 0],
            color: "#999",
            verticalAlign: "bottom",
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },

          axisLine: {
            //刻度线
            color: "#999",
            lineStyle: {
              align: "right",
              color: "#ccc",
              width: "0",
            },
          },
          position: "right",
        },
        grid: {
          top: 0,
          bottom: 80,
          left: "2%",
          right: "2%",
          borderWidth: 1,
          borderColor: "#ccc",
        },
        dataZoom: [
          {
            start: 0,
            end: 100,
            height: 50,
            bottom: 0,
            textStyle: {
              color: "#8392A5",
            },
          },
          {
            type: "inside",
            start: 80,
            end: 100,
          },
        ],
        series: [
          {
            name: this.$t("message.成交额"),
            type: "line",
            data: data0.volnumb,
            // smooth: true,
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#5480D8",
            },
            areaStyle: {
              color: ["rgba(237,242,251,0.7)"],
            },
          },
        ],
      });
    },
    chartBing() {
      myChart2 = echarts.init(document.getElementById("coin_pie_chart"));
      if (this.dealname==''|| undefined) return false;
      myChart2.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c} ({d}%)",
        },
        legend: {
          orient: "horizontal",
          left: "15%",
          data: this.dealname,
          bottom: "0",
          width: "80%",
        },
        series: [
          {
            name: this.$t("message.成交额占比"),
            type: "pie",
            radius: ["20%", "60%"],
            top: "-40",
            label: {
              show: false,
              position: "center",
            },
            labelLine: {
              show: false,
            },
            data: this.dealvalue,
            color: [
              "#DE8887",
              "#EDB5B4",
              "#F3DEDE",
              "#3BB97B",
              "#7ED0A7",
              "#B5E5CD",
              "#8C64EF",
              "#9E95F1",
              "#C4C1E8",
              "#518BF1",
              "#7AC5F8",
              "#BFE4FF",
              "#EEB763",
            ],
          },
        ],
      });
    },
    chartline() {
      if(this.topDate==''|| undefined) return false;
      myChart3 = echarts.init(this.$refs.coin_line_chart);
      myChart3.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        xAxis: {
          type: "category",
          data: this.topDate,
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
        },
        yAxis: {
          inverse: true,
          type: "value",
          position: "right",
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
          minInterval: 1,
          boundaryGap: [0, 0.1],
          axisLabel: {
            align: "right",
            padding: [0, 15, 0, 0],
            color: "#999",
            verticalAlign: "bottom",
          },
        },
        series: [
          {
            data: this.topNum,
            type: "line",
            showSymbol: false,
            color: "#5480D8",
            lineStyle: {
              width: 1,
              color: "#5480D8",
            },
          },
        ],
      });
    },
  },
  mounted() {
    // 页面进入时加载内容
    if (process.client) {
      this.loadData(this.$route.params.id, this.currency, this.language);
      this.changeselectDate(3);
    }
    
  },
  watch: {
    // 监测变化
  },
  filters: {
    //数据过滤
  },
};
function handleCoinGoodsNav(idx, value) {
  this.coinGoodsIdx = idx;
  this.symbolTypecur = value;
  this.loading = true;
  this.symboData(this.$route.params.id, value, this.token, this.currency, 1);
}
function handleCoinGoodsChild(idx, value) {
  this.coinGoodsChildIdx = idx;
  if (value == "全部" || value == "all") {
    value = "";
    this.token = "";
  }
  this.token = value;
  this.loading = true;
  this.symboData(
    this.$route.params.id,
    this.symbolTypecur,
    value,
    this.token,
    this.$store.state.currency,
    1
  );
}
function formatter(row, column) {
  return row.address;
}
</script>
<style scoped lang='scss'>
.platform {
  width: 100%;
  min-height: 800px;
  .container {
      min-width:1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
    margin: 0 auto;
    /* 平台详情头部 */
    .platform_header {
      height: 411px;
      background: #ffffff;
    }
    /* 平台详情头部左侧 */
    .platform_header_left {
      min-height: 411px;
      background: #ffffff;
      padding: 30px 0 0;
      position: relative;
      .header_top {
        overflow: hidden;
        border-bottom: 1px solid #d8d8d8;
        padding-bottom: 18px;
        .excheng_name {
          float: left;
          display: flex;
          flex-flow: row nowrap;
          align-items: center;
          margin-right: 53px;
          img {
            width: 70px;
            margin-right: 17px;
          }
          h1 {
            font-size: 24px;
            font-weight: 500;
            color: #242735;
            margin-right: 15px;
            text-transform: capitalize;
          }
          .rank {
            width: 114px;
            line-height: 26px;
            background: #fff1df;
            border-radius: 4px;
            text-align: center;
            color: #e18c0c;
          }
        }
        .header_cell {
          float: left;
          margin-right: 55px;
          min-width: 120px;
          &:last-child {
            margin-right: 0;
          }
          .tit {
            color: #50546a;
            line-height: 20px;
            margin-top: 16px;
          }
          .val {
            margin-top: 4px;
            white-space: nowrap;
            color: #50546a;
            span {
              color: #242735;
              font-size: 22px;
            }
            .textRed {
              color: #b40300;
            }
          }
        }
      }
      .header_min {
        display: flex;
        flex-flow: row nowrap;
        margin-top: 20px;
        margin-bottom: 40px;
        .header_cell {
          flex: 1;
          & > div {
            line-height: 36px;
            white-space: nowrap;
          }
          .tit {
            color: #50546a;
            display: inline-block;
            margin-right: 25px;
            vertical-align: middle;
            min-width: 50px;
          }
          .val {
            color: #242735;
            display: inline-block;
            max-width: 225px;
            white-space: nowrap;
            vertical-align: middle;
            overflow: hidden;
            text-overflow: ellipsis;
            height: 36px;
            a {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              display: inline-block;
              max-width: 170px;
              color: #0386d9;
            }
            img {
              vertical-align: middle;
            }
          }
          .link {
            position: absolute;
            .val {
              max-width: 500px;
              a {
                margin-right: 35px;
              }
            }
          }
        }
      }
      .header_bot {
        .exchange_text {
          width: 100%;
          font-size: 14px;
          line-height: 26px;
          color: #0b1721;
          max-height: 100px;
          p {
            position: relative;
            line-height: 26px;
            max-height: 78px;
            overflow: hidden;
            width: 100%;
            word-break: break-all;
            color: #0b1721;
            display: -webkit-box;
            -webkit-box-orient: vertical;
          }
          a {
            font-size: 14px;
            color: #0b69ef;
            float: right;
            text-decoration: none;
          }
        }
      }
      .head_follow_btn {
        position: absolute;
        right: 50px;
        top: 50px;
        width: 91px;
        height: 55px;
        .follow {
          height: 30px;
          background: #5480d8;
          line-height: 30px;
          border-radius: 4px;
          color: #fff;
          margin-bottom: 5px;
        }
        div {
          text-align: center;
        }
      }
    }
    /* 平台详情头部右侧 */
    .platform_header_right {
      width: 300px;
      min-height: 411px;
      background: #fafbfd;
    }
    /* 平台详情内容 */
    .platform_page {
      
       min-width:1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
      margin-top: 20px;
    }
    /* 平台详情内容左侧 */
    .platform_page_left {
      width: 100%;
      min-height: 800px;
      background: #ffffff;
      padding: 38px 0 20px;
      padding-bottom: 80px;
      h2 {
        font-size: 20px;
        color: #000000;
        margin-bottom: 25px;
        font-weight: 500;
      }
      .Coinnames {
        padding-left: 26px;
        position: relative;
        img {
          position: absolute;
          left: 0;
          height: 20px;
          max-width: 30px;
        }
        p {
          color: #50546a;
          font-size: 13px;
        }
        a {
          color: #242735;
          text-decoration: none;
          &:hover {
            text-decoration: underline;
          }
        }
      }
      /* 成交额走势 */
      .quotation {
        width: 100%;
        height: 430px;
        .quotation_header {
          height: 32px;
          border-bottom: 1px solid #e9e9e9;
          font-size: 16px;
          color: #f86b1d;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          span {
            display: inline-block;
            position: relative;
            height: 31px;
            &::after {
              content: "";
              position: absolute;
              height: 4px;
              background: #f86b1d;
              bottom: 0;
              left: 0;
              width: 100%;
            }
          }
          .selectDate {
            ul {
              li {
                display: inline-block;
                cursor: pointer;
                font-size: 12px;
                color: #5480d8;
                margin-left: 10px;
                &:hover {
                  color: #f86b1d;
                }
                &.selectactive {
                  color: #f86b1d;
                }
              }
            }
          }
        }
      }
      /* 平台币对商品信息 */
      .coin_goods {
        margin-top: 70px;
        position: relative;
        .coin_goods_nav {
          height: 37px;
          border-bottom: 1px solid #e9e9e9;
          line-height: 37px;
          li {
            color: #6e6e6e;
            font-size: 16px;
            margin: 0 30px;
            // cursor: pointer;
            &.choice {
              position: relative;
              color: #f86b1d;
              font-weight: 500;
              &::after {
                content: "";
                position: absolute;
                width: 64px;
                background: #f86b1d;
                height: 4px;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
        .coin_choose {
          position: absolute;
          right: 0;
          top: -4px;
        }
        .now_coin {
          .coin_name_nav {
            padding: 26px 0 24px 5px;
            color: #6e6e6e;
            li {
              margin: 0 15px;
              cursor: pointer;
              text-transform: uppercase;
              &.active {
                color: #5480d8;
              }
            }
          }
        }
        .future_coin {
          .future_coin_all {
            padding: 26px 0 24px 20px;
            color: #6e6e6e;
          }
        }
      }
      /* 平台图例显示 */
      .platform_legend {
        margin-top: 60px;
        .title {
          height: 46px;
          width: 100%;
          border-bottom: 1px solid #e9e9e9;
          color: #f86b1d;
          font-size: 16px;
          line-height: 46px;
          font-weight: 500;
          span {
            display: inline-block;
            position: relative;
            &::after {
              content: "";
              position: absolute;
              height: 4px;
              background: #f86b1d;
              bottom: 0;
              left: 0;
              width: 100%;
            }
          }
        }
        .title_new {
          &::after {
            width: 140px;
            left: 16%;
          }
        }
        .platform_legend_left {
          width: 50%;
          height: 435px;
          margin-right: 50px;
        }
        .platform_legend_right {
          width: 50%;
          height: 435px;
        }
      }
    }
    /* 平台详情内容右侧 */
    .platform_page_right {
      width: 300px;
      min-height: 800px;
      .banner {
        width: 100%;
        height: 144px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .platform_coin {
        width: 100%;
        height: 140px;
        margin-bottom: 20px;
      }
      .platform_notice {
        width: 100%;
        height: 345px;
        margin-bottom: 20px;
        padding: 24px;
        overflow: hidden;
        h2 {
          font-size: 16px;
          color: #000000;
          margin-bottom: 12px;
        }
        .content {
          li {
            a {
              text-decoration: none;
            }
          }
        }
        .list {
          width: 100%;
          height: 27px;
          display: flex;
          align-items: center;
          span {
            line-height: 20px;
            color: #242735;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .platform_message {
        width: 100%;
        height: 477px;
        padding: 24px;
        overflow: hidden;
        h2 {
          font-size: 16px;
          color: #000000;
          margin-bottom: 12px;
        }
        .list {
          width: 100%;
          height: 40px;
          line-height: 40px;
          border-bottom: 1px solid #edf1f6;
          font-size: 14px;
          color: #0b1721;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          a {
            text-decoration: none;
          }
          span {
            color: #242735;
          }
        }
      }
    }
  }
}
.el-table ::v-deep th {
  background: #f6f7fa;
  padding: 7px 0;
}
.el-table ::v-deep .el-table__row {
  cursor: auto;
}
</style>
<style lang="scss">
.now_coin_all .ivu-table td {
  cursor: default;
}
.el-message-box {
  width: 700px;
}
.coin_choose {
  .el-input__inner {
    width: 99px;
    height: 30px;
    padding: 0;
    padding-left: 14px;
  }
  .el-input__icon {
    line-height: 1;
  }
}
.now_coin_all {
  tbody {
    td:first-child {
      .cell {
        text-align: center;
        min-width: 26px;
        min-height: 26px;
        display: inline-block;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        text-overflow: clip;
        padding: 0;
        margin-left: 15px;
      }
    }
  }
  thead {
    th:first-child {
      padding-left: 15px;
    }
  }
}
</style>