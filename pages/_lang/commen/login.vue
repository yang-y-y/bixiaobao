<template>
    <div>
        <el-dialog title="" :visible.sync="$store.state.isShow" center :close-on-click-modal="false"  :before-close="handleClose" class="Mydialog">
            <div v-show="!innerVisible" style="text-align:center" class="loginLogo"><img v-if="$store.state.locale === 'cn'" src="~/assets/logo.png" width="166"/> <img v-else src="~/assets/enLOGO@2x.png" width="166"/></div>
            <el-form v-show="!register&&!innerVisible&&!forget&&$store.state.type!='1'" :model="loginRuleForm" status-icon :rules="loginRules" ref="loginRuleForm" class="ruleForm" >
                 <el-form-item :label="$t('message.手机号码')" prop="username" class="telPhone">
                    <div class="AreaCode">
                       <el-select v-model="inArealist" placeholder="请选择">
                        <el-option
                          v-for="item in areaList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                           <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                      </el-select>
                    </div>
                    <div class="PhoneNumber">
                      <el-input  v-model="loginRuleForm.username" onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" :clearable='true' :maxlength='11'></el-input>
                    </div>
                    
                </el-form-item>
                <el-form-item :label="$t('message.密码')" prop="password">
                    <el-input type="password" v-model="loginRuleForm.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="loginsubmitForm('loginRuleForm')" class="submitBtn" :loading="onPost" >{{$t('message.登录')}}</el-button>
                    <!-- <div>
                      <el-checkbox label="保持登录状态" name="type" v-model="checked" ></el-checkbox>
                    </div> -->
                </el-form-item>
                <el-form-item>
                  <div class="logft">
                    <div> {{$t('message.还没有账号')}}，<a  @click="register=true">{{$t('message.注册新账号')}}</a></div>
                     {{$t('message.忘记了密码')}}，<a  @click="handelForget">{{$t('message.密码找回')}}</a>
                  </div>
                </el-form-item>
                
            </el-form>
            <!-- 注册 -->
            <el-form v-show="register||$store.state.type=='1'&&!innerVisible&&!forget" :model="registerRuleForm" status-icon :rules="registerRules" ref="registerRuleForm" class="ruleForm" autocomplete="off">
                <el-form-item :label="$t('message.手机号码')" prop="username" class="telPhone">
                    <div class="AreaCode">
                       <el-select v-model="inArealist" placeholder="请选择" style="background:none">
                        <el-option
                          v-for="item in areaList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                           <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                      </el-select>
                    </div>
                    <div class="PhoneNumber">
                      <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" autocomplete="on" v-model="registerRuleForm.username" :clearable='true' :maxlength='11'></el-input>
                    </div>
                </el-form-item>
                <el-form-item :label="$t('message.密码')" prop="password">
                    <el-input  v-model="registerRuleForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.确认密码')" prop="checkPass">
                    <el-input  v-model="registerRuleForm.checkPass" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.验证码')" prop="code" class="codeCon">
                    <el-input  v-model="registerRuleForm.code" autocomplete="new-password"></el-input>
                     <el-button type="primary" v-show="verShow" @click="getVerify(registerRuleForm.username,'register')">{{$t('message.获取验证码')}}</el-button>
                     <el-button type="primary" v-show="!verShow">{{timer}}</el-button>
                </el-form-item>
                <el-form-item :label="$t('message.邀请码(选填)')" prop="inviteCode">
                    <el-input v-model="registerRuleForm.inviteCode" :placeholder="$t('message.邀请码(选填)')"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submitBtn" @click="registerSubmitForm('registerRuleForm')" :loading="onPostRegister">{{$t('message.注册')}}</el-button>
                    <div v-if="$store.state.locale === 'kr'">
                       <el-checkbox label="" name="type" v-model="checkedB" ></el-checkbox>
                      <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>{{$t('message.我同意')}} 
                    </div>
                    <div v-else>
                       <el-checkbox label="" name="type" v-model="checkedB" ></el-checkbox>
                      {{$t('message.我同意')}} <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>  
                    </div>
                </el-form-item>
                <el-form-item>
                  <div class="logft">
                    {{$t('message.已有账号')}}<a  @click="changeForm('login',0)">{{$t('message.登录')}}</a>
                  </div>
                </el-form-item>
            </el-form>
            <!-- 密码找回 -->
            <el-form v-show="!register&&!innerVisible&&forget" :model="forgetFrom" status-icon :rules="forgetRules" ref="forgetFrom" class="ruleForm" autocomplete="off">
                <el-form-item :label="$t('message.手机号码')" prop="username" class="telPhone">
                    <div class="AreaCode">
                       <el-select v-model="inArealist" placeholder="请选择">
                        <el-option
                          v-for="item in areaList"
                          :key="item.value"
                          :label="item.value"
                          :value="item.value">
                           <span style="float: left">{{ item.label }}</span>
      <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
                        </el-option>
                      </el-select>
                    </div>
                    <div class="PhoneNumber">
                      <el-input onkeyup="this.value = this.value.replace(/[^\d.]/g,'');" v-model="forgetFrom.username" autocomplete="on" :clearable='true' :maxlength='11'></el-input>
                    </div>
                    
                </el-form-item>
                 <el-form-item :label="$t('message.验证码')" prop="code" class="codeCon">
                    <el-input v-model="forgetFrom.code" autocomplete="new-password"></el-input>
                     <el-button type="primary" v-show="verShow" @click="getVerify(forgetFrom.username,'reset')">{{$t('message.获取验证码')}}</el-button>
                     <el-button type="primary" v-show="!verShow">{{timer}}</el-button>
                     
                </el-form-item>
                <el-form-item :label="$t('message.密码')" prop="password">
                    <el-input  v-model="forgetFrom.password" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.确认密码')" prop="checkPass">
                    <el-input  v-model="forgetFrom.checkPass" autocomplete="off" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="submitBtn" @click="forgetSubmitForm('forgetFrom')" :loading="onPost">{{$t('message.密码找回')}}</el-button>
                    <div v-if="$store.state.locale === 'kr'">
                       <el-checkbox label="" name="type" v-model="checkedB" ></el-checkbox>
                      <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>{{$t('message.我同意')}} 
                    </div>
                    <div v-else>
                       <el-checkbox label="" name="type" v-model="checkedB" ></el-checkbox>
                      {{$t('message.我同意')}} <a :href="'/'+$store.state.locale+'/about/agreement/'" target="_blank">{{$t('message.《用户协议》')}}</a>{{$t('message.和')}}<a :href="'/'+$store.state.locale+'/about/privacy/'" target="_blank">{{$t('message.《隐私协议》')}}</a>  
                    </div>
                </el-form-item>
                <el-form-item>
                  <div class="logft">
                    {{$t('message.已有账号')}}<a  @click="forget=false">{{$t('message.登录')}}</a>
                  </div>
                </el-form-item>

            </el-form>
            <div class="successTip" v-show="innerVisible">
                <i class="el-icon-success" style="font-size:40px;color:#4CBB89"></i>
                <h3>{{$t('message.恭喜您注册成功')}}</h3>
                <el-button type="primary" class="submitBtn" @click="handleClose">关闭</el-button>
            </div>
        </el-dialog>
       
    </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
export default {
    name:"login",
    data(){
        var checkName = (rule, value, callback) => {
        if (!value) {
          return callback(new Error(this.$t('message.请填写手机号码')));
        }else if(this.inArealist=='+86'&&!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
          callback(new Error(this.$t('message.手机号码有误')));
        }else if(this.inArealist=='+82'&&!(/^0[71](?:\d{8,9})$/.test(value))){
          callback(new Error(this.$t('message.手机号码有误')));
        }else{
         callback();
        }
       
      };
      var validatePass = (rule, value, callback) => {
        if (!value) {
          callback(new Error(this.$t('message.请输入密码')));
        } else if(value.length < 6){
          callback(new Error('密码太短了'));
        }else{
         callback();
        }
      };
       var validatePass2 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('message.请再次输入密码')));
        } else if (value !== this.registerRuleForm.password) {
          callback(new Error(this.$t('message.两次输入密码不一致')+'!'));
        } else {
          callback();
        }
      };
      var validatePass3 = (rule, value, callback) => {
        if (value === '') {
          callback(new Error(this.$t('message.请再次输入密码')));
        } else if (value !== this.forgetFrom.password) {
          callback(new Error(this.$t('message.两次输入密码不一致')+'!'));
        } else {
          callback();
        }
      };
      var codeNumber =(rule, value, callback) => {
         if (!value) {
          return callback(new Error(this.$t('message.请填写验证码')));
        }else{
         callback();
        }
      };
        return{
            isShow:this.$store.state.isShow,
            register:false,
            sucess:false,
            error:false,
            checked: true,
            checkedB:false,//协议勾选状态
            innerVisible:false,
            verShow:true,//验证码状态
            timer:60,
            onPost:false,//提交状态
            onPostRegister:false,//注册状态
            loginRuleForm: {
                password: '',
                username: ''
            },
            loginRules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                username: [
                    { validator: checkName, trigger: 'blur' }
                ]
            },
            registerRuleForm:{
              password: '',
              username: '',
              checkPass: '',
              code:'',
              inviteCode:''
            },
            registerRules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass2, trigger: 'blur' }
                ],
                username: [
                    { validator: checkName, trigger: 'blur' }
                ],
                code:[
                  { validator: codeNumber, trigger: 'blur' }
                ]
            },
            forgetFrom:{
               password: '',
               username: '',
               checkPass: '',
               code:''
            },
            forgetRules: {
                password: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                checkPass: [
                  { validator: validatePass3, trigger: 'blur' }
                ],
                username: [
                    { validator: checkName, trigger: 'blur' }
                ],
                code:[
                  { validator: codeNumber, trigger: 'blur' }
                ]
            },
            forget:false,
            areaList:[
              {
                value: '+86',
                label: '中国'
              },
              {
                value: '+82',
                label: '韩国'
              }
            ],
            inArealist:'+86'//当前区号
        }
        
    },
    created(){
      // if(this.$route.query.invite){
      //   this.registerRuleForm.inviteCode = this.$route.query.invite;
      //   this.$router.push('/'+this.$store.state.locale+"/register?invite="+this.$route.query.invite)
      // }else if(this.$route.query.type&&this.$route.query.type=='1'){
      //   this.register = true;
      //   this.$store.commit("openDlog", true);
      // }else if(this.$route.query.type&&this.$route.query.type=='0'){
      //    this.$store.commit("openDlog", true);
      // }
    },
    methods: {
      successTip(msg){
        this.$notify({
          type: 'success',
          message: msg
        });
        this.$store.commit("openDlog", false);
      },
      errorTip(msg){
        this.$notify.error({
          message: msg
        });
      },
      handleClose(done){
          this.$store.commit("openDlog", false);
          this.innerVisible = false;
          this.forget = false;
          this.register= false;
      },
      handelForget(){
        this.forget = true
      },
      changeForm(value,type){
        if(value=='login'){
           this.register = false;
           this.$store.commit("loginType", type);
        }
      },
      loginsubmitForm(formName) {
        this.onPost=true;
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let lang =  '';
              if(this.$store.state.locale == 'cn'){
                lang = 'zh_CN'
              }else{
                lang = 'ko_KR'
              }
              
              let dataRe = {
                password: this.loginRuleForm.password,
                username: this.inArealist+this.loginRuleForm.username,
                language: lang,
                t:this.$store.state.newtime
              }
            this.$axios.$post('account/login/',dataRe).then((result) => {
              // 如果正确的返回了token，则将token写入cookie
                if(result.status == 1){
                  Cookie.set('token', result.data.token)
                  //写入状态管理器
                  this.$store.commit('setUserinfo', result.data.profile);
                  this.$store.commit('setToken', result.data.token)
                  this.successTip(this.$t('message.登录成功'))
                  this.onPost=false; //提交状态
                  this.$router.push('/'+this.$store.state.locale+'/user/product/')
                }else{
                   this.errorTip(this.$t('message.账号或密码错误'))
                   this.onPost=false; //提交状态
                }
            })
            // .catch(function (result) {
            //   this.errorTip()
            // })
          } else {
            if(!this.loginRuleForm.username){
              this.errorTip(this.$t('message.请填写手机号码'))
            }else if(!this.loginRuleForm.password){
              this.errorTip(this.$t('message.请填写登录密码'))
            }
            this.onPost=false; //提交状态
            return false;
          }
        });
      },
      registerSubmitForm(formName){
        this.onPostRegister=true; //注册提交状态
        let codeToken =  this.$cookies.get('task') //获取验证码序列号
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let lang =  '';
              if(this.$store.state.locale == 'cn'){
                lang = 'zh_CN'
              }else{
                lang = 'ko_KR'
              }
             let dataRe = {
                password: this.registerRuleForm.password,
                username: this.inArealist+this.registerRuleForm.username,
                language: lang,
                verify:this.registerRuleForm.code,
                serial:codeToken,
                invite:this.registerRuleForm.inviteCode
            }
            if(!this.registerRuleForm.inviteCode){
               dataRe = {
                  password: this.registerRuleForm.password,
                  username: this.inArealist+this.registerRuleForm.username,
                  language: lang,
                  verify:this.registerRuleForm.code,
                  serial:codeToken
              }
            }

            if(!codeToken) {
              this.errorTip('验证码不正确，请先获取验证码');  
              this.onPostRegister=false; //注册提交状态
              return false;
            }
            if(!this.checkedB) {
              this.errorTip(this.$t('message.请阅读并同意隐私政策'));
              this.onPostRegister=false; //注册提交状态
              return false;
            }
            this.$axios.$post('account/register/',dataRe
              // ,{headers: {'X-CSRFToken': this.$cookies.get('csrftoken')}}
            ).then((result) => {
              if(result.status=='1'){
                this.innerVisible = true;
                this.resetForm(formName);
                this.register = false;
                this.onPostRegister=false; //注册提交状态
                let _this=this;
                setTimeout(function(){
                  _this.$cookies.remove('task');
                  Cookie.set('token', result.data.token)
                  //写入状态管理器
                  _this.$store.commit('setUserinfo', result.data.profile);
                  _this.$store.commit('setToken', result.data.token)
                  _this.$router.push('/'+_this.$store.state.locale+'/user/product/')
                },300)
              }else if(result.status=='100'){
                this.errorTip(this.$t('message.用户已存在'));
                this.onPostRegister=false; //注册提交状态
              }else if(result.status=='101'){
                this.errorTip(this.$t('message.验证码有误'));
                this.onPostRegister=false; //注册提交状态
              }else{
                this.errorTip(this.$t('message.出错啦，请稍后再试'));
                this.onPostRegister=false; //注册提交状态
              }
                
            })
          } else {
            this.errorTip(this.$t('message.信息填写不完整'))
            this.onPost=false; //提交状态
            this.onPostRegister= false;
            return false;
          }
        });
      },
      forgetSubmitForm(formName){
        //忘记密码表单
        this.onPost=true;
        let codeToken =  this.$cookies.get('task') //获取验证码序列号
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let lang =  '';
              if(this.$store.state.locale == 'cn'){
                lang = 'zh_CN'
              }else{
                lang = 'ko_KR'
              }
             let dataRe = {
                username: this.inArealist+this.forgetFrom.username,
                password: this.forgetFrom.password,
                confirm:this.forgetFrom.checkPass,
                verify:this.forgetFrom.code,
                serial:codeToken
            }
            if(!codeToken) {
              this.errorTip('验证码不正确，请先获取验证码');  
              this.onPost=false; //提交状态
              return false;
            }
            if(!this.checkedB) {
              this.errorTip(this.$t('message.请阅读并同意隐私政策'));
              this.onPost=false; //提交状态
              return false;
            }
            this.$axios.$post('account/passwd/reset/',dataRe).then((result) => {
              if(result.status=='101'){
                this.onPost=false; //提交状态
                this.errorTip(this.$t('message.验证码有误'));
              }else if(result.status=='100'){
                this.onPost=false; //提交状态
                this.errorTip('用户不存在');
              }else{
                this.resetForm(formName);
                this.forget=false;
                this.onPost=false; //提交状态
                this.$cookies.remove('task');
              }
              
            })
          } else {
            console.log('error submit!!');
            this.onPost=false; //提交状态
            return false;
          }
        });
        
      },
      resetForm(formName) {
        //重置
        this.$refs[formName].resetFields();
      },
      getVerify(value,type){
        //获取验证码
         let timestamp = new Date().getTime();
        let newtime = (timestamp/10).toFixed(0)
        if(!value||!type) return this.errorTip(this.$t('message.手机号码不能为空'));
        if(this.inArealist=='+86'&&!(/^1(3|4|5|6|7|8|9)\d{9}$/.test(value))){
          return this.errorTip(this.$t('message.手机号码有误'));
        }else if(this.inArealist=='+82'&&!(/^0[71](?:\d{8,9})$/.test(value))){
          return this.errorTip(this.$t('message.手机号码有误'));
        }
        this.verShow = false;
        let auth_timer = setInterval(()=>{
            this.timer--;
            if(this.timer<=0){
                this.verShow = true;
                this.timer = 60;
                clearInterval(auth_timer)
            }
        },1000)
        this.$axios.$get('account/verify/code/',{params:{
          phone:this.inArealist+value,
          action:type,
          t:newtime
        }}).then((result) => {
            if(result.status ==1){
                Cookie.set("task", result.data.task);
            }else{
                this.errorTip(result.msg)
                this.verShow = true;
                this.timer = 60;
            }
        })
          
      },
    }
}
</script>
<style lang="scss" scoped>
.loginLogo{
  margin-bottom: 30px;
}
.ruleForm{
  padding: 0 70px;
}
.submitBtn{
  width: 100%;
}
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
  .logft{
    padding-top: 30px;
    line-height: 26px;
    text-align: center;
  }
</style>
<style lang="scss">
.codeCon{
  .el-form-item__content{
 display: flex;
  justify-content: left;
  align-items: center;
    .el-button--primary{
      margin-left: 10px;
    }
  }
 
}
.Mydialog{
  .el-form-item{
    margin-bottom: 18px;
    .el-input{
    width: 100%;
  }
  }
.el-form-item__label{
  line-height: 30px !important;
}

}

.telPhone{
   .el-form-item__content{
  display: flex;
  justify-content: left;
  align-items: center;
  position: relative;
  .AreaCode{
    position: absolute;
    left: 1px;
    top: 1px;
    height: 38px;
    line-height: 38px;
    z-index: 2;
    width: 35%;
    .el-input__inner{
      border: none;
      height: 38px;
  background: none !important;

    }
    .el-input__suffix{
     .el-input__validateIcon{
        display: none !important;
      }
    }
    .el-select-dropdown__item{
      padding: 0 15px;
    }
  }
  .PhoneNumber{
    width: 100%;
    .el-input__inner{
      padding-left: 35%;
    }
  }
   
  }
}
.el-input{
  width: 100%;
}
  .el-dialog{
      width: 450px !important;
      .el-form-item__label{
          float:none;
      }
      .el-form-item__content{
          margin-left: 0 !important;
      }
  }
</style>