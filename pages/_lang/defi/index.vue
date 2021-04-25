<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="home homelv2 margin">
      <div class="container flex">
          <!-- <h3>{{$t('nav.Defi')}}</h3> -->
          <div class="quotation">
            <div class="quotation_nav itemCenter">
              <ul class="itemCenter">
                <li
                  v-for="(item,index) in myFollow"
                  :key="index"
                  @click="handlemyFollow(index)"
                  :class="index == navIdx ? 'choice':''"
                >{{$t('message')[item]}}</li>
              </ul>
            </div>
            <!-- 总锁仓量 -->
            <div v-show="navIdx == 0" class="now_coin_all">
              <!-- 总锁仓量头部 -->
              <div class="lock_up">
                <div
                  class="lock_up_top"
                >{{$t('message.总锁仓量（TVL）是衡量一个DeFi项目使用规模时最重要的指标,通过计算所有锁定在该项目智能合约中的ETH及各类ERC-20代币的总价值（美元）之和而得到')}}</div>
                <div class="itemBetween">
                  <ol class="lock_up_title_right flex">
                    <li>
                      <p>{{$t('message.总锁仓量')}}</p>
                      <span>{{debankTopData.today_total_value_str}}</span>
                    </li>
                    <li>
                      <p>{{$t('message.重复率')}}</p>
                      <span>{{debankTopData.today_repeat_rate_str}}</span>
                    </li>
                    <li>
                      <p>{{$t('message.真实锁仓量')}}</p>
                      <span>{{debankTopData.today_real_value_str}}</span>
                    </li>
                    <li>
                      <p>{{$t('message.最后更新时间')}}</p>
                      <i>{{debankTopData.last_statics_update_time_str}}(UTC+8)</i>
                    </li>
                  </ol>
                  <ul class="lock_up_title_left flex">
                    <li
                      v-for="(item,index) in lockUpTime"
                      :key="index"
                      :class="index == timeIdx ? 'choice':'' "
                      @click="initGetdata(index)"
                    >{{$t('message')[item]}}</li>
                  </ul>
                </div>
                <div id="DefiEcharts" ref="DefiEcharts" style="width:100%; height:430px"></div>
              </div>
              <i-table
                :loading="loading"
                :columns="columns0"
                :data="debankListData?debankListData:''"
                :class="barFixed?'tableflex':''"
              >
                <template slot-scope="{row}" slot="exchange_token">
                  <div class="coinFirst">
                    <div>
                      <span>
                        <img
                          v-lazy="row.remoute_logo_url"
                          width="26"
                          :alt="$store.state.locale == 'cn'?row.alias_lower:row.alias"
                        />
                      </span>
                    </div>
                    <div class="namcon" v-if="row.exchange_token == null"> {{row.code}} </div>
                    <div class="namcon" v-else>
                      <a v-if="$i18n.locale == 'cn'"
                        :href=" '/' + $i18n.locale + '/exchange/' + row.exchange_token.code "
                        target="_blank"
                      >{{row.exchange_token.name_zh}}</a>
                      <a v-else
                        :href=" '/' + $i18n.locale + '/exchange/' + row.exchange_token.code "
                        target="_blank"
                      >{{row.exchange_token.code}}</a>
                    </div>
                  </div>
                </template>
                <template slot-scope="{row}" slot="token_token">
                  <div>
                    <div class="namcon" v-if="row.token_token == null"> -- </div>
                    <div class="namcon" v-else>
                      <a
                        :href=" '/' + $i18n.locale + '/coinlist/' + row.token_token.code "
                        target="_blank"
                      >{{row.token_token.token}}</a>
                    </div>
                  </div>
                </template>
                <template slot-scope="{row}" slot="today_self_percent">
                  <div style="display:flex;align-items: center;justify-content: flex-end;">
                    <div v-if="row.today_self_percent >= 0.01">{{row.today_self_percent_str}}</div>
                    <div v-else>&lt; 0.01%</div>&nbsp;
                    <div class="progressCon">
                      <el-progress
                        :percentage="Number(row.today_self_percent)>100?100:Number((row.today_self_percent)*5)"
                        color="#B8BAC7"
                        :show-text="false"
                        :stroke-width="5"
                      ></el-progress>
                    </div>
                  </div>
                </template>
              </i-table>
            </div>
            <!-- DeFi概念币种 -->
            <div v-if="navIdx == 1" class="now_coin_all">
              <i-table
                :loading="loading"
                :columns="columns1"
                :data="listdatalist?listdatalist:''"
                :class="barFixed?'tableflex':''"
              >
                <template slot-scope="{row}" slot="name">
                  <a class="defi_a" :href="'/' + $i18n.locale + '/coinlist/' + row.code" target="_blank">
                    <div class="coinFirst">
                    <div>
                      <img
                          v-lazy="$store.state.bixiaobao + row.logo_m"
                          width="26"
                          :alt="$store.state.locale == 'cn'?row.name:row.name_en"
                        />
                    </div>
                    <div class="namcon">
                      <div class="tokenNm">{{row.token}}</div>
                      <!-- <span>{{$store.state.locale == 'cn'?row.name:row.name_en}}</span> -->
                      <span>{{row.lang_all_name?row.lang_all_name['name_' + $i18n.locale]:''}}</span>
                    </div>
                  </div>
                  </a>
                </template>
                <template slot-scope="{  row }" slot="circulation">
                  <Poptip word-wrap  trigger="hover" placement="right">
                    <div>
                      {{row.circulation|reverseStr}}
                      <i class="el-icon-warning-outline"></i>
                    </div>
                    <div class="progressCon">
                      <el-progress
                        :percentage="Number(row.circulate_rate)>100?100:Number(row.circulate_rate)"
                        color="#B8BAC7"
                        :show-text="false"
                        :stroke-width="5"
                      ></el-progress>
                    </div>
                    <div class="numapi" slot="content">
                      <h4>{{$t('message.流通数量')}}({{row.token}})</h4>
                      <ul>
                        <li>
                          <span>{{$t('message.总发行量')}}:</span>
                          {{row.maxsupply|formatMoney}}
                        </li>
                        <li>
                          <span>{{$t('message.流通数量')}}:</span>
                          {{row.circulation|formatMoney}}
                        </li>
                        <li>
                          <span>{{$t('message.流通率')}}:</span>
                          {{row.circulate_rate}}%
                        </li>
                      </ul>
                    </div>
                  </Poptip>
                </template>
                <template slot-scope="{row}" slot="sparkline">
                  <img v-lazy="'https://www.bixiaobao.com/api/'+row.sparkline" :onerror="defaultChart">
                </template>
              </i-table>
              <div class="pages">
                <a :href="'/?page='+Number(page-1)">l</a>
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="listdata?listdata.count:0"
                  :page-size="100"
                  :hide-on-single-page="true"
                  :current-page="page"
                ></el-pagination>
                <a :href="'/?page='+Number(page+1)">n</a>
              </div>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
import filters from "~/plugins/filters-plus";
import echarts from "echarts";
export default {
  watchQuery: ["page", "currency"],
  name: "defi",
  props: {
    // 父辈向子辈传参
  },
  // 组件的引用
  components: {
  },
  head() {
    return {
      titleTemplate: this.$t("defi.title"),
      meta: [
        {
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("defi.description")
        },
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("defi.keywords")
        }
      ]
    };
  },
  data() {
    return {
      barFixed: false,
      rightBarFixed: false,
      myFollow: ["总锁仓量", "DeFi概念币种"],
      navIdx: 0,
      listdata: [], //币种数据
      debankListData: [],
      debankTopData: [],
      debankTopLineData: [],
      chartsData: [],
      listdatalist: [],
      newPricedata: [],
      loading: true,
      page: 1,
      currency: this.$store.state.currency,
      chartData: [],
      language: this.$store.state.language,
      listdataSeo: [],
      defaultImg: 'this.src="' + require("~/assets/cash_icon.png") + '"',
      defaultChart: 'this.src="' + require('~/assets/charterror.svg') + '";this.onerror=null;',
      columns0: [
        {
          title: "#",
          type: "index",
          width: "50",
          align: "center"
        },
        {
          title: this.$t("message.项目"),
          key: "exchange_token",
          width: "150",
          slot: "exchange_token"
        },
        {
          title: this.$t("message.代币"),
          key: "token_token",
          align: "right",
          slot: "token_token"
        },
        {
          title: this.$t("message.分类"),
          key: "remote_category",
          align: "right",
          render: (h, params) => {
            return h("span", params.row.remote_category);
          }
        },
        {
          title: this.$t("message.真实锁仓量"),
          key: "real_value",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("span", filters.en_reverseStr(params.row.real_value));
          }
        },
        {
          title: this.$t("message.总锁仓量"),
          key: "lock_value",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h("span", filters.en_reverseStr(params.row.lock_value)),
              h("span", " "),
              h(
                "span",
                {
                  attrs: {
                    class: params.row.change_value >= 0 ? "up" : "down"
                  }
                },
                params.row.change_value_str
              )
            ]);
          }
        },
        {
          title: this.$t("message.总锁仓量占比"),
          key: "today_self_percent",
          sortable: true,
          align: "right",
          slot: "today_self_percent"
        }
      ],
      columns1: [
        {
          title: "#",
          key: "market_value_index",
          width: "50",
          align: "center"
        },
        {
          title: this.$t("message.币种"),
          key: "name",
          width: "140",
          slot: "name"
        },
        {
          title: this.$t("message.全球指数"),
          key: "price_now",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  class: params.row.increase24h >= 0 ? "up" : "down"
                }
              },
              "$" + " " + filters.formatePrice(params.row.price_global)
            );
          }
        },
        {
          title: this.$store.state.currency + this.$t("message.价格"),
          key: "price_now",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  class: params.row.increase24h >= 0 ? "up" : "down"
                }
              },
              filters.formatePrice(params.row.price_now)
            );
          }
        },
        {
          title: this.$t("message.24H涨幅"),
          key: "increase24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h(
              "span",
              {
                attrs: {
                  class: params.row.increase24h >= 0 ? "up" : "down"
                }
              },
              params.row.increase24h >= 0
                ? "+" + params.row.increase24h + "%"
                : params.row.increase24h + "%"
            );
          }
        },
        {
          title: this.$t("message.24H成交额"),
          key: "volume24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                filters.reverseStr(
                  params.row.volume24h,
                  this.$store.state.locale
                )
              ),
              h(
                "p",
                {
                  style: "font-size:12px;color:#50546a;line-height:12px"
                },
                this.$store.state.currency
              )
            ]);
          }
        },
        {
          title: this.$t("message.流通市值"),
          key: "market_value",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                filters.reverseStr(
                  params.row.market_value,
                  this.$store.state.locale
                )
              ),
              h(
                "p",
                {
                  style: "font-size:12px;color:#50546a;line-height:12px"
                },
                this.$store.state.currency
              )
            ]);
          }
        },
        {
          title: this.$t("message.流通数量"),
          key: "circulation",
          sortable: true,
          align: "right",
          slot: "circulation"
        },
        {
          title: this.$t("message.7天走势"),
          key: "sparkline",
          width: "110",
          align: "right",
          slot: "sparkline"
        },
        // {
        //   title: this.$t("message.7天指数走势"),
        //   key: "price_now",
        //   align: "right",
        //   width: "100",
        //   render: (h, params) => {
        //     return h("div", [
        //       h("canvas", {
        //         attrs: {
        //           id: "lineChart" + params.index,
        //           width: "40",
        //           height: "15",
        //         },
        //       }),
        //     ]);
        //   },
        // },
      ],
      myDefiChart: [],
      lockUpTime: ["30天", "90天", "365天", "全部时间"],
      timeIdx: 0
    };
  },
  async asyncData({ $axios, $cookies, store, params, query }) {
    let urdata = "";
    if (params.lang == "cn" || $cookies.get("lang") == "cn") {
      urdata = "zh_CN";
    } else if (params.lang == "en") {
      urdata = "en";
    } else {
      urdata = "ko_KR";
    }
    let currency = "";
    currency = $cookies.get("currency")
      ? $cookies.get("currency")
      : store.state.currency;

    let pages = Number(query.page) || 1;
    let oncur = "CNY";

    if (store.state.defilist != "") {
      return false;
    }

    let [tokenliset,debank_listData] = await Promise.all([
      $axios
        .get(
          "token/defi/list/?currency=" +
            currency +
            "&language=" +
            urdata +
            "&page=" +
            pages
        )
        .catch(err => {
          console.log(err);
        }),
      $axios.get("account/debank_list/").catch(err => {
        console.log(err);
      })
    ]);
    store.commit("setDefilist", tokenliset.data.data);
    return {
      listdata: tokenliset.data.data,
      debankListData: debank_listData.data.base_data,
      listdatalist: tokenliset.data.data.results,
      page: pages,
      loading: false
    };
  },
  // 实例被创建之后执行代码
  created() {},
  // 计算属性
  computed: {},
  // 方法
  methods: {
    handlemyFollow,
    formatter(row, column) {
      return row.address;
    },
    loadData(currency, page) {
      let timestamp = new Date().getTime();
      let newtime = (timestamp / 10).toFixed(0);
      this.$axios
        .get("token/list/", {
          params: {
            currency: currency,
            language: this.language,
            page: page
          }
        })
        .then(({ data }) => {
          this.listdata = data.data;
          let unData = data.data;
          let donData = [];
          for (let a = 0; a < unData.results.length; a++) {
            // 转换数字类型 （circulate_rate）
            donData = unData.results[a].circulate_rate;
            this.listdata.results[a].circulate_rate = Number(donData);
          }
          let scoreList = data.data.results;
          let score = [];
          for (var i = 0; i < scoreList.length; i++) {
            score.push(scoreList[i].score);
          }
          this.chartData = score;
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
          this.loading = false;
        });
    },
    loadDefiBankData() {
      var chartsBox = this.$refs.DefiEcharts
      if(chartsBox) {
        this.$axios
          .get("account/debank/", {
            params: {
              language: this.language
            }
          })
          .then(({ data }) => {
            this.debankTopData = data;
            this.debankTopLineData = data.statics_data
          })
          .catch(err => {
            console.log(err);
          });
          let _this = this;
          setTimeout(function(){
            _this.initGetdata(1);
          },1000)
      }
    },
    loadDebankListData(){
      this.$axios
        .get("account/debank_list/", {
          params: {
            language: this.language
          }
        })
        .then(({ data }) => {
          this.debankListData = data.base_data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // gotoDatail(data) {
    //   let routeUrl = this.$router.resolve({
    //     path: "/" + this.$i18n.locale + "/coinlist/" + data.code
    //   });
    //   window.open(routeUrl.href, "_blank");
    // },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 130) {
        this.rightBarFixed = true;
      } else {
        this.rightBarFixed = false;
      }
      if (scrollTop > 740) {
        this.barFixed = true;
      } else {
        this.barFixed = false;
      }
    },
    getMag(msg) {
      this.$store.commit("setDefilist", "");
    },
    setLang(msg) {
      let getlang = [];
      if (msg == "cn") {
        getlang = "zh_CN";
      } else {
        getlang = "ko_KR";
      }
      this.language = getlang;
    },
    initGetdata(idx) {
      this.timeIdx = idx;
      this.myDefiChart.showLoading();
      if (idx == "0") {
        let arr0 = this.debankTopLineData;
        this.chartsData = arr0.slice(0, 30);
      }
      if (idx == "1") {
        let arr1 = this.debankTopLineData;
        this.chartsData = arr1.slice(0, 90);
      }
      if (idx == "2") {
        let arr2 = this.debankTopLineData;
        this.chartsData = arr2.slice(0, 365);
      }
      if (idx == "3") {
        let arr3 = this.debankTopLineData;
        let arr4 = []
        for(var i=0,len=arr3.length;i<len;i+=5){
          arr4.push(arr3[i]);
        }
        this.chartsData = arr4;
      }
      this.chartlage(this.chartsData);
      this.loading = false;
    },
    // 大折线图
    chartlage(val) {
      let data0 = splitData(val);
      function splitData(rawData) {
        var updataTime = [];
        var lockTotalDate = [];
        var repeatRate = [];
        var realValue = [];
        for (var i = 0; i < rawData.length; i++) {
          updataTime.push(rawData[i].lock_total_date); //时间线
          lockTotalDate.push(rawData[i].value); //总锁仓量
          repeatRate.push(rawData[i].repeat_rate); //重复率
          realValue.push(rawData[i].real_value); //真实锁仓量
        }
        return {
          updataTime: updataTime,
          lockTotalDate: lockTotalDate,
          repeatRate: repeatRate,
          realValue: realValue
        };
      }
      let getlang=this.$cookies.get('lang')
      //交易对成交额占比
      this.myDefiChart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255)",
          borderWidth: 1,
          borderColor: "#E9E9E9",
          padding: 10,
          textStyle: {
            color: "#50546A",
            fontSize: 13,
            fontFamily:'Rubik',
          },
          extraCssText: "box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);",
          formatter: function(a) {
            let list = [a[0].name];
            let listItem = "";
            for (var i = 0; i < a.length; i++) {
              if (a[i].seriesName == "重复率" || a[i].seriesName == "중복률" || a[i].seriesName == "重複率" ) {
                list.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>"+
                    "&nbsp&nbsp" +
                    a[i].data +
                    "&nbsp" +
                    "%"
                );
              }  else if(a[i].seriesName == "Repetition rate"|| a[i].seriesName == "Повторность"){
                list.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Rubik, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Rubik, Helvetica, Arial, sans-serif;'>"+
                    a[i].data+
                    "</span>"+
                    "&nbsp" +
                    "%"
                );
              } else if(getlang=='ru'||getlang=='en'){
                list.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Rubik, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Rubik, Helvetica, Arial, sans-serif;'>"+
                    filters.formatMoney(a[i].data)+
                    "</span>"
                );
              }else {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>&nbsp&nbsp" +
                    filters.formatMoney(a[i].data)
                );
              }
            }
            listItem = list.join("<br>");

            return '<div class="showBox">' + listItem + "</div>";
          },
        },
        legend: {
          data: [this.$t("message.总锁仓量"), this.$t("message.真实锁仓量")],
          inactiveColor: "#777",
          textStyle: {
            color: "#50546A",
            fontSize: 12
          },
          icon: "roundRect",
          bottom: "10%",
          itemGap: 20,
          itemWidth: 52,
          itemHeight: 3,
          selectedMode: false
        },
        icon: "circle",
        grid: [
          {
            left: "3%",
            right: "3%",
            top: "5%",
            bottom: "0%",
            height: "70%"
          },
          {
            left: "8%",
            right: "2%",
            bottom: "-18%",
            height: "16%"
          }
        ],
        xAxis: [
          {
            type: "category",
            data: data0.updataTime,
            scale: true,
            boundaryGap: false,
            axisLine: {
              show: true,
              onZero: false,
              lineStyle: {
                color: "#898C9E",
                width: "1"
              }
            },
            splitNumber: 20,
            axisLabel: {
              show: true,
              color: "#999",
              fontFamily:'Rubik',
            },
            axisTick: {
              show: true,
              inside: false,
              length: 5,
              lineStyle: {
                width: "1"
              }
            },
            inverse: true
          },
          {
            type: "category",
            gridIndex: 1,
            data: data0.updataTime,
            scale: true,
            axisLine: { onZero: false, show: false },
            axisTick: { show: false },
            axisLabel: { show: false },
            splitNumber: 20,
            inverse: true
          }
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#E9E9E9"
              }
            },
            axisLabel: {
              align: "right",
              color: "#898C9E",
              verticalAlign: "middle",
              fontSize: 12,
              fontFamily:'Rubik',
              formatter: function (val) {
                if(val == '0'){
                  return val
                }else{
                  return Math.round(val /1000000000) + 'B';
                }
                }
            },
            axisTick: {
              lineStyle: {
                width: "0"
              }
            },
            scale: true,
            axisLine: {
              show: false
            },
            position: "left",
            min: 0,
            max: function (value) {
                return Math.round(value.max) + 2000000000;
            },
            splitNumber: 4,
          },
          {
            scale: true,
            gridIndex: 1,
            splitNumber: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false }
          }
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
            xAxisIndex: [0, 1],
            minValueSpan:30
          }
        ],
        axisPointer: {
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777"
          }
        },
        series: [
          {
            name: this.$t("message.总锁仓量"),
            type: "line",
            smooth: true,
            data: data0.lockTotalDate,
            showSymbol: false,
            lineStyle: {
              width: 1.6,
              color: "rgb(233, 85, 21)"
            },
            itemStyle: {
              color: "rgb(233, 85, 21)"
            }
          },
          {
            name: this.$t("message.真实锁仓量"),
            type: "line",
            smooth: true,
            data: data0.realValue,
            showSymbol: false,
            lineStyle: {
              width: 1.6,
              color: "rgb(84, 128, 216)"
            },
            itemStyle: {
              color: "rgb(84, 128, 216)"
            }
          },
          {
            name: this.$t("message.重复率"),
            type: "bar",
            data: data0.repeatRate,
            xAxisIndex: 1,
            yAxisIndex: 1,
            itemStyle: {
              color: "rgba(255, 255, 255)"
            }
          }
        ]
      });
      this.myDefiChart.hideLoading();
    }
  },
  // 页面进入时加载内容
  mounted() {
    this.loading = false;
    window.addEventListener("scroll", this.handleScroll);
    this.myDefiChart = echarts.init(this.$refs.DefiEcharts);
    this.$nextTick(()=>{
      this.loadDefiBankData()
    })
  },
  // 监测变化
  watch: {},
  // 离开当前页面销毁内容
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};

function handlemyFollow(idx) {
  this.page = 1;
  this.navIdx = idx;
  // if (idx == "0") {
  //   if ((this.debankListData = "")) {
  //     this.loadDebankListData();
  //   }
  // } else {
  //   if ((this.listdata = "")) {
  //     this.loadData(this.$store.state.currency, 1);
  //   }
  // }
}
</script>
<style scoped lang='scss'>

.defi_a{
  &:hover{
      span{
        text-decoration: underline;
      }
  }
}
.totalMarketVal {
  text-align: center;
  font-size: 16px;
  div {
    margin-bottom: 5px;
    b {
      font-weight: 500;
      font-size: 18px;
      letter-spacing: 1px;
    }
  }
  p {
    color: #909399;
    font-size: 12px;
  }
}
.home {
  min-height: calc(100vh - 430px);
  width: 100%;
  /* 内容区 */
  .container { 
    /* 左侧内容 */
      .progressCon {
        width: 76px;
        float: right;
      }
      h3 {
        font-size: 20px;
        padding: 35px 0 12px 54px;
      }
      .numapi {
        font-size: 14px;

        h4 {
          text-align: center;
          padding-top: 5px;
          margin-bottom: 10px;
        }
        ul {
          padding: 0 10px 10px;
          li {
            display: flex;
            justify-content: space-between;
            align-items: center;
            line-height: 22px;
            height: 22px;
            padding: 0;
            margin: 0;
            white-space: nowrap;
            span{
              display: inline-block;
              margin-right: 40px;
            }
          }
        }
      }
      .quotation {
        width: 100%;
        
      }
      .lock_up {
        margin: 0 24px;
        margin-right: 0;
        .lock_up_top {
          font-size: 14px;
          padding-bottom: 50px;
          color: #50546a;
        }
        .lock_up_title_right {
          li {
            padding-right: 40px;
            p,
            i {
              font-size: 14px;
              color: #898c9e;
              line-height: 26px;
            }
            span {
              font-size: 16px;
              color: #242735;
              font-weight: 500;
            }
          }
        }
        .lock_up_title_left {
          li {
            margin-right: 30px;
            cursor: pointer;
            &.choice {
              position: relative;
              color: #f86b1d;
              font-weight: 500;
              &::after {
                content: "";
                position: absolute;
                width: 100%;
                background: #f86b1d;
                height: 4px;
                bottom: -20%;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
      }
    // 左侧内容
    // .home_right {
    //   width: 300px;
    //   position: relative;
    //   .icptip {
    //     width: 300px;
    //     background: #fff;
    //     padding: 20px;
    //     border-radius: 4px;
    //     margin-bottom: 20px;
    //     span {
    //       color: red;
    //     }
    //   }
    //   .rightfixed {
    //     position: fixed;
    //     top: 0;
    //   }
    //   .addcon {
    //     overflow: hidden;
    //     height: 146px;
    //     img {
    //       width: 100%;
    //       font-size: 0;
    //     }
    //   }
    // }
  }
}



</style>

<style lang="scss">
.tableflex .ivu-table-header{
  position: fixed;
  top: 0;
}
.ivu-table{
  overflow: auto;
}
.ivu-table-wrapper{
  overflow: auto;
}
</style>