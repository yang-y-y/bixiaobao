
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="wallet" @loadData="loadData" onload="true" />
        <div class="rightCon box">
          <div class="wallet">
            <div class="title">{{$t('message.我的')}}BXB</div>
            <div class="cons">
                <div class="walletHead">
                    <div class="view">
                        <h4>{{$t('message.我的')}}BXB</h4>
                        <p>{{walletdata.amount|formatMoney(4)}}</p>
                    </div>
                    <div class="view">
                        <h4>{{$t('message.冻结')}}BXB
                            <el-tooltip class="item" effect="dark" :content="$t('message.申请提币时,系统会暂时冻结您的BXB')" placement="top">
                                <i class="el-icon-info"></i>
                            </el-tooltip>
                        </h4>
                        <p>{{walletdata.frozen|formatMoney(4)}}</p>
                        <nuxt-link :to="'/'+$store.state.locale+'/user/extract'">{{$t('message.提币')}}</nuxt-link>
                    </div>
                </div>
                <div class="historyList">
                    <h2>{{$t('message.交易记录')}}</h2>
                    <i-table :columns="columns" width="100%" :data="historyData" :no-data-text="$t('message.暂无数据')"></i-table>
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="historyCount"
                      @current-change="handleCurrentChange"
                      :page-size="20"
                      :hide-on-single-page="true"
                      :current-page="page"
                      >
                    </el-pagination>
                </div>
            </div>
          </div>
          <el-main v-show="loading" v-loading="loading"
         element-loading-text="Loading" class="conLoading"></el-main>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require('js-cookie') : undefined
import Menulist from '~/pages/_lang/user/menulist'
export default {
  name: "product",
  middleware: 'userAuth',
  data() {
    return {
        timer:60,
        loading:false,
        days:90,
        listdata:[],
        walletdata:[],
        historyData:[],
        historyCount:0,
        page:1,
         columns:[
          {
            title: this.$t('message.时间'),
            key: 'timestamp',
            width:'250'
          },
           {
            title: this.$t('message.类型'),
            key: 'action',
            render: (h, params) => {
              return h('span',params.row.action==0?this.$t('message.充值'):params.row.action==1?this.$t('message.提币'):params.row.action==2?this.$store.state.locale=='kr'?this.$t('message.挖矿')+'('+ this.$t('message.星') + params.row.star +this.$t('message.矿机')+')':this.$t('message.挖矿')+'('+ params.row.star+ this.$t('message.星') +this.$t('message.矿机')+')':this.$t('message.购买矿机'))
            }
          },
          {
            title: this.$t('message.数量')+'（BXB）',
            key: 'amount',
            width:'260',
            render: (h, params) => {
              return h('span',params.row.action==1||params.row.action==3?'-'+params.row.amount:'+'+params.row.amount)
            }
          },
          {
            title: this.$t('message.状态'),
            key: 'status',
            width:'150',
            render: (h, params) => {
            return h(
              "span",
              params.row.status == 0
                ? this.$t('message.审核中')
                : params.row.status == 1
                ? this.$t('message.进行中')
                : params.row.status == 2
                ? this.$t('message.成功')
                : this.$t('message.失败')
            );
          },
          }
        ]
    };
  },
  created() {
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
    _format(val){
       return ()=>{
            return val
       }
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
    loadData(data){
        this.walletdata = data
    },
    loadHistory(val){
      let cookieToken = this.$cookies.get('token')
      this.$axios.get("account/transaction/?page="+val+"&t="+this.$store.state.newtime,{
      headers: {
          'Authorization': 'BIXIAOBAO '+ cookieToken
      }
      })
      .then(({ data }) => {
        this.historyData=data.data.results
        this.historyCount=data.data.count
      });
      
    },handleCurrentChange(val){
      this.page = val;
      this.loadHistory(val);
    }
    
  },
  mounted(){
      // this.loadData()
      this.loadHistory(1)
  }
    
};
</script>
<style lang="scss" scoped>
   @import "~/pages/_lang/user/user.scss";
   .wallet{
     .ivu-table-wrapper{
       margin-bottom: 20px;
     }
       .walletHead{
               display: flex;
               justify-content: left;
               padding-bottom: 50px;
               border-bottom: 1px solid #D8D8D8;
               margin-bottom: 30px;
               padding:0 28px;
               padding-bottom: 30px;
           .view{
               margin-right: 100px;
               &:last-child{
                   margin: 0;
               }
               h4{
                   font-weight: normal;
               }
               p{
                   font-size: 30px;
                   margin: 5px 0;
               }
           }
       }
   }
</style>
<style lang="scss">
.user{
.ivu-table-wrapper{
  border: none;
.ivu-table {
      table{
        width: 100% !important;
      }
      th{
          background: none !important;

      }
      th,td{
        border: none;
        height:38px;
        font-size: 14px;
      }
      &::before,&::after{
        display: none !important;
      }
  }
}
}

</style>
