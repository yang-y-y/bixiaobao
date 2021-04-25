<template>
  <div>
    <Header />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="mycenter" />
        <div class="rightCon box">
          <div class="datail information">
            <div class="cons">
              <dl>
                <dt>
                  <img src="~/assets/headimg.png" alt />
                </dt>
                <dd>
                  <ul>
                    <li>
                      <span>USERID:</span>
                      {{$store.state.userinfo.userid||''}}
                    </li>
                    <li>
                      <span>{{$t('message.注册时间')}}:</span>
                      {{$store.state.userinfo.date_created||''}}
                    </li>
                    <li>
                      <span>{{$t('message.最后登录')}}:</span>
                      {{($store.state.userinfo.lastlogin||'')|changeFormatDate}}
                    </li>
                  </ul>
                </dd>
              </dl>
              <div class="formCon">
                <el-form
                  :model="ruleForm"
                  :rules="rules"
                  ref="ruleForm"
                  label-width="100px"
                  class="demo-ruleForm"
                >
                  <el-form-item :label="$t('message.昵称')" prop="name">
                    <el-input v-model="ruleForm.name" :placeholder="$store.state.userinfo.nickname||''"></el-input>
                  </el-form-item>
                  <!-- <el-form-item :label="$t('message.性别')" prop="resource">
                    <el-radio-group v-model="ruleForm.resource">
                      <el-radio label="1">{{$t('message.男')}}</el-radio>
                      <el-radio label="2">{{$t('message.女')}}</el-radio>
                    </el-radio-group>
                  </el-form-item> -->
                  
                  <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">{{$t('message.修改')}}</el-button>
                    <el-button @click="resetForm('ruleForm')">{{$t('message.重置')}}</el-button>
                  </el-form-item>
                </el-form>
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
// import options from "~/plugins/country-data";
export default {
  name: "user",
  middleware: "userAuth",
  data() {
    let currencySafe = (rule, value, callback) => {
      console.log(value);
      if (!value) {
        callback(new Error("请选择国家"));
      } else {
        callback();
      }
    };

    return {
      loading: false,
      verShow: true,
      ruleForm: {
        name:this.$store.state.userinfo.nickname,
        resource: "1"
      },
      rules: {
        name: [
          {
            message: this.$t("message.请输入昵称"),
            trigger: "blur",
            required: true
          },
          { min: 3, max: 20, message: "长度在 3 到 20 个字符", trigger: "blur" }
        ],
        resource: [
          { message: "请选择性别", trigger: "change", required: false }
        ]
      },
      // options: options, //存放城市数据
      // sex: "1"
    };
  },
  created() {
    // 实例被创建之后执行代码
    this.currency = this.$store.state.currency;
    // var str="aporhjbmvncjrovmbxvzzoeclolmqlpvsdffgfgf";
    // function ss(a,b){
    //     var fanhui="";
    //     for(var i=0;i<b;i++){
    //         var aa= Math.floor(Math.random()*(str.length));
    //         fanhui+= str.substring(aa,aa+1);
    //     }
    //     console.log(fanhui);
    // }
    // ss(str,6);
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
    submitForm(formName) {
      let cookieToken = this.$cookies.get("token");
      let userData = {
        nickname:this.ruleForm.name,
        sex:this.ruleForm.resource
      };
      this.$refs[formName].validate(valid => {
        if (valid) {
           this.$axios.post('account/info/',userData,{
          headers: {
              'Authorization': 'BIXIAOBAO '+ cookieToken
          }
          }).then(({data})=>{
          if(data.status==1){
            this.successTip(this.$t('message.修改成功'));
            let _this = this
            setTimeout(function(){
              _this.$router.go(0)
            },500)
          }else{
            this.errorTip("修改失败");
          }
          });
        } else {

          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },

    handleChange(value) {
      console.log(value);
    },
    successTip(msg) {
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
    }
  }
};
</script>
<style scoped lang='scss'>
@import "~/pages/_lang/user/user.scss";
</style>
<style lang='scss'>
.el-input {
  width: auto;
}
</style>