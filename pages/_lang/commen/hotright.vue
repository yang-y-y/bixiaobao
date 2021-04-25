<template>
  <div>
    <div class="icptip border radiu" v-show="$store.state.locale=='cn'">
      <span>风险提示：</span> 防范以“虚拟货币”“区块链”名义进行非法集资的风险。
      <div style="text-align:right;margin-bottom:10px;border-bottom:1px solid #eee;padding-bottom:5px">- -银保监会等五部门</div>
      <p>
        据国家互联网信息办公室《区块链信息服务管理规定》要求，“区块链信息服务提供者”应积极在区块链信息服务备案管理系统备案。
      </p>
      <div style="text-align:right"><a href="https://bcbeian.ifcert.cn/index" target="_blank">备案入口></a></div>
    </div>
    <div class="hotlist border radiu">
      <div class="tabtitle Center">
        <span
          v-for="(item, index) in tabdata"
          :key="index"
          @click="handleChange(index)"
          :class="tabindex == index ? 'active' : ''"
          onselectstart="return false;"
          >{{ $t("message")[item] }}</span
        >
      </div>
      <div class="tabcon" v-if="tabindex == 0">
        <div class="headtab">
          <span
            v-for="(item, index) in datedata"
            :key="index"
            :class="upindex == index ? 'active' : ''"
            @click="handleChangeDate(1, index, item.type)"
            >{{ $t("message")[item.name] }}</span
          >
        </div>
        <div class="cons">
          <table>
            <thead>
              <tr>
                <th>{{ $t("message.币种") }}</th>
                <th>{{ $t("message.价格") }}</th>
                <th>{{ $t("message.涨幅") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in updatalist[curData]"
                :key="index"
                @click="gotoDatail(item.code)"
              >
                <td>{{ item.token }}</td>
                <td align="right">{{ item.price_now || "" | priceFloat }}</td>
                <td align="right" class="up" v-if="item.inc > 0">
                  +{{ item.inc | formatMoney(2) }}%
                </td>
                <td align="right" class="down" v-else>
                  {{ item.inc | formatMoney(2) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="tabcon" v-else>
        <div class="headtab">
          <span
            v-for="(item, index) in datedata"
            :key="index"
            :class="downindex == index ? 'active' : ''"
            @click="handleChangeDate(2, index, item.type)"
            >{{ $t("message")[item.name] }}</span
          >
        </div>
        <div class="cons">
          <table>
            <thead>
              <tr>
                <th>{{ $t("message.币种") }}</th>
                <th>{{ $t("message.价格") }}</th>
                <th>{{ $t("message.涨幅") }}</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(item, index) in downdatalist[curData]"
                :key="index"
                @click="gotoDatail(item.code)"
              >
                <td>{{ item.token }}</td>
                <td align="right">{{ item.price_now || "" | priceFloat }}</td>
                <td align="right" class="down">
                  {{ item.inc | formatMoney(2) }}%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "hotright",
  //  props: ["postdata"],
  data() {
    return {
      postdata: [],
      tabindex: 0,
      upindex: 0,
      downindex: 0,
      datedata: [
        {
          name: "24小时",
          type: 1,
        },
        {
          name: "7天",
          type: 7,
        },
        {
          name: "30天",
          type: 30,
        },
      ],
      tabdata: ["涨幅榜", "跌幅榜"],
      updatalist: {
        Data1: [],
        Data7: [],
        Data30: [],
      },
      downdatalist: {
        Data1: [],
        Data7: [],
        Data30: [],
      },
      curData: "Data1",
      bitcoinIncrease24h:'',
      bitcoinPrice:''
    };
  },
  created() {
    // console.log(this.postdata)
    this.getBitcoinPrice(this.$store.state.currency)

  },
  methods: {
    gotoDatail(data) {
      let routeUrl = this.$router.resolve({
        path: "/" + this.$i18n.locale + "/coinlist/" + data,
      });
      window.open(routeUrl.href, "_blank");
    },
    handleChange(index) {
      this.tabindex = index;
      if (index == "0") {
        this.loadData(1, "up");
        this.handleChangeDate(1, 0, 1);
      }
      if (index == "1") {
        this.loadData(1, "down");
        this.handleChangeDate(2, 0, 1);
      }
    },
    getBitcoinPrice(currency){
      this.$axios
        .get("/token/detail/bitcoin/", {
          params: {
            currency: currency,
            language: this.language,
            t: this.$store.state.newtime
          },
        })
        .then(({ data }) => {
          this.bitcoinPrice = data.data.price_now;
          this.bitcoinIncrease24h = data.data.increase24h;
        }).catch(err => {
          console.log(err);
        });
    },
    handleChangeDate(type, index, datetype) {
      /*
        type （0/1）涨/跌
        index 索引值
        datetype 日期
        */
      this.curData = "Data" + datetype;
      if (type == "1") {
        this.loadData(datetype, "up");
        this.upindex = index;
        this.downindex = 0;
      }
      if (type == "2") {
        this.loadData(datetype, "down");
        this.upindex = 0;
        this.downindex = index;
      } else {
        return false;
      }
    },
    loadData(time, type) {
      if (type == "up" && time == 1 && this.updatalist.Data1 != "") {
        return false;
      }
      if (type == "up" && time == 7 && this.updatalist.Data7 != "") {
        return false;
      }
      if (type == "up" && time == 30 && this.updatalist.Data30 != "") {
        return false;
      }
      if (type == "down" && time == 1 && this.downdatalist.Data1 != "") {
        return false;
      }
      if (type == "down" && time == 7 && this.downdatalist.Data7 != "") {
        return false;
      }
      if (type == "down" && time == 30 && this.downdatalist.Data30 != "") {
        return false;
      }
      let postdata = {
        direction: type,
        duration: time,
        currency: this.$store.state.currency,
      };

      this.$axios
        .get("v1/token/updown/", { params: postdata })
        .then(({ data }) => {
          if (type == "up") {
            if (time == "1") {
              this.updatalist.Data1 = data.data.result;
            }
            if (time == "7") {
              this.updatalist.Data7 = data.data.result;
            }
            if (time == "30") {
              this.updatalist.Data30 = data.data.result;
            }
          } else {
            if (time == "1") {
              this.downdatalist.Data1 = data.data.result;
            }
            if (time == "7") {
              this.downdatalist.Data7 = data.data.result;
            }
            if (time == "30") {
              this.downdatalist.Data30 = data.data.result;
            }
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    this.loadData(1, "up");
  },
};
</script>
<style lang="scss">
.hotlist {
  min-height: 400px;
  width: 100%;
  padding: 10px 20px;
  .tabtitle {
    text-align: center;
    border-bottom: 1px solid #e9e9e9;
    font-size: 16px;
    justify-content: space-around;
    span {
      display: inline-block;
      // margin: 0 5px;
      line-height: 38px;
      height: 42px;
      cursor: pointer;
    }
    span.active {
      color: #e95515;
      border-bottom: 4px solid #e95515;
    }
  }
  .tabcon {
    .headtab {
      text-align: center;
      display: flex;
      justify-content: center;
      padding: 15px 0;
      span {
        display: inline-block;
        border: 1px solid #e9e9e9;
        height: 28px;
        line-height: 28px;
        border-radius: 14px;
        width: 100%;
        margin: 0 10px;
        cursor: pointer;
      }
      span.active {
        color: #e95515;
        border-color: #e95515;
      }
    }
    .cons {
      max-height: 500px;
      overflow-y: scroll;
      table {
        width: 100%;
        thead {
          border-bottom: 1px solid #e9e9e9;
          margin-bottom: 5px;
        }
        th {
          text-align: right;
          height: 30px;
          line-height: 30px;
         
          &:first-child {
            text-align: left;
          }
        }
        td {
          line-height: 30px;
          height: 30px;
        }
        tbody{
          tr {
            cursor: pointer;
            border-radius: 4px;
            overflow: hidden;
            &:hover {
              background: #f5f8ff;
            }
          }
        }
      }
    }
  }
}
</style>