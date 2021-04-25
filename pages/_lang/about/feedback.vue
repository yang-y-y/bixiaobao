<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="feedback margin">
      <div class="container">
        <div class="top flex">
          <h3>{{$t('message.问题反馈')}}</h3>
        </div>
        <div class="container_content" v-show="this.show == '0'">
          <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm">
            <el-form-item prop="textareaVal">
              <div class="textarea_title">{{$t('message.请输入您的问题')}}</div>
              <el-input
                type="textarea"
                v-model="ruleForm.textareaVal"
                maxlength="200"
                showWordLimit
                resize="none"
              ></el-input>
            </el-form-item>
            <el-form-item prop="inputVal">
              <div class="textarea_title">{{$t('message.联系方式')}}</div>
              <el-input v-model="ruleForm.inputVal" :placeholder="$t('message.手机号/微信号/邮箱')"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">{{$t('message.提交')}}</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div class="container_content" v-show="this.show == '1'">
          <div class="Center">
            <div class="success-tip">
              <img src="@/assets/right-arrow.png" alt />
              <p>{{$t('message.非常感谢')}}</p>
              <p>{{$t('message.我们已经收到了您的反馈')}}</p>
              <el-button type="primary" @click="handleGoBack()">{{$t('message.返回')}}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      titleTemplate: this.$t("message.问题反馈"),
      meta: [
        {
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("news.keywords")
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("news.description")
        }
      ]
    };
  },
  name: "Feedback",
  data() {
    var checkTextareaVal = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t('message.内容不能为空')));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t('message.请输入联系方式')));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        textareaVal: "",
        inputVal: ""
      },
      rules: {
        textareaVal: [{ validator: checkTextareaVal, trigger: "blur" }],
        inputVal: [{ validator: validatePass, trigger: "blur" }]
      },
      show: 0
    };
  },
  created() {},
  components: {
  },
  methods: {
    setLang(msg) {},
    loadData(id) {},
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .post("account/suggest/", {
              content: this.ruleForm.textareaVal,
              contact: this.ruleForm.inputVal
            })
            .then(({ data }) => {
              this.show = 1;
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleGoBack(){
      let routeUrl = this.$router.resolve({
        path: "/"
      });
      window.open(routeUrl.href, "_self");
    }
  },
  mounted() {}
};
</script>
<style lang="scss">
.feedback {
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
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 0 30px;
    .top {
      border-bottom: 1px solid #e9e9e9;
      padding-top: 35px;
      padding-bottom: 14px;
      h3 {
        font-size: 16px;
        margin-left: 15px;
        color: #e95515;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          width: 100%;
          background: #e95515;
          height: 4px;
          bottom: -60%;
          left: 0;
        }
      }
    }
    .container_content {
      padding: 15px 20px 0 20px;
      .textarea_title {
        font-size: 14px;
        padding-bottom: 6px;
        color: #242735;
        padding-top: 20px;
      }
      .el-textarea__inner {
        min-height: 300px !important;
        border-radius: 2px;
      }
      .el-input__inner {
        width: 300px !important;
        border-radius: 2px;
      }
      .el-button {
        margin-top: 30px;
        background: #5480d8;
        width: 100px;
        border-color: #5480d8;
      }
      .el-form-item__content {
        margin-left: 0 !important;
      }
      .success-tip {
        padding-top: 120px;
        text-align: center;
        img{
          width: 40px;
        }
        p{
          font-size: 16px;
          color: #50546A;
          line-height: 26px;
        }
      }
    }
  }
}
</style>