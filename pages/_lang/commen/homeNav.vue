
<template>
  <div>
    <div class="card_list flex">
      <div class="card_view">
        <h2>{{ $t("message.全球市值") }}</h2>
        <div class="prices">
          {{ $store.state.curRate
          }}{{ chardata.cap ? chardata.cap.value : "--" | reverseStr }}
        </div>
        <div class="up" v-if="chardata.cap && chardata.cap.percentage > 0">
          {{ chardata.cap ? chardata.cap.percentage : "--" }}%<i
            class="el-icon-caret-top"
          ></i>
        </div>
        <div class="down" v-else>
          {{ chardata.cap ? chardata.cap.percentage : "--" }}%<i
            class="el-icon-caret-bottom"
          ></i>
        </div>
        <div class="chartcon" id="chart_one" ref="chart_one"></div>
      </div>
      <div class="card_view">
        <h2>{{ $t("message.全球成交额") }}</h2>
        <div class="prices">
          {{ $store.state.curRate
          }}{{ chardata.vol ? chardata.vol.value : "--" | reverseStr }}
        </div>
        <div class="up" v-if="chardata.vol && chardata.vol.percentage > 0">
          {{ chardata.vol ? chardata.vol.percentage : "" }}%<i
            class="el-icon-caret-top"
          ></i>
        </div>
        <div class="down" v-else>
          {{ chardata.vol ? chardata.vol.percentage : "" }}%<i
            class="el-icon-caret-bottom"
          ></i>
        </div>
        <div class="chartcon" id="chart_two" ref="chart_two"></div>
      </div>
      <div class="card_view">
        <h2>{{ $t("message.全球涨跌行情") }}</h2>
        <div class="progress_tittle">
          <div class="proview up">
            <i class="el-icon-caret-top">{{ upNum }}</i>
          </div>
          <div class="proview down">
            <i class="el-icon-caret-bottom">{{ downNum }}</i>
          </div>
        </div>
        <div class="progress">
          <div
            class="proView up"
            :style="{ width: (upNum / (upNum + downNum)) * 100 + '%' }"
          ></div>
          <div
            class="proView down"
            :style="{ width: (downNum / (upNum + downNum)) * 100 + '%' }"
          ></div>
        </div>
      </div>
      <div class="card_view">
        <h2>{{ $t("message.全球收录") }}</h2>
        <div class="view-text">
          <span>{{ $t("message.收录全球虚拟货币") }}</span>
          <strong>{{
            chardata.included_num
              ? chardata.included_num.token_count || "--"
              : ""
          }}</strong>
        </div>
      </div>
    </div>
    <div class="quotation_nav itemCenter">
      <ul class="itemCenter">
        <li
          v-for="(item, index) in myFollow"
          :key="index"
          :class="index == navIdx ? 'choice' : ''"
        >
          <nuxt-link :to="item.url">{{ $t("message")[item.name] }}</nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
let homeChart1, homeChart2;
export default {
  middleware: "homeNav",
  name: "homenav",
  data() {
    return {
      myFollow: [
        {
          name: "币种排行",
          url: "/" + this.$i18n.locale + "/",
        },
        {
          name: "新币排行",
          url: "/" + this.$i18n.locale + "/new-listing",
        },
        {
          name: "热度排行",
          url: "/" + this.$i18n.locale + "/trending",
        },
        {
          name: "nft",
          url: "/" + this.$i18n.locale + "/nft",
        },
        {
          name: "波卡生态",
          url: "/" + this.$i18n.locale + "/polkadot-ecosystem",
        },
        {
          name: "BSC生态",
          url: "/" + this.$i18n.locale + "/binance-smart-chain-ecosystem",
        },
      ],
      navIdx: this.$attrs.navIdx,
      chart1data: [
        {
          time: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [820, 932, 901, 934, 1290, 1330, 920],
        },
      ],
      chart2data: [
        {
          time: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          data: [820, 523, 901, 1134, 890, 1330, 2320],
        },
      ],
      upNum: 1009,
      downNum: 192,
      chardata: [],
    };
  },
  created() {
    //   this.navIdx=
  },
  methods: {
    // 方法
    getData() {
      this.$axios
        .get("token/updown/trend/", {
          //   params: {
          //     language: this.$store.state.language,
          //     currency: currency,
          //   },
        })
        .then(({ data }) => {
          // console.log(data)
          this.chardata = data.data;
          this.upNum = data.data.updown.up_num;
          this.downNum = data.data.updown.down_num;
          this.getchartData(data.data.cap.percentage, data.data.vol.percentage);
        });
    },
    getchartData(val1, val2) {
      let upcolor = 
        {
          color: "#00B45A",
          offset: [
            {
              offset: 0,
              color: "rgba(40,201,75,0.2)", // 100% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(40,201,75,0)", //   0% 处的颜色
            },
          ],
        }
      let downcolor = 
        {
          color: "#EA3943",
          offset: [
            {
              offset: 0,
              color: "rgba(234,57,67,0.2)", // 100% 处的颜色
            },
            {
              offset: 1,
              color: "rgba(234,57,67,0)", //   0% 处的颜色
            },
          ],
        }
     
      homeChart1.setOption({
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "0",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chardata.cap.kline_date,
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: this.chardata.cap.kline_value,
            type: "line",
            areaStyle: {},
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 1, //设置线条宽度
                },
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops:val1>0?upcolor.offset:downcolor.offset,
                global: false, // 缺省为 false
              },
            },
            color: val1>0?upcolor.color:downcolor.color, //线条颜色
            smooth: false, //线条平滑
          },
        ],
      });
      homeChart2.setOption({
        grid: {
          left: "0%",
          right: "0%",
          bottom: "0%",
          top: "0",
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.chardata.vol.kline_date,
          show: false,
        },
        yAxis: {
          type: "value",
          show: false,
        },
        series: [
          {
            data: this.chardata.vol.kline_value,
            type: "line",
            areaStyle: {},
            showSymbol: false,
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 1, //设置线条宽度
                },
              },
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops:val2>0?upcolor.offset:downcolor.offset,
                global: false, // 缺省为 false
              },
            },
            color:val2>0?upcolor.color:downcolor.color, //线条颜色
            smooth: false, //线条平滑
          },
        ],
      });
    },
  },
  mounted() {
    homeChart1 = echarts.init(this.$refs.chart_one);
    homeChart2 = echarts.init(this.$refs.chart_two);
    this.getData();
  },
};
</script>

<style lang="scss">
</style>