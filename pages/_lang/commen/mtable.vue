<template>
  <div class="tableView">
    <div class="el-loading-mask" v-if="loading">
      <div class="el-loading-spinner">
        <svg viewBox="25 25 50 50" class="circular"><circle cx="50" cy="50" r="20" fill="none" class="path"></circle></svg>
      </div>
    </div>
    <table class="tabhead">
      <thead>
        <tr>
          <th
            v-for="(item, index) in tableTitle"
            :key="index"
            :width="item.width"
          >
            <div
              class="trcons first_th"
              v-if="index == 0"
              @click="sort(item.type, 'all')"
            >
              {{ item.name }}
            </div>
            <div class="trcons" v-else>
              <div @click="sort(item.type, 'all')" class="clickbtn">
                {{ item.name }}
              </div>
              <span v-if="item.sort">
                <i
                  @click="sort(item.type, 'up')"
                  :class="
                    sortdata.order === 'up' &&
                    item.type == sortdata.key &&
                    flag == 1
                      ? 'el-icon-caret-top active'
                      : 'el-icon-caret-top'
                  "
                ></i>
                <i
                  @click="sort(item.type, 'down')"
                  :class="
                    sortdata.order === 'down' &&
                    item.type == sortdata.key &&
                    flag == 2
                      ? 'el-icon-caret-bottom active'
                      : 'el-icon-caret-bottom'
                  "
                ></i>
              </span>
            </div>
          </th>
        </tr>
      </thead>
    </table>
    <table class="nowtable">
      <tbody>
        <tr
          v-for="(item, index) in listdatalist"
          :key="index"
          :class="
            item.isnew != true
              ? ''
              : item.updown == 'up'
              ? 'updates'
              : 'downdates'
          "
        >
          <td>{{ item.market_value_index }}</td>
          <td>
            <a
              :href="
                '/' +
                $i18n.locale +
                '/coinlist/' +
                item.code +
                '?currency=' +
                currency
              "
              target="_self"
            >
              <div class="namecon">
                <div class="imgcon">
                  <img
                    :src="$store.state.bixiaobao + item.logo_m"
                    :alt="item.name + ',' + item.token + ',' + item.code"
                    :onerror="defaultImg"
                  />
                </div>
                <div style="display: grid">
                  <div class="names">{{ item.token }}</div>
                  <span>{{
                    item.lang_all_name
                      ? item.lang_all_name["name_" + $i18n.locale]
                      : ""
                  }}</span>
                </div>
              </div>
            </a>
          </td>
          <!-- wsData wsUpDown-->
          <!-- <td><span :class="item.increase24h>0?'up':'down'">$&nbsp;{{item.code=='bitcoin'&&wsData>0?(wsData).toFixed(0):item.price_global}}</span></td> -->
          <!-- <td><span :class="Number(item.increase24h)>0?'up':'down'">{{$store.state.curRate}}&nbsp;{{(item.price_global*rateCur)|priceFloat}}</span></td> -->
          <td>
            <span :class="Number(item.increase24h) > 0 ? 'up' : 'down'"
              >{{ $store.state.curRate }}&nbsp;{{
                item.price_now | priceFloat
              }}</span
            >
          </td>
          <td>
            <span :class="Number(item.increase24h) > 0 ? 'up' : 'down'"
              >{{
                Number(item.increase24h) > 0
                  ? "+" + Number(item.increase24h).toFixed(2)
                  : Number(item.increase24h).toFixed(2)
              }}%</span
            >
          </td>
          <td>
            <span :title="item.volume24h | tittleformatMoney"
              >{{ $store.state.curRate }}&nbsp;{{
                item.volume24h | reverseStr
              }}</span
            >
          </td>
          <td>
            <span :title="item.market_value | tittleformatMoney"
              >{{ $store.state.curRate }}&nbsp;{{
                item.market_value | reverseStr
              }}</span
            >
          </td>
          <td>
            <Poptip word-wrap trigger="hover" placement="right">
              <div>
                {{ item.circulation | reverseStr }}&nbsp;<i
                  class="el-icon-warning-outline"
                ></i>
              </div>
              <div class="progressCon">
                <el-progress
                  :percentage="
                    Number(item.circulate_rate) > 100
                      ? 100
                      : Number(item.circulate_rate)
                  "
                  color="#B8BAC7"
                  :show-text="false"
                  :stroke-width="5"
                ></el-progress>
              </div>
              <div class="numapi" slot="content">
                <h4>{{ $t("message.流通数量") }}({{ item.token }})</h4>
                <ul>
                  <li>
                    <span>{{ $t("message.总发行量") }}:</span>
                    {{ item.maxsupply | formatMoney }}
                  </li>
                  <li>
                    <span>{{ $t("message.流通数量") }}:</span>
                    {{ item.circulation | formatMoney }}
                  </li>
                  <li>
                    <span>{{ $t("message.流通率") }}:</span>
                    {{ item.circulate_rate }}%
                  </li>
                </ul>
              </div>
            </Poptip>
          </td>
          <td>
            <div class="vldstyle">
              <img
                v-lazy="'https://www.bixiaobao.com/api/' + item.sparkline"
                :key="item.sparkline"
                :onerror="defaultChart"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
let clickNum = 0;
export default {
  props:{ Tdata: Array,isload: Boolean },
  name: "mtable",
  data() {
    return {
        loading:true,
        defaultImg: 'this.src="' + require("~/assets/cash_icon.png") + '"',
        defaultChart: 'this.src="' + require("~/assets/charterror.svg") + '";this.onerror=null;',
        tableTitle: [
        {
            name: "#",
            type: "market_value_index",
            sort: true,
            width: 50,
        },
        {
            name: this.$t("message.币种"),
            type: "name",
            sort: false,
            width: 135,
        },
        {
            name: this.$t("message.价格"),
            type: "price_now",
            sort: true,
            width: 100,
        },
        {
            name: this.$t("message.24H涨幅"),
            type: "increase24h",
            sort: true,
            width: 100,
        },
        {
            name: this.$t("message.24H成交额"),
            type: "volume24h",
            sort: true,
            width: 110,
        },
        {
            name: this.$t("message.流通市值"),
            type: "market_value",
            sort: true,
            width: 110,
        },
        {
            name: this.$t("message.流通数量"),
            type: "circulation",
            sort: true,
            width: 132,
        },
        {
            name: this.$t("message.7天走势"),
            type: "circulation",
            sort: false,
            width: 100,
        },
        ],
        flag: 0,
        sortdata: {
            key: "", // 表示排序的对象，比如数量或者价格
            order: "", // 表示升序或者降序或者不排序
        },
        listdatalist:this.$props.Tdata,
        currency: this.$store.state.currency,
        language: this.$store.state.language,
    };
    },
  created() {
    // this.listdatalist = this.$attrs.listdatalist;
    this.loading = this.$props.isload
  },
  methods: {
    sort(type, statu) {
      clickNum += 1;
      if (clickNum == "3") {
        clickNum = 0;
      }
      this.flag = clickNum + 1;
      if (clickNum == "0" && statu == "all") {
        // 第一次单击触发bai的事件
        this.flag = 1;
        this.listdatalist.sort(this.compare(type));
        this.sortdata = {
          key: type,
          order: "up",
        };
      } else if (clickNum == "1" && statu == "all") {
        this.flag = 2;
        this.listdatalist.sort(this.compareDown(type));
        this.sortdata = {
          key: type,
          order: "down",
        };
      } else if (clickNum == "2" && statu == "all") {
        this.listdatalist.sort(this.compare("market_value_index"));
        this.flag = 0;
      }

      if (statu == "up") {
        // 第一次单击触发bai的事件
        this.listdatalist.sort(this.compare(type));
        this.sortdata = {
          key: type,
          order: "up",
        };
        this.flag = 1;
      }
      if (statu == "down") {
        this.listdatalist.sort(this.compareDown(type));
        this.sortdata = {
          key: type,
          order: "down",
        };
        this.flag = 2;
      }
    },
    compare(attr) {
      return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return Number(val1) - Number(val2);
      };
    },
    compareDown(attr) {
      return function (a, b) {
        var val1 = a[attr];
        var val2 = b[attr];
        return Number(val2) - Number(val1);
      };
    },
  },
  watch:{
    Tdata: {
        handler(newValue, oldValue) {
            this.listdatalist = newValue
        },
            deep:true,//对象内部的属性监听，也叫深度监听
        immediate: true
    },
     isload: {
        handler(newValue, oldValue) {
            this.loading = newValue
        },
            deep:true,//对象内部的属性监听，也叫深度监听
        immediate: true
    },
    
  }
};
</script>