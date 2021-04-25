
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="recharge" />
        <div class="rightCon box">
          <div class="extract recharge">
            <div class="title">{{$t('message.我要充币')}}</div>
            <div class="cons">
              <div class="extForm">
                <div>BXB{{$t('message.充币地址')}}：</div>
                <div class="formbody">
                  <el-input v-model="walletdatas.addr" readonly></el-input>
                  <div class="formtool">
                    <el-button type="primary" round size="mini" @click="copyUrl">{{$t('message.复制')}}</el-button>
                    <el-popover placement="top-start" trigger="hover">
                      <el-button type="text" slot="reference">{{$t('message.二维码')}}</el-button>
                      <div v-show="walletdatas.addr" class="response">
                        <vue-qrcode 
                          :value="walletdatas.addr"
                          v-if="walletdatas.addr"
                          width="170"
                        />
                      </div>
                    </el-popover>
                  </div>
                </div>
                
              </div>
              <div class="historyList">
                <h2>{{$t('message.充币历史记录')}}</h2>
                <i-table :columns="columns" width="100%" :data="historyData" :no-data-text="$t('message.暂无数据')"></i-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import Menulist from "~/pages/_lang/user/menulist";
import VueQrcode from "vue-qrcode";
export default {
  name: "recharge",
  middleware: "userAuth",
  data() {
    let validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.请输入提币地址')));
      } else {
        callback();
      }
    };
    let validatePass2 = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('message.请输入提币数量')));
      } else {
        callback();
      }
    };
    return {
      verShow: true,
      timer: 60,
      loading: false,
      ruleForm: {
        address: "0xb05490eab058725092063f9cc043b6b0c8c770e4",
      },
      walletdatas: {
        addr: this.$store.state.wallet.addr,
        amount: "",
        frozen: "",
        key: "",
        mining: "",
        yesterday: "",
      },
      historyData: [],
      columns: [
        {
          title: this.$t('message.时间'),
          key: "timestamp",
          width: "220",
        },
        {
          title: this.$t('message.数量'),
          key: "amount",
          width: "100",
        },
        {
          title: this.$t('message.地址'),
          key: "dest",
        },
        {
          title: this.$t('message.状态'),
          key: "status",
          width: "90",
           render: (h, params) => {
            return h('span',params.row.status==0?this.$t('message.审核中'):params.row.status==1?this.$t('message.进行中'):params.row.status==2?this.$t('message.成功'):this.$t('message.失败'))
          }
        },
      ],
    };
  },
  created() {},
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // VeLine,
    Menulist,
    VueQrcode
  },
  methods: {
    getMag(msg) {},
    setLang(msg) {},
    successTip(msg) {
      this.$notify({
        type: "success",
        message: msg,
      });
    },
    errorTip(msg) {
      this.$notify.error({
        title: "error",
        message: msg,
      });
    },
    copyUrl() {
      const input = document.createElement("input");
      document.body.appendChild(input);
      input.setAttribute("value", this.walletdatas.addr);
      input.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.successTip("复制成功");
      }
      document.body.removeChild(input);
    },
    loadData() {
      if (this.walletdatas.addr) return false;
      this.loading = true;
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .get("account/wallet/", {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken,
          },
        })
        .then(({ data }) => {
          this.walletdatas = data.data;
          this.$store.commit("setWallet", data.data);
          console.log(this.walletdatas.addr);
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        });
    },
    loadHistory() {
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .get("account/transaction/?action=0&t="+this.$store.state.newtime, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken,
          },
        })
        .then(({ data }) => {
          this.historyData = data.data.results;
        });
    },
  },
  mounted() {
    this.loadData();
    this.loadHistory();
  },
};
</script>
<style lang="scss" scoped>
@import "~/pages/_lang/user/user.scss";
.extractHead {
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  padding: 0 20px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  .view {
    min-width: 140px;
    margin-right: 40px;
    .el-icon-info {
      margin-left: 6px;
    }
    div {
      font-size: 30px;
    }
  }
}
.recharge {
  .extForm {
    .el-input {
      margin: 10px 0;
    }
  }
}
.extForm {
  padding: 0 20px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eaeaea;
  .formbody{
    position: relative;
    .el-input{
      position: relative;
      z-index: 1;
    }
    .formtool{
      position:absolute;
      right: 10px;
      top: 10px;
      z-index: 2;
    }
    
  }
  .el-form-item__label {
    float: none;
  }
  .el-input {
    width: 100%;
  }
  .countTip {
    text-align: right;
    color: #898c9e;
  }
}
</style>
<style lang="scss">
.el-popover{
  padding: 0px;
}
.user {
  .ivu-table-wrapper {
    border: none;
    .ivu-table {
      th {
        background: none !important;
      }
      th,
      td {
        border: none;
        height: 38px;
        font-size: 14px;
      }
      &::before,
      &::after {
        display: none;
      }
    }
  }
}
</style>
