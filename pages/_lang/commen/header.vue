<template>
  <div class="header">
    <div class="first">
      <div class="top between">
        <ul class="itemCenter">
          <li>
            <nuxt-link :to="'/'+$i18n.locale">{{ $t('headertop.货币') }}</nuxt-link>
            <span>{{this.$store.state.config.token_count?this.$store.state.config.token_count:"--" | formatePrice}}</span>
          </li>
          <li>
            <nuxt-link :to="'/'+$i18n.locale+'/exchange'">{{ $t('headertop.交易平台') }}</nuxt-link>
            <span>{{this.$store.state.config.exchange_count?this.$store.state.config.exchange_count:"--"}}</span>
          </li>
          <li>
            {{$t('message.总市值')}}
                <span>{{$store.state.curRate}}{{($store.state.config.market?$store.state.config.market.usd_market_value:'')|formatMoney}}</span>
          </li>
        </ul>
        <Toptool v-bind="$attrs" v-on="$listeners"/>
      </div>
    </div>
    <div class="second itemCenter">
      <nuxt-link :to="'/'+$i18n.locale" v-if="$store.state.locale == 'cn'" class="logobet"><img src="@/assets/cnLOGO@2x.png" alt /></nuxt-link>
      <nuxt-link :to="'/'+$i18n.locale" v-else class="logobet"><img src="@/assets/enLOGO@2x.png" alt  /></nuxt-link>
      <ul class="itemCenter">
        <li
          v-for="(item,index) in nav"
          :key="index"
          :class="item.locale == ($route.path).split('/')[2]? 'choice':''||item.locale == $route.name? 'choice':''"
        >
           <div v-if="index=='0'">
            <nuxt-link :to="'/'+$i18n.locale" v-if="item.hot==false">{{ $t('nav')[item.value]}}</nuxt-link>
            <nuxt-link :to="'/'+$i18n.locale+'/'+item.locale" v-else><img src="@/assets/hot.gif" width="14"/>{{ $t('nav')[item.value]}}</nuxt-link>
           </div>
           <div v-else>
            <nuxt-link :to="'/'+$i18n.locale+'/'+item.locale" v-if="item.hot==false">{{ $t('nav')[item.value]}}</nuxt-link>
            <nuxt-link :to="'/'+$i18n.locale+'/'+item.locale" v-else><img src="@/assets/hot.gif" width="14"/>{{ $t('nav')[item.value]}}</nuxt-link>
           </div>
        </li>
      </ul>
      <div class="seach">
        <input
          type="text"
          v-model="search"
          @focus="handleInputFocus()"
          @keyup.enter="handleSearch(search,hidden)"
          :placeholder="$t('message.搜索币种/平台等关键词')"
        />
        <div class="search_btn"  @click="handleSearch(search,hidden)" ><img src="@/assets/seach.png" alt /></div>
        
        <div class="auto_finish" :style="this.hidden==true?'display:none':''">
          <div class="tit" v-show="searches_list.length>0">
            {{$t('message.搜索历史')}}
            <el-button type="text" @click="handleRemove($store.state.search,hidden)"> {{$t('message.清除记录')}}</el-button>
          </div>
          <div class="list" v-show="searches_list.length>0">
            <ol>
              <li v-for="(item,index) in searches_list.slice(0,5)" :key="index" @click="handleHistory(item)">
                {{item}}
              </li>
            </ol>
          </div>
          <div class="tit">{{$t('message.热门搜索')}}&nbsp;🔥</div>
          <div class="list">
            <nuxt-link :to="'/'+$i18n.locale+'/coinlist/'+item.tokeninfo_code" v-for="(item,index) in hotlist" :key="index"><img :src="$store.state.bixiaobao+item.logo_s"/>{{item.token}}</nuxt-link>
          </div>
        </div>
        <div class="masking" @click="handleMask()" :style="this.hidden==true?'display:none':''"></div>
      </div>
      <div class="loinBtn">
        <ol v-if="$store.state.islogin==false" class="itemCenter" >
          <li>
            <nuxt-link v-if="$i18n.locale == 'ru'" :to="'/'+$i18n.locale+'/login'" rel="nofollow">{{$t('message.登录')}}</nuxt-link>
            <nuxt-link v-else :to="'/'+$i18n.locale+'/login'" rel="nofollow">{{$t('message.登录')}}/{{$t('message.注册')}}</nuxt-link>
          </li>
        </ol>
        <ol v-else class="itemCenter">
          <li>
            <a :href="'/'+$i18n.locale+'/user'">{{$t('message.用户中心')}}</a>
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
import Toptool from '../commen/toptool';
const Cookie = process.client ? require("js-cookie") : undefined;
import storage from "good-storage"; //引入good-storage包
export default {
  name: "headers",
  watchQuery:['q','currency'],
  beforeCreate() {
  },
   props: {
    // 父辈向子辈传参
},
  created: function() {
     let searchCookie = this.$cookies.get('search')
      if(searchCookie){
          this.searchHistory = searchCookie
      }
  },
  data() {
    return {
      islogin:false,
      coinall: [],
      hotlist:[],
      ipAddress:'',
      nav: [
        {
          value: "加密货币",
          locale: 'lang',
          hot:false
        }, 
        {
          value: "Defi",
          locale: "defi",
          hot:true
        },
        {
          value: "平台",
          locale: "exchange",
          hot:false
        },
        {
          value: "快讯",
          locale: "news",
          hot:false
        }
      ],
      navIdx: 0,
      hidden: true,
      search: "",
      searchHistory:'',
      searches_list:[]
    };
  },
  methods: {
    handleNavList,
    handleInputFocus,
    handleMask,
    handleSearch,
    handleRemove,
    handleHistory,
    hotsearch,
     unihistory(){
       this.searches_list = [];
        let searches = storage.get("_search_");
        this.searches_list = searches ? searches : [];
        
     }
  },
   components: {
     Toptool
  },
  mounted(){
    this.unihistory()
  }
};
function hotsearch(){
  if(this.hotlist!='') return false;
  this.$axios
  .get("token/hot/search/")
  .then(({ data }) => {
    this.hotlist = data.data.results
  }).catch(err=>{
    console.log(err)
  });
}
function handleNavList(idx, value) {
  this.navIdx = value;
  this.$router.push(this.$i18n.path(idx));
}
function handleInputFocus() {
  this.hidden = false;
  this.hotsearch()

}
function handleMask(){
  this.hidden = true;
}
function handleSearch(search) {
  if(this.search == ''|| undefined) return this.$message({
          showClose: true,
           type:'warning',
          message: this.$t('message.请输入关键词')
        }); 
  let routeUrl = this.$router.resolve({
     path: '/'+this.$i18n.locale+"/search",
     query: {q:this.search}
   });


   window.open(routeUrl.href, '_blank');
  // this.$router.push({ path: "/search/?q=" + this.search });
  // this.hidden = true;
}
function handleRemove(value){
  storage.remove("_search_");
  this.searches_list = [];
  this.hidden = true;
}
function handleHistory(value){
  window.location.href='/'+this.$i18n.locale+"/search/?q="+ value
}
</script>
<style lang="scss">
.header {
  width: 100%;
  height: 116px;
  background: #ffffff;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
  position:relative;
  z-index: 2;
  .logobet{
    position: relative;
    background:url('../../../assets/beta.png')  no-repeat 160px top;
    background-size: 40px 16px;
    font-size: 0;
    padding-right: 55px;
  }
  .first {
    width: 100%;
    height: 36px;
    border-bottom: 1px solid #e9e9e9;    
    .top {
      width: 1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
      height: 32px;
      margin: 0 auto;
      align-items: center;
      ul {
        font-size: 14px;
        color: #242735;
        flex: 1;
        li {
          margin-right: 20px;
          a{
            color: #242735;
          }
          &::after {
            content: "";
            padding-left: 18px;
            height: 10px;
            display: inline-block;
            vertical-align: middle;
            border-right: 1px solid #606060;
          }
        }
        li:last-child {
          &::after {
            display: none;
          }
        }
      }
      // ol {
      //   font-size: 14px;
      //   color: #c7c8d2;
      //   margin-left: 20px;
      //   span{
      //     cursor: pointer;
      //   }
      //   a{
      //     color:#c7c8d2 ;

      //   }
      // }
      .el-dropdown-link {
        color:#242735;
      }
    }
  }
  .second {
    width: 1200px;
    @media screen and (min-width:1200px){
      width: 1200px;
    }
    @media screen and (min-width:1440px){
      width: 1400px;
    }
    height: 80px;
    margin: 0 auto;
    a{
      color: #50546A;
    }
    img {
      width: 150px;
      font-size: 0px; 
    }
    ul {
      margin-left: 120px;
      flex: 1;
      li {
        font-size: 16px;
        color: #242735;
        margin-right: 30px;
        cursor: pointer;
        font-weight: 500;
        a{
          display: flex;
            justify-content: left;
            align-items: center;
            img{
              width: 14px;
              height: 14px;
              margin-right:5px;
            }
        }
        &.choice {
          position: relative;
          color: #F86B1D;
          a{
          color: #F86B1D;
          
          }
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            background: #F86B1D;
            height: 4px;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .seach {
      width: 260px;
      height: 38px;
      position: relative;
      border-radius: 19px;
      .masking {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 2;
        background: transparent;
      }
      input {
        width: 260px;
        height: 38px;
        border-radius: 19px;
        outline: none;
        border: none;
        background: #f6f6f6;
        padding-left: 18px;
        position: relative;
        z-index: 9;
        &:focus,&:hover{
          background: #ededf0;
        }
      }
      
      .search_btn{
        position: absolute;
        right: 0;
        top: 0;
        height: 36px;
        width: 36px;
        z-index: 10;
        cursor: pointer;
        img {
        width: 15px;
        height: 15px;
        z-index: 2;
        margin: 0;
        margin-top: 12px;
        margin-left: 5px;
      }
      }
      
      .auto_finish {
        width: 260px;
        max-height: 366px;
        overflow-y: scroll;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(80, 84, 106, 0.3);
        background: #ffffff;
        padding: 18px 20px;
        position: absolute;
        z-index: 999999999;
        top: 42px;
        .tit {
          font-size: 14px;
          color: #242735;
          border-bottom: 1px solid #f0f2f9;
          line-height: 32px;
          font-weight: 500;
          position: relative;
          button {
            color: #5480d8;
            cursor: pointer;
            outline: none;
            border: 0;
            position: absolute;
            top: 8px;
            right: 0;
            padding: 0;
            font-size: 12px;

          }
        }
        .list {
          margin: 5px 0;
          ol{
            li{
              cursor: pointer;
              padding:0 5px;
               &:hover {
                  background: #f1f2f5;
                }
            }
          }
          div,
          a {
            display: flex;
            justify-content: left;
            align-items: center;
            line-height: 36px;
            color: #242735;
            font-size: 14px;
            padding: 0 7px 0 2px;
            cursor: pointer;
            img{
              width: 16px;
              margin-right: 10px;
            }

          }
          div {
            span {
              float: right;
              color: #009bf4;
              display: none;
            }
          }
          a {
            background: transparent;
            text-decoration: none;
            outline: none;
            transition: color 0s ease;
          }
          div:hover,
          a:hover {
            background: #f1f2f5;
          }
          div:hover > span {
            display: inline;
          }
        }
      }
    }
    .loinBtn{
      ol {
      padding: 8px 16px 7px;
      font-size: 14px;
      margin-left: 30px;
      border: 1px solid #f0f1f4;
      border-radius: 8px;
      cursor: pointer;
      a{
        color:#50546A ;
      }
    }
    ol:hover{
      background: #ededf0;
      border: 1px solid #ededf0;
      a{
        color:#50546A ;
      }
    }
    }
  }

 
}
 .el-select ::v-deep .el-input__inner {
    height: 20px !important;
    line-height: 20px;
    padding: 0;
  }
  // .el-dropdown-menu__item:focus, .el-dropdown-menu__item:not(.is-disabled):hover{
  //   background-color: #fff3ef;
  //   color: #e85a1c;
  // }
</style>

