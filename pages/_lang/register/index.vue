<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="register margin">
      <div class="container box">
        <div class="banner">
          <div class="datas">
            <p>{{$t('message.即刻开启免费挖矿')}}</p>
            <p>{{$t('message.百万BXB等你来拿')}}</p>
          </div>
          <div class="videoCon">
            <video id="my-player" ref="myPlayer" muted loop autoplay poster="封面">
              <source :src="require('~/assets/register.mp4')" type="video/mp4" />
            </video>
          </div>
        </div>
        <div class="cons">
          <el-form
            :model="registerRuleForm"
            status-icon
            :rules="registerRules"
            ref="registerRuleForm"
            class="ruleForm"
          >
            <el-form-item :label="$t('message.手机号码')" prop="username" class="telPhone">
              <div class="AreaCode">
                <el-select v-model="inArealist" placeholder="请选择">
                  <el-option
                    v-for="item in areaList"
                    :key="item.value"
                    :label="item.value"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                  </el-option>
                </el-select>
              </div>
              <div class="PhoneNumber">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  v-model="registerRuleForm.username"
                  :clearable="true"
                  :maxlength="11"
                ></el-input>
              </div>
            </el-form-item>
            <el-form-item :label="$t('message.验证码')" prop="code" class="codeCon">
              <el-input v-model="registerRuleForm.code"></el-input>
              <el-button
                type="primary"
                v-if="verShow"
                @click="getVerify(registerRuleForm.username,'register')"
              >{{$t('message.获取验证码')}}</el-button>
              <el-button type="primary" v-else>{{timer}}</el-button>
            </el-form-item>
            <el-form-item :label="$t('message.密码')" prop="password">
              <el-input
                type="password"
                v-model="registerRuleForm.password"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.确认密码')" prop="checkPass">
              <el-input
                type="password"
                v-model="registerRuleForm.checkPass"
                autocomplete="off"
                show-password
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('message.邀请码(选填)')" prop="inviteCode">
              <el-input
                type="text"
                v-model="registerRuleForm.inviteCode"
                autocomplete="off"
                :placeholder="$t('message.邀请码(选填)')"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="primary"
                class="submitBtn"
                @click="registerSubmitForm('registerRuleForm')"
                :loading="onPostRegister"
              >{{$t('message.注册')}}</el-button>
              <div v-if="$store.state.locale === 'kr'">
                  <el-checkbox label="" name="type" v-model="checkedB" ></el-checkbox>
                <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>{{$t('message.我同意')}} 
              </div>
              <div v-else>
                <el-checkbox label name="type" v-model="checkedB"></el-checkbox>
                {{$t('message.我同意')}}
                 <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>
              </div>
            </el-form-item>
            <el-form-item>
              <div class="logft">
                {{$t('message.已有账号')}}
                <a @click="loginIn()">{{$t('message.登录')}}</a>
              </div>
            </el-form-item>
          </el-form>
          <!-- <el-dialog
            title="提示"
            :visible.sync="innerVisible"
            center>
            <div class="successTip" v-show="innerVisible">
                <i class="el-icon-success" style="font-size:40px;color:#4CBB89"></i>
                <h3>{{$t('message.恭喜您注册成功')}}</h3>
                <el-button type="primary" class="submitBtn" @click="handleClose">关闭</el-button>
            </div>
          </el-dialog> -->
           
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import Videojs from "video.js";
export default {
  name: "register",
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("message.请填写手机号码")));
      } else if (
        this.inArealist == "+86" &&
        !/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)
      ) {
        callback(new Error(this.$t("message.手机号码有误")));
      } else if (
        this.inArealist == "+82" &&
        !/^0[71](?:\d{8,9})$/.test(value)
      ) {
        callback(new Error(this.$t("message.手机号码有误")));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("message.请输入密码")));
      } else if (value.length < 6) {
        callback(new Error("密码太短了"));
      } else {
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.请再次输入密码")));
      } else if (value !== this.registerRuleForm.password) {
        callback(new Error(this.$t("message.两次输入密码不一致") + "!"));
      } else {
        callback();
      }
    };
    var validatePass3 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error(this.$t("message.请再次输入密码")));
      } else if (value !== this.forgetFrom.password) {
        callback(new Error(this.$t("message.两次输入密码不一致") + "!"));
      } else {
        callback();
      }
    };
    var codeNumber = (rule, value, callback) => {
      if (!value) {
        return callback(new Error(this.$t("message.请填写验证码")));
      } else {
        callback();
      }
    };
    return {
      timer: 60,
      verShow: true,
      checkedB: false, //协议勾选状态
      areaList: [
        {
          value: "+86",
          label: "中国",
        },
        {
          value: "+82",
          label: "韩国",
        },
      ],
      inArealist: "+86", //当前区号
      onPostRegister: false,
      innerVisible:true,
      registerRuleForm: {
        password: "",
        username: "",
        checkPass: "",
        code: "",
        inviteCode: "",
      },
      registerRules: {
        password: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        username: [{ validator: checkName, trigger: "blur" }],
        code: [{ validator: codeNumber, trigger: "blur" }],
      },
    };
  },
  created() {
      if(this.$route.query.invite){
        this.registerRuleForm.inviteCode = this.$route.query.invite
      }
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // VeLine,
  },
  methods: {
    getMag(msg) {},
    setLang(msg) {},
    loginIn(){
        this.$store.commit("openDlog", true);
    },
    // handleClose(){
    //   this.handleClose = false;
      
    // },
    registerSubmitForm(formName) {
      this.onPostRegister = true; //注册提交状态
      let codeToken = this.$cookies.get("task"); //获取验证码序列号
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let lang = "";
          if (this.$store.state.locale == "cn") {
            lang = "zh_CN";
          } else {
            lang = "ko_KR";
          }
          let dataRe = {
            password: this.registerRuleForm.password,
            username: this.inArealist + this.registerRuleForm.username,
            language: lang,
            verify: this.registerRuleForm.code,
            serial: codeToken,
            invite: this.registerRuleForm.inviteCode,
          };
          if(!this.registerRuleForm.inviteCode){
               dataRe = {
                  password: this.registerRuleForm.password,
                  username: this.inArealist+this.registerRuleForm.username,
                  language: lang,
                  verify:this.registerRuleForm.code,
                  serial:codeToken
              }
            }

          if (!codeToken) {
            this.errorTip("验证码不正确，请先获取验证码");
            this.onPostRegister = false; //注册提交状态
            return false;
          }
          if (!this.checkedB) {
            this.errorTip(this.$t("message.请阅读并同意隐私政策"));
            this.onPostRegister = false; //注册提交状态
            return false;
          }
          this.$axios
            .$post(
              "account/register/",
              dataRe
              // ,{headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}}
            )
            .then((result) => {
              if (result.status == "1") {
                this.innerVisible = true;
                this.resetForm(formName);
                this.register = false;
                this.onPostRegister = false; //注册提交状态
                // this.$router.path('/?type=0');
                this.successTip(this.$t('message.恭喜您注册成功'))
                let _this = this;
                setTimeout(function () {
                  _this.$cookies.remove("task");
                  _this.$router.push('/'+_this.$store.state.locale+'/user/product/')
                   Cookie.set('token', result.data.token)
                  //写入状态管理器
                  _this.$store.commit('setUserinfo', result.data.profile);
                  _this.$store.commit('setToken', result.data.token)
                  console.log('1232132132132',Cookie.get('token'))
                }, 500);

              } else if (result.status == "100") {
                this.errorTip(this.$t("message.用户已存在"));
                this.onPostRegister = false; //注册提交状态
              } else if (result.status == "101") {
                this.errorTip(this.$t("message.验证码有误"));
                this.onPostRegister = false; //注册提交状态
              } else {
                this.errorTip(this.$t("message.出错啦，请稍后再试"));
                this.onPostRegister = false; //注册提交状态
              }
            });
        } else {
          this.errorTip(this.$t("message.信息填写不完整"));
          this.onPost = false; //提交状态
          this.onPostRegister = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      //重置
      this.$refs[formName].resetFields();
    },
    getVerify(value, type) {
      //获取验证码
       let timestamp = new Date().getTime();
        let newtime = (timestamp/10).toFixed(0)
      if (!value || !type)
        return this.errorTip(this.$t("message.手机号码不能为空"));
      if (this.inArealist == "+86" && !/^1(3|4|5|6|7|8|9)\d{9}$/.test(value)) {
        return this.errorTip(this.$t("message.手机号码有误"));
      } else if (
        this.inArealist == "+82" &&
        !/^0[71](?:\d{8,9})$/.test(value)
      ) {
        return this.errorTip(this.$t("message.手机号码有误"));
      }
      this.verShow = false;
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
            phone: this.inArealist + value,
            action: type,
            t:newtime
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
    successTip(msg) {
      this.$notify({
        type: "success",
        message: msg,
      });
      this.$store.commit("openDlog", false);
    },
    errorTip(msg) {
      this.$notify.error({
        message: msg,
      });
    },
  },
};
</script>
<style lang="scss" scoped>

.container {
  width: 960px;
  margin: 0 auto;
  min-height: 800px;
  overflow: hidden;
  .successTip{
  padding: 30px 70px;
  text-align: center;
  h3{
    padding-top: 25px;
  }
  .submitBtn{
    margin-top: 45px;
  }
}
  .banner {
    background: url("~@/assets/banner_register.png") no-repeat top;
    height: 347px;
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .datas {
      margin-left: 115px;
      color: #fff;
      text-shadow: 4px 4px 4px rgba($color: #000000, $alpha: 0.2);
      span {
        font-size: 56px;
        font-weight: bold;
        display: inline-block;
        line-height: 40px;
      }
      p {
        font-size: 30px;
        margin-bottom: 10px;
      }
      b {
        display: inline-block;
        border: 2px solid #fff;
        border-radius: 30px;
        height: 52px;
        line-height: 46px;
        padding: 0 20px;
        font-size: 20px;
      }
    }
    .videoCon {
      height: 347px;
      video {
        height: 100%;
        position: relative;
        z-index: 2;
      }
    }
  }
  .cons{
      padding: 50px 350px;
      .submitBtn{
          width: 100%;
      }
    
  }
}
</style>
<style lang="scss">
 .el-form-item__label{
         line-height: 28px;
     }
 .telPhone{
          .el-form-item__label{
              display: block;
                text-align: left;
                float: none;
          }
      }
.codeCon{
 .el-form-item__label{
       display: block;
                text-align: left;
                float: none;
  }
 
}

</style>