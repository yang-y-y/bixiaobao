
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="extract" onload="true" @loadData="loadData" />
        <div class="rightCon box">
          <div class="extract">
            <div class="title">{{$t('message.申请提币')}}</div>
            <div class="cons">
              <div class="extractHead">
                <div class="view">
                  {{$t('message.可提')}}BXB
                  <el-tooltip class="item" effect="dark" :content="$t('message.当前可提现的BXB数量')" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <div>{{(walletData.amount-walletData.frozen)|formatMoney(4)}}</div>
                </div>
                <div class="view">
                  {{$t('message.我的')}}BXB
                  <div>{{walletData.amount|formatMoney(4)}}</div>
                </div>
                <div class="view">
                  {{$t('message.冻结')}}BXB
                  <el-tooltip class="item" effect="dark" :content="$t('message.申请提币时,系统会暂时冻结您的BXB')" placement="top">
                    <i class="el-icon-info"></i>
                  </el-tooltip>
                  <div>{{walletData.frozen|formatMoney(4)}}</div>
                </div>
              </div>
              <div class="extForm">
                <el-form
                  :model="ruleForm"
                  ref="ruleForm"
                  :rules="rules"
                  label-position="left"
                  class="demo-ruleForm"
                >
                  <el-form-item :label="$t('message.提币地址')" prop="address">
                    <el-input v-model="ruleForm.address" :placeholder="$t('message.请输入您的ERC20地址,任何其它的提币地址都将无法找回')"></el-input>
                  </el-form-item>
                  <el-form-item :label="'BXB'+$t('message.数量')" prop="bxbCount">
                    <div class="countTip">{{$t('message.最少提币限额')}}：{{hldata.withdrawal_min|formatMoney}} {{$t('message.最多提币限额')}}：{{hldata.withdrawal_max|formatMoney}}</div>
                    <el-input
                      v-model.number="ruleForm.bxbCount"
                      autocomplete="off"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                    ></el-input>
                  </el-form-item>

                  <el-form-item>
                    <div>{{$t('message.手续费')}}：{{$store.state.userinfo.fee}} BXB</div>
                    <div>{{$t('message.实际到账数量')}}：{{revereBxb}} BXB</div>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('message.提币')}}</el-button>
                    <el-button @click="resetForm('ruleForm')">{{$t('message.重置')}}</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div class="historyList">
                <h2>{{$t('message.提币历史记录')}}</h2>
                <i-table :loading="loading" :columns="columns" width="100%" :data="historyData" :no-data-text="$t('message.暂无数据')"></i-table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menulist from "~/pages/_lang/user/menulist";
export default {
  name: "setting",
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
      }
      if (!Number.isInteger(value)) {
        callback(new Error('请输入整数'));
      }
      if (value < this.hldata.withdrawal_min) {
        callback(new Error(this.$t('message.最少提币限额')+this.hldata.withdrawal_min));
      }
      if (value > this.hldata.withdrawal_max) {
        callback(new Error(this.$t('message.最多提币限额')+this.hldata.withdrawal_max));
      } else {
        callback();
      }
     
    };
    return {
      verShow: true,
      timer: 60,
      loading: false,
      walletData: [],
      hldata:[],
      ruleForm: {
        address: "",
        bxbCount: 0,
      },
      rules: {
        address: [{ validator: validatePass, required: true, trigger: "blur" }],
        bxbCount: [
          { validator: validatePass2, required: true, trigger: "blur" },
          { type: "number", message: "提币数量必须为整数" },
        ],
      },
      historyData: [],
      columns: [
        {
          title: this.$t('message.时间'),
          key: "timestamp",
          width: "200",
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
          title: this.$t('message.订单'),
          key: "order",
        },
        {
          title: this.$t('message.状态'),
          key: "status",
          width: "130",
          render: (h, params) => {
            return h(
              "span",
              params.row.status == 0
                ? this.$t('message.审核中')
                : params.row.status == 1
                ? this.$t('message.进行中')
                : params.row.status == 2
                ? this.$t('message.完成')
                : this.$t('message.失败')
            );
          },
        },
      ],
    };
  },
  created() {},
  computed: {
    // 计算属性
    revereBxb: function () {
      let bxbCount = this.ruleForm.bxbCount;
      if (bxbCount >= this.$store.state.userinfo.fee) {
        return bxbCount - Number(this.$store.state.userinfo.fee);
      } else {
        return 0;
      }
    },
  },
  components: {
    // 组件的引用
    // VeLine,
    Menulist,
  },
  methods: {
    getMag(msg) {},
    setLang(msg) {},
    submitForm(formName) {
      let parmas = {
        addr: this.ruleForm.address,
        amount: this.ruleForm.bxbCount,
      };
      let cookieToken = this.$cookies.get("token");

      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$axios
            .post(
              "/account/withdrawal/?t=" + this.$store.state.newtime,
              parmas,
              {
                headers: {
                  Authorization: "BIXIAOBAO " + cookieToken,
                },
              }
            )
            .then(({ data }) => {
              if (data.status == "1") {
                this.successTip("成功", formName);
                let _this=this;
                setTimeout(function(){
                  _this.$router.go(0)
                },500)
              } else if (data.status == "109") {
                this.errorTip("可提数量不足");
              }
            })
            .catch((err) => {
              this.errorTip(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getVerify(value, type) {
      this.verShow = false;
      if (!value && !type) return false;
      let auth_timer = setInterval(() => {
        this.timer--;
        if (this.timer <= 0) {
          this.verShow = true;
          this.timer = 60;
          clearInterval(auth_timer);
        }
      }, 1000);
      this.$axios
        .$get("account/verify/code/", {
          params: {
            phone: value,
            action: type,
          },
        })
        .then((result) => {
          if (result.status == 1) {
            Cookie.set("task", result.data.task);
          } else {
            this.errorTip(result.msg);
            this.verShow = true;
            this.timer = 60;
          }
        });
    },
    successTip(msg, formName) {
      this.$notify({
        type: "success",
        message: msg,
      });
      this.resetForm(formName);
    },
    errorTip(msg) {
      this.$notify.error({
        title: "error",
        message: msg,
      });
    },
    loadData(data) {
      this.walletData = data;
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .get("account/transaction/?action=1&t=" + this.$store.state.newtime, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken,
          },
        })
        .then(({ data }) => {
          this.historyData = data.data.results;
        });
      this.$axios
        .get("account/withdrawal/?t=" + this.$store.state.newtime, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken,
          },
        })
        .then(({ data }) => {
          this.hldata = data.data
        });
    },
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
.extForm {
  padding: 0 20px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #eaeaea;
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
.historyList {
  h2 {
    margin-bottom: 20px;
    font-weight: 500;
    font-size: 16px;
  }
}
</style>
<style lang="scss">
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
