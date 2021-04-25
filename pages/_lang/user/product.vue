
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="product" @loadData="getWallet"  onload="true" />
        <div class="rightCon box">
          <div class="product">
            <div class="title">{{$t('message.我的矿机')}}</div>
            <div class="cons">
                <div class="pthead">
                    <div class="todayNumber">
                        <i>{{$t('message.今日预估产量')}}</i>
                        <el-tooltip class="item" effect="dark" :content="$t('message.产量基于历史数据估算,仅供参考,以实际结算为准。')" placement="top">
                            <i class="el-icon-info"></i>
                        </el-tooltip>
                        <p>{{profitData.pool}} BXB</p>
                    </div>
                    <div class="viewlist">
                        <div class="view">
                            <h4>{{$t('message.昨日挖矿')}}</h4>
                            <span>{{profitData.yesterday}}</span>
                        </div>
                        <div class="view">
                            <h4>{{$t('message.累计挖矿')}}</h4>
                            <span>{{profitData.total}}</span>
                        </div>
                    </div>
                </div>
                <div class="plist">
                     <ul  v-if="listdata.length>0">
                         <li v-for="(item,index) in listdata" :key="index">
                            <div >
                                <video id="my-player" ref="myPlayer" muted loop autoplay poster="封面" >
                                    <source :src="require('~/assets/pro_0'+item.star+'.mp4')" type="video/mp4"/>
                                </video>
                                <div class="textcon">
                                    <div class="ttop">
                                        {{$t('message.预期年化收益')}}(%)
                                        <p>{{item.profit}}</p>
                                    </div>
                                    <div class="tbtm">
                                        <img :src="require('~/assets/level_0'+item.star+'.png')" alt="">
                                        <div class="times">
                                            <!-- {{item.period}} -->
                                            {{item.period|unlatTime}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                         </li>
                     </ul>
                     <ul :style="listdata.length==0?'margin-left:0px !important':''">
                         <li v-for="(item) in noData" :key="item">
                            <div class="noproduct Center">
                                <el-button plain @click="goto('productlist')">{{$t('message.购买矿机')}}</el-button>
                            </div>
                         </li>
                     </ul>
                </div>
                <div class="mypros">
                    <dl>
                        <dt>
                            <h4>{{$t('message.我的')}}BXB</h4>
                            <span>{{walletData.amount|formatMoney(4)}}</span>
                            <el-button type="primary"  @click="goto('extract')">{{$t('message.提币')}}</el-button>
                        </dt>
                        <dd>
                            <h4>{{$t('message.我的邀请数量')}}</h4>
                            <span>{{this.$store.state.userinfo.invite_count}}</span>
                            <el-button @click="goto('invite')" plain>{{$t('message.邀请')}}</el-button>
                        </dd>
                        <dd>
                            <h4>{{$t('message.我的水晶')}}</h4>
                            <span>{{this.$store.state.userinfo.score|formatMoney}}</span>
                        </dd>
                    </dl>
                </div>
                <div class="prodatail">
                    <h3>{{$t('message.玩法说明')}}</h3>
                    <ul>
                        <li>• {{$t('message.玩法说明1')}}</li>
                        <li>• {{$t('message.玩法说明2')}}</li>
                        <li>• {{$t('message.玩法说明3')}}</li>
                        <li>• {{$t('message.玩法说明4')}}</li>
                        <li>• {{$t('message.玩法说明5')}}</li>
                        <li>• {{$t('message.玩法说明6')}}</li>
                    </ul>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
    :title="$t('message.提示')"
    :visible.sync="centerDialogVisible"
    width="30%"
    center>
        <div class="buyTip">
            <div class="tiptxt">
                    {{$t('message.币小宝官方送了您一台矿机')}}
            </div>
            <div class="imgCons">
                <div class="imgBody">
                    <img :src="require('~/assets/smallP_01.png')"  alt="">
                </div>
                <img :src="require('~/assets/level_01.png')" height="30" alt="" class="imgpst">

            </div>
            <div class="aboutprofit">
                <div><h5>{{$t('message.预期年化收益')}}</h5><span style="text-decoration:line-through;">329</span></div>

                <div><h5>{{$t('message.产出周期')}}({{$t('message.天')}})</h5>10</div>
                <div><h5>{{$t('message.预期年化收益')}}</h5>180%</div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="goto('productlist')"  :loading="loading">{{$t('message.立即查看')}}</el-button>
            </span>
        </div>
    </el-dialog>
  </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
var timeId;
import Menulist from '~/pages/_lang/user/menulist'
import Videojs from 'video.js'
export default {
  name: "product",
  middleware: 'userAuth',
  data() {
    return {
        timer:60,
        loading:false,
        isproduct:false,
        centerDialogVisible:false,
        listdata:[],
        noData:[],
        userData:[],
        walletData:[],
        profitData:[],
        lastTime:{
            d:'',
            h:'',
            m:'',
            s:''
        }
    };
  },
  created() {
    this.loadData()
    let prize = this.$cookies.get('prize')
    if(prize=='false'||undefined){
        this.centerDialogVisible = true
    }else{
        this.centerDialogVisible = false
    }
   },
   beforeDestroy () {  //组件的销毁
    clearInterval(timeId) // 清除定时器
    timeId=null
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
        this.$refs[formName].validate((valid) => {
        if (valid) {
            this.successTip('成功',formName)

        } else {
            console.log('error submit!!');
            return false; 
        }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    },
    successTip(msg,formName){
        this.$notify({
            type: 'success',
            message: msg
        });
        this.resetForm(formName)
    },
    errorTip(msg){
        this.$notify.error({
            title: 'error',
            message: msg
        });
    },
    getWallet(data){
        this.walletData = data;
    },
    loadData(){
        let cookieToken = this.$cookies.get('token')
        this.$axios.get("/account/machine/?t="+this.$store.state.newtime,{
        headers: {
            'Authorization': 'BIXIAOBAO '+ cookieToken
        }
        })
        .then(({ data }) => {
            let alldata = data.data
            this.listdata = alldata
            let dataleng = 5-alldata.length
            for(let i=0;i<dataleng;i++){
               this.noData.push(i)
            }
        });
        // return false;
        this.$axios.get("account/profit/?t="+this.$store.state.newtime,{
        headers: {
            'Authorization': 'BIXIAOBAO '+ cookieToken
        }
        })
        .then(({ data }) => {
           this.profitData = data.data
        });
    },
    goto(url){
        let lang = this.$store.state.locale;
        this.$router.push('/'+lang+'/user/'+url)
    },
    setIntervalTime () {
       timeId = setInterval(() => {
        this.listdata.forEach(item => {
          item.period = this.countTime(item.period)
        })
      }, 1000)
    },
    countTime: function(value) {
        if(value<=0) return false
        let adata = 0
        adata = value--
       return value--
    },
  },
  mounted(){
      this.userData = this.$store.state.userinfo;
        this.setIntervalTime()
  },
  filters:{
      unlatTime(value) {
        let d = Math.floor(value / 60 / 60 / 24)
        let h = Math.floor((value / 60 / 60) % 24)
        let m = Math.floor((value / 60) % 60)
        let s = Math.floor((value) % 60)
        if(h<10) h='0'+h;
        if(m<10) m='0'+m;
        if(s<10) s='0'+s;
        if(d=='0'){
            return h+':'+m+':'+s;
        }else{
            return d+' DAY / '+h+':'+m+':'+s;
        }
    }
  }
    
};
</script>
<style lang="scss" scoped>
   @import "~/pages/_lang/user/user.scss";
   .buyTip{
        text-align: center;
        .tiptxt{
            margin-bottom: 25px;
            span{
                font-weight: 500;
            }
        }
   .imgCons{
        position: relative;
        margin: 20px 0;
        margin-bottom: 30px;
        .imgBody{
            
            img{
                width: 207px;
                border-radius: 30px;

            }
        }
        .imgpst{
            position: absolute;
            left: 50%;
            bottom: -10px;
             transform: translate(-50%,0);
        }
    }
    .aboutprofit{
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
            div{
                margin: 0 10px;
                font-size: 16px;
                h5{
                    font-size: 14px;
                    font-weight: normal;
                    margin-bottom: 5px;
                }
            }
        }
   }
   .product{
       .pthead{
           text-align: center;
           .todayNumber{
                p{
                        font-size: 30px;
                    }
           }
            .viewlist{
                display: flex;
                justify-content: center;
                align-items: center;
                border-radius: 10px;
                background: #F6F6F6;
                padding: 20px 0;
                width: 370px;
                margin: 30px auto;
                .view{
                   width: 50%;
                   h4{
                       font-weight: normal;
                   }
                   span{
                       font-size: 26px;
                   }
                }
            }
            
       }
   }
   .plist{
       padding-bottom: 60px;
       border-bottom: 1px solid #D8D8D8;
       overflow: hidden;
       ul{
           overflow: hidden;
           padding: 10px 0;
           float: left;
           &:last-child{
               margin-left: 10px;
           }
           li{
               
               float: left;
               width: 156px;
               height: 283px;
               overflow: hidden;
               margin-right: 10px;
               border-radius: 20px;
               box-shadow: 0 1px 10px 0 rgba($color: #5C49F3, $alpha: 0.2);
               background: url("~@/assets/probg.png") no-repeat;
               background-size: 100%;
               position: relative;
               &:last-child{
                   margin: 0;
               }
               video{
                   width: 100%;
                   height: 100%;
                //    position: relative;
                   z-index: 2;
               }
               .textcon{
                    position: absolute;
                    z-index: 3;
                    left: 0;
                    top: 0;
                    width: 100%;
                    text-align: center;
                    color: #fff;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    height: 100%;
                    .ttop{
                        padding-top: 30px;
                        p{
                            font-size: 26px;
                        }
                    }
                    .tbtm{
                        padding-bottom: 16px;
                        img{
                            height: 30px;
                        }
                    }
               }
               .noproduct{
                   .el-button{
                    position: absolute;
                    bottom: 20px;
                    z-index: 1;
                   }
               }
           }
       }
   }
   .mypros{
       padding: 50px 28px;
       border-bottom: 1px solid #D8D8D8;
       margin-bottom: 50px;
       dl{
           display: flex;
           justify-content: left;
        //    align-items: center;
           width: 100%;
           span{
               font-size: 30px;
               display: block;
               margin-bottom: 10px;
           }
           dt{
               border-right: 1px solid #D8D8D8;
               padding-right: 100px;
               margin-right: 100px;
           }
           dd{
               margin-right: 30px;
               padding-right: 30px;
           }
       }
   }
   .prodatail{
       padding: 0 28px;
       h3{
           margin-bottom: 20px;
       }
   }
</style>
<style lang="scss">

</style>
