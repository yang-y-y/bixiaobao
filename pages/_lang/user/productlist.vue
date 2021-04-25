
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="productlist" />
        <div class="rightCon box">
          <div class="product">
            <div class="title">
              {{$t('message.购买矿机')}}
              <a :href="'/'+$store.state.locale+'/faq/'" target="_blank">
                {{$t('message.常见问题')}}
                <i class="el-icon-question"></i>
              </a>
            </div>
            <div class="cons productlist">
              <ul>
                <li v-for="(item,index) in listdata" :key="index">
                  <div v-show="item.star=='1'" class="mfSty"><img src="~/assets/mficon.png" ondragstart="return false;" alt="" srcset=""><span>{{$t('message.免费体验')}}</span></div>
                  <div v-show="item.star=='2' && item.mtype=='0'" class="mfSty"><img src="~/assets/mficon.png" ondragstart="return false;" alt="" srcset=""><span>{{$t('message.限购1次')}}</span></div>
                  <div class="small">
                    <img
                      :src="require('~/assets/level_0'+item.star+'.png')"
                      ondragstart="return false;"
                      height="30"
                      alt
                    />
                  </div>
                  <div class="large">
                    <img
                      :src="require('~/assets/smallP_0'+item.star+'.png')"
                      ondragstart="return false;"
                      width="206"
                      alt
                    />
                  </div>

                  <div class="produce between">
                    <div class="view textAlign">
                      <h4>{{$t('message.产出周期')}}({{$t('message.天')}})</h4>
                      <h3>{{item.circle}}</h3>
                    </div>
                    <div class="view textAlign">
                      <h4>{{$t('message.预期年化收益')}}(%)</h4>
                      <h3>{{item.profit}}</h3>
                    </div>
                  </div>

                  <div :class="item.star=='1'?'buyBtn btnColor':'buyBtn between'">
                    <div class="view">
                      <h4>BXB{{$t('message.价格')}}</h4>
                      <p :class="item.star=='1'?'onFree':''">{{item.bxb||'-'|formatMoney}}</p>
                      <div v-if="$store.state.userinfo.prize">
                        <el-button
                          v-if="item.bxb_status && isPost != index"
                          type="primary"
                          @click="buyFrom(1,item.uuid_id,item.star,item.bxb,item.circle,item.profit)"
                        >{{$t('message.购买')}}</el-button>
                        <el-button
                          v-else-if="item.star!='1'"
                          type="primary"
                          disabled
                        >{{$t('message.购买')}}</el-button>
                        <el-button v-else type="warning" disabled>{{$t('message.已领取')}}</el-button>
                      </div>

                      <div v-else>
                        <el-button
                          v-if="item.bxb_status && isPost != index"
                          type="primary"
                          @click="buyFrom(1,item.uuid_id,item.star,item.bxb,item.circle,item.profit)"
                        >{{$t('message.购买')}}</el-button>
                        <el-button
                          v-else-if="item.star=='1'"
                          type="warning"
                          @click="buyFrom(0,item.uuid_id,item.star,0,item.circle,item.profit)"
                        >{{$t('message.免费领取')}}</el-button>
                        <el-button v-else type="primary" disabled>{{$t('message.购买')}}</el-button>
                      </div>
                    </div>

                    <div class="view" v-if="item.star!='1'">
                      <h4>{{$t('message.水晶价格')}}</h4>
                      <p>{{item.score||'-'}}</p>
                      <el-button
                        v-if="item.score_status && isPost != index"
                        type="info"
                        @click="buyFrom(0,item.uuid_id,item.star,item.score,item.circle,item.profit)"
                        plain
                      >{{$t('message.兑换')}}</el-button>
                      <el-button v-else disabled plain>{{$t('message.兑换')}}</el-button>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="$t('message.提示')" :visible.sync="centerDialogVisible" width="30%" center>
      <div class="buyTip" v-if="openPost">
        <div style="text-align:center">
          <div class="tiptxt" v-if="postData.price!=0">
            {{$t('message.您将消耗')}}
            <span style="font-size:18px">{{postData.price|formatMoney}}</span>
            <span v-if="postData.coin=='0'">{{$t('message.水晶')}}</span>
            <span v-else>BXB</span>
            {{$t('message.来获得此矿机')}}
          </div>
          <div class="tiptxt" v-else>{{$t('message.币小宝官方送了您一台矿机')}}</div>
          <div class="imgCons">
            <div class="imgBody">
              <img
                v-if="postData.star"
                :src="require('~/assets/smallP_0'+this.postData.star+'.png')"
                ondragstart="return false;"
                alt
              />
              <span v-else></span>
            </div>
            <img
              v-if="postData.star"
              :src="require('~/assets/level_0'+this.postData.star+'.png')"
              ondragstart="return false;"
              height="30"
              alt
              class="imgpst"
            />
            <span v-else></span>
          </div>
          <div class="aboutprofit">
            <div>
              <h5>{{$t('message.产出周期')}}({{$t('message.天')}})</h5>
              {{postData.circle}}
            </div>
            <div>
              <h5>{{$t('message.预期年化收益')}}</h5>
              {{postData.profit}}%
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="buyFromData(true)"
            v-if="postData=='1'"
            :loading="loading"
          >{{$t('message.领取')}}</el-button>
          <el-button
            type="primary"
            @click="buyFromData(true)"
            v-else
            :loading="loading"
          >{{$t('message.确定')}}</el-button>
        </span>
      </div>
      <div class="buySuccess" v-else>
        <div style="text-align:center;margin-bottom:20px">
          <div>
            <i class="el-icon-circle-check" style="font-size:52px;color:green"></i>
          </div>
          <div style="margin:10px 0;">{{$t('message.购买成功')}}</div>
          <p>{{$t('message.您可以在我的矿机首页中查看矿机状态')}}</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="golink()">{{$t('message.查看矿机')}}</el-button>
          <el-button @click="initData()" plain>{{$t('message.关闭')}}</el-button>
        </span>
      </div>
    </el-dialog>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import Menulist from "~/pages/_lang/user/menulist";
export default {
  name: "product",
  middleware: "userAuth",
  data() {
    return {
      timer: 60,
      loading: false,
      onPost: false,
      days: 90,
      listdata: [],
      isPost: 100,
      centerDialogVisible: false,
      maxProfit: "",
      maxData: "",
      openPost: true,
      postData: {
        coin: 1,
        machine: 1,
        star: 1,
        price: "",
        circle: 1,
        profit: 1
      }
    };
  },
  created() {
    this.loadData();
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // VeLine,
    Menulist
  },
  methods: {
    getMag(msg) {},
    setLang(msg) {},
    _format(val) {
      return () => {
        return val;
      };
    },
    successTip(msg, formName) {
      this.$notify({
        type: "success",
        message: msg
      });
    },
    errorTip(msg) {
      this.$notify.error({
        title: "error",
        message: msg
      });
    },
    loadData() {
      let timestamp = new Date().getTime();
      let newtime = (timestamp / 10).toFixed(0);
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .get("account/product/list/?t=" + newtime, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken
          }
        })
        .then(({ data }) => {
          this.listdata = data.data.results;
          let getdata = data.data.results;
          let maxNumber = [];
          let maxDnb = [];
          for (let a = 0; a < getdata.length; a++) {
            maxNumber.push(getdata[a].profit);
            maxDnb.push(getdata[a].circle);
          }
          this.maxData = this.getMax(maxDnb);
          this.maxProfit = this.getMax(maxNumber);
        });
    },
    buyFromData(bool) {
      if (!bool) return false;
      this.loading = true;
      this.isPost = this.postData.index;
      let _this = this;
      let params = {
        coin: this.postData.coin,
        machine: this.postData.machine
      };
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .post("account/product/add/", params, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken
          }
        })
        .then(({ data }) => {
          this.loading = false;
          setTimeout(function() {
            _this.isPost = 100;
          }, 1000);
          if (data.status == "1") {
            this.openPost = false;
            // this.centerDialogVisible = false;
            this.loadData();
          } else if (data.status == "107") {
            this.errorTip("达到最大持有量!");
          } else {
            this.errorTip(data.msg);
          }
        })
        .catch(err => {
          this.errorTip(err);
          this.loading = false;
        });
    },
    buyFrom(type, key, star, price, circle, profit) {
      this.centerDialogVisible = true;
      this.postData = {
        coin: type,
        machine: key,
        star: star,
        price: price,
        circle: circle,
        profit: profit
      };
      console.log(this.postData);
    },
    getMax(val) {
      val.sort(function(a, b) {
        return b - a;
      });
      return val[0];
    },
    initData() {
      this.centerDialogVisible = false;
      this.openPost = true;
    },
    golink() {
      this.$router.push("/" + this.$store.state.locale + "/user/product/");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~/pages/_lang/user/user.scss";
.productlist {
  padding-top: 30px;
  ul li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    // background: url("~@/assets/probg2.png") no-repeat left center;
    // background-size: 100%;
    background: #6651f6;
    height: 130px;
    border-radius: 10px;
    padding-left: 40px;
    padding-right: 35px;
    color: #fff;
    position: relative;
    margin-bottom: 30px;
    .mfSty {
      position: absolute;
      right: 0;
      top: 0;
      img {
        width: 80px;
      }
      span {
        position: absolute;
        left: 5px;
        top: 20px;
        z-index: 3;
        font-size: 14px;
        color: #704F00;
        display: inline-block;
        width: 100px;
        text-align: center;
        -moz-transform: rotate(-45deg);
        -webkit-transform: rotate(-315deg);
      }
    }
    .view {
      margin: 0 20px;
      h4 {
        margin-bottom: 5px;
        font-size: 14px;
      }
      h3 {
        font-size: 30px;
      }
      .onFree {
        text-decoration: line-through;
      }
      p {
        margin-bottom: 5px;
      }
    }
    .textAlign {
      text-align: center;
    }
    .buyBtn {
    //   width: 218px;
      text-align: center;
      position: relative;
      padding-left: 20px;
      
    }
    .large {
      height: 100%;
      img {
        width: 230px;
        display: block;
      }
    }
    .small {
      position: absolute;
      left: -3%;
    }
    .produce{
        width: 264px;
        position: relative;
        &::after {
        content: "";
        position: absolute;
        right: 0;
        top: 20%;
        height: 52px;
        border-left: 1px solid rgba(255, 255, 255, 0.2);
      }
    }
  }
}
</style>
<style lang="scss">
.buyTip {
  text-align: center;
  .tiptxt {
    margin-bottom: 25px;
    span {
      font-weight: 500;
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: center;
    align-items: center;
    .el-button {
      margin: 0 20px;
    }
  }
  .aboutprofit {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
    div {
      margin: 0 10px;
      font-size: 16px;
      h5 {
        font-size: 14px;
        font-weight: normal;
        margin-bottom: 5px;
      }
    }
  }
}
.imgCons {
  position: relative;
  margin: 20px 0;
  margin-bottom: 30px;
  .imgBody {
    img {
      width: 207px;
      border-radius: 30px;
    }
  }
  .imgpst {
    position: absolute;
    left: 50%;
    bottom: -10px;
    transform: translate(-50%, 0);
  }
}
.product {
  .title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    a {
      display: inline-block;
      font-size: 14px;
      font-weight: normal;
      color: #5480d8;
    }
  }
}
.buySuccess {
  text-align: center;
}
.productlist {
  .el-button {
    border-radius: 8px;
  }
  .btnColor {
    .el-button--warning {
      color: #fff;
      background-color: #ffb400;
      border-color: #ffb400;
    }
    .el-button--warning.is-disabled,
    .el-button--warning.is-disabled:active,
    .el-button--warning.is-disabled:focus,
    .el-button--warning.is-disabled:hover {
      background: rgba($color: #ffb400, $alpha: 0.2);
      color: #fff;
      border: none;
    }
  }
  .el-button--primary.is-disabled,
  .el-button--primary.is-disabled:active,
  .el-button--primary.is-disabled:focus,
  .el-button--primary.is-disabled:hover {
    background: rgba($color: #fff, $alpha: 0.2);
    color: #6651f6;
    border: none;
  }
  .el-button--primary {
    background-color: #ffffff;
    border-color: #ffffff;
    color: #6651f6;
  }
  .el-button.is-disabled.is-plain,
  .el-button.is-disabled.is-plain:focus,
  .el-button.is-disabled.is-plain:hover {
    background: rgba($color: #8473f7, $alpha: 0.2);
    border-color: #8473f7;
    color: #8473f7;
  }
  .el-button--info.is-plain {
    background-color: #6651f6;
    border-color: #ffffff;
    color: #ffffff;
  }
  //   .btnColor {
  //     .el-button--default {
  //       background: rgba($color: #ffb400, $alpha: 0.2);
  //       color: #fff;
  //       border-color: #FFFFFF;
  //     }
  //   }
  //   .el-button--default {
  //     background: rgba($color: #fff, $alpha: 0.2);
  //     color: #6651F6;
  //     border-color: #FFFFFF;
  //     &:hover {
  //       background: rgba($color: #fff, $alpha: 0.8);
  //     }
  //   }
  //   .el-button--primary {
  //     background-color: #ffffff;
  //     border-color: #ffffff;
  //     color: #6651F6;
  //   }
  //   .el-button--primary:focus,
  //   .el-button--primary:hover {
  //     background-color: #434343;
  //     border-color: #434343;
  //   }
  //   .el-button--primary.is-disabled,
  //   .el-button--primary.is-disabled:active,
  //   .el-button--primary.is-disabled:focus,
  //   .el-button--primary.is-disabled:hover {
  //     background-color: #6e57c4;
  //     border-color: #6e57c4;
  //     color: #9983ef;
  //   }
  //   .el-button.is-disabled.is-plain,
  //   .el-button.is-disabled.is-plain:focus,
  //   .el-button.is-disabled.is-plain:hover {
  //     background-color: #6651F6;
  //     border-color: #FFFFFF;
  //     color: #FFFFFF;
  //   }
}

// .view {
//   .el-progress__text {
//     color: #fff !important;
//   }
// }
// .el-progress-circle__track {
//   stroke: #634cd7;
// }
</style>
