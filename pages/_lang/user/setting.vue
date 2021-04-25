
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="setting" />
        <div class="rightCon box">
          <div class="verifyMail">
            <div class="title">{{$t('message.账号安全')}}</div>
            <div class="cons">
              <el-form
                :model="setRuleForm"
                :rules="setRules"
                ref="setRuleForm"
                label-width="130px"
                class="demo-ruleForm"
              >
                <el-form-item :label="$t('message.手机号码')" prop="name">{{$store.state.userinfo.username}}</el-form-item>
                <el-form-item :label="$t('message.验证码')" prop="verify">
                  <el-input v-model="setRuleForm.verify"></el-input>
                  <el-button
                    type="text"
                    v-show="verShow"
                    @click="getVerify($store.state.userinfo.username,'change')"
                    :loading="loading"
                  >{{$t('message.获取验证码')}}</el-button>
                  <el-button type="text" v-show="!verShow" disabled>
                    <span>{{timer}}</span>
                  </el-button>
                </el-form-item>
                <el-form-item :label="$t('message.旧密码')" prop="oldpwd">
                  <el-input
                    type="password"
                    v-model="setRuleForm.oldpwd"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.新密码')" prop="newpwd">
                  <el-input
                    type="password"
                    v-model="setRuleForm.newpwd"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item :label="$t('message.确认新密码')" prop="confirm">
                  <el-input
                    type="password"
                    v-model="setRuleForm.confirm"
                    autocomplete="off"
                    show-password
                  ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFormSet('setRuleForm')">{{$t('message.修改')}}</el-button>
                  <el-button @click="resetForm('setRuleForm')">{{$t('message.重置')}}</el-button>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Menulist from '~/pages/_lang/user/menulist'
const Cookie = process.client ? require('js-cookie') : undefined
export default {
  name: "setting",
  middleware: 'userAuth',
  data() {
    let validatePass = (rule, value, callback) => {
        if (!value) {
        callback(new Error(this.$t('message.请输入密码')));
        } else if(value.length < 6){
        callback(new Error(this.$t('message.密码太短了')));
        }else{
        callback();
        }
    };
    let validatePass2 = (rule, value, callback) => {
        if (!value) {
        callback(new Error(this.$t('message.请再次输入密码')));
        } else if (value !== this.setRuleForm.newpwd) {
        callback(new Error(this.$t('message.两次输入密码不一致')));
        } else {
        callback();
        }
    };
    let checkCode = (rule, value, callback) => {
        if (!value) {
        callback(new Error(this.$t('message.请填写验证码')));
        } else {
        callback();
        }
    };
    return {
        verShow:true,
        timer:60,
        loading:false,
        setRuleForm:{
            oldpwd: '',
            newpwd: '',
            confirm: '',
            verify:''
        },
        setRules: {
            oldpwd: [
                { validator: validatePass,  required: true,trigger: 'blur' }
            ],
            newpwd: [
                { validator: validatePass,  required: true,trigger: 'blur' }
            ],
            confirm: [
                { validator: validatePass2,  required: true,trigger: 'blur' }
            ],
            verify: [
                { validator: checkCode,  required: true,trigger: 'blur' }
            ]
        },
    };
  },
  created() {},
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
    submitFormSet(formName) {
        let codeToken =  this.$cookies.get('task')
        let params = {
        oldpwd: this.setRuleForm.oldpwd,
        newpwd: this.setRuleForm.newpwd,
        confirm: this.setRuleForm.confirm,
        verify: this.setRuleForm.verify,
        serial: this.$cookies.get('task')
      };
        this.$refs[formName].validate((valid) => {
        if (valid) {
            this.$axios.$post('account/passwd/change/',
            params,{
            headers: {
                'Authorization': 'BIXIAOBAO '+this.$store.state.token
            }
        }).then((result) => {
          console.log(result)
                if(result.status ==1){
                    this.successTip(this.$t('message.密码修改成功'))
                    this.setRuleForm={
                        oldpwd: '',
                        newpwd: '',
                        confirm: '',
                        verify:'',
                        serial:''
                        }
                    // 退出登录
                    Cookie.remove('token')
                    this.$router.push({path:'/'});
                }else{  
                    this.errorTip(result.msg)
                }
            })
        } else {
            console.log('error submit!!');
            return false;
        }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    getVerify(value,type){
        this.verShow = false;
        if(!value&&!type) return false;
        let auth_timer = setInterval(()=>{
            this.timer--;
            if(this.timer<=0){
                this.verShow = true;
                this.timer = 60;
                clearInterval(auth_timer)
            }
        },1000)
        this.$axios.$get('account/verify/code/',{params:{
            phone:value,
            action:type
        }}).then((result) => {
          console.log(result)
            if(result.status ==1){
                Cookie.set("task", result.data.task);
            }else{
                this.errorTip(result.msg)
                this.verShow = true;
                this.timer = 60;
            }
        })
    },
    successTip(msg){
        this.$notify({
            type: 'success',
            message: msg
        });
    },
    errorTip(msg){
        this.$notify.error({
            title: 'error',
            message: msg
        });
    }

  }
    
};
</script>
<style lang="scss" scoped>
   @import "~/pages/_lang/user/user.scss";

</style>
<style lang='scss'>
    .el-input{
        width: auto;
    }
</style>