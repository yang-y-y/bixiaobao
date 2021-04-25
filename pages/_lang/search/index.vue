<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang"/>
    <div class="home homelv2 search_page">
      <div class="container flex">
      <div class="home_left search_page_left">
        <div class="search_input">
          <el-input
            type="text"
            :placeholder="$t('message.请输入关键词')"
            @keyup.enter="loadData(keyWord)"
            @keyup.native="$event.target.value = $event.target.value.replace(/^\s+|\s+$/gm,'')"
            v-model="keyWord"
          />
          <el-button type="primary" icon="el-icon-search" @click="loadData(keyWord)"></el-button>
        </div>
        <div class="search_nav">
          <ul class="itemCenter">
            <li
              v-for="(item,index) in searchNav"
              :key="index"
              @click="handleChangeNav(index)"
              :class="index == changeNavIdx?'active':''"
            >
            {{$t('nav')[item]}}
            </li>
          </ul>
        </div>
        
        <!-- 行情 -->
        <div v-show="changeNavIdx == 0" class="search_exchange">
          <div class="search_result">
            {{$t('message.搜索')}}
            <span>{{keyWord}}</span>
            {{$t('message.找到')}}
            <i>{{tokens.length}}</i>
            {{$t('message.个')}}
            <em>{{$t('message.币种')}}</em>
            {{$t('message.结果')}}
          </div>
         <el-table
              v-loading="loading"
              :data="tokens"
              style="width: 100%"
              @row-click="gotoDatail2"
            >
              <el-table-column prop="market_value_index " width="60" label="#" align="center">
                <template slot-scope="scope">
                    <div>{{scope.row.market_value_index}}</div>
                </template>
                
              </el-table-column>
              <el-table-column :label="$t('message.币种')">
                <template slot-scope="scope">
                  <div class="Coinnames itemCenter">
                    <img :src="$store.state.bixiaobao + scope.row.logo_m" />
                    <div>
                      <span>{{ scope.row.token}}</span>
                      <p>{{scope.row.name||scope.row.code}}</p>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column prop="price_now" :label="$t('message.全球指数')" align="right" width="110" sortable>
                <template slot-scope="scope">${{($store.state.currency=='CNY'?(scope.row.price_now/$store.state.usdprice):$store.state.currency=='KRW'?(scope.row.price_now/$store.state.usdprice):scope.row.price_now)|priceFloat}}</template>
              </el-table-column>
               <el-table-column prop="price_now" :label="$store.state.currency+$t('message.价格')" align="right" sortable>
                <template slot-scope="scope">{{scope.row.price_now}}
                  <span class="tokenstyle">{{$store.state.currency}}</span>
                </template>
              </el-table-column>
               <el-table-column prop="increase24h" :label="$t('message.24H涨幅')" align="right"  sortable>
                <template slot-scope="scope">
                  <span v-if="scope.row.increase24h>0" class="up">+{{scope.row.increase24h}}%</span>
                  <span v-else class="down">{{scope.row.increase24h}}%</span>
                </template>
              </el-table-column>
             
              <el-table-column prop="volume24h" :label="$t('message.24H成交额')" align="right"  width="110" sortable>
                <template slot-scope="scope">{{scope.row.volume24h|reverseStr}}<span class="tokenstyle">{{$store.state.currency}}</span></template>
              </el-table-column>
              <el-table-column prop="circulation" :label="$t('message.流通数量')" align="right"  sortable>
                <template slot-scope="scope">{{scope.row.circulation|reverseStr}}<span class="tokenstyle">{{scope.row.token}}</span></template>
              </el-table-column>
              <el-table-column prop="circulate_rate" :label="$t('message.流通率')" align="right"  sortable>
                <template slot-scope="scope">{{scope.row.circulate_rate}}%</template>
              </el-table-column>
              <el-table-column prop="market_value" :label="$t('message.流通市值')" align="right"  sortable>
                <template slot-scope="scope">{{scope.row.market_value|reverseStr}}
                  <span class="tokenstyle">{{$store.state.currency}}</span>
                </template>
              </el-table-column>
              
            </el-table>
          
        </div>
        <!-- 平台 -->
        <div v-show="changeNavIdx == 1" class="search_platform">
          <div class="search_result">
            {{$t('message.搜索')}}
            <span>{{keyWord}}</span>
            {{$t('message.找到')}}
            <i>{{exchanges.length}}</i>
            {{$t('message.个')}}
            <em>{{$t('nav.平台')}}</em>
            {{$t('message.结果')}}
          </div>
          <el-table
            v-loading="loading"
            :data="exchanges"
            style="width: 100%"
            :default-sort="{prop: 'id', order: 'ascending'}"
            @row-click="gotoDatail"
          >
            <el-table-column prop="market_value_index" label="#" width="60">
              <template slot-scope="scope">
                 {{scope.row.market_value_index}}
               </template>
            </el-table-column>
            <el-table-column prop="name" :label="$t('headertop.交易平台')">
              <template slot-scope="scope">
                <div class="Coinnames itemCenter">
                  <img :src="scope.row.logo_m" />
                  <div>
                    <span>{{ scope.row.name||scope.row.code}}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="assets" :label="$t('message.币种数量')" sortable  align="right">
                <template slot-scope="scope">
                  <div class="clumnCon">
                  <span>{{scope.row.token_count||'--'}}</span>
                  </div>
                </template>
              </el-table-column>
            <el-table-column prop="symbol_count" :label="$t('message.交易对')" sortable align="right"> </el-table-column>
            <el-table-column prop="country" :label="$t('message.24H成交额')" align="right">
              <template slot-scope="scope">{{scope.row.volume24h|formatMoney}}</template>
            </el-table-column>
             <el-table-column prop="count" :label="$t('message.成立时间')" sortable align="right">
              <template slot-scope="scope">{{scope.row.online_time||'--'}}</template>
            </el-table-column>
          </el-table>
        </div>
        <!-- 资讯 -->
        <!-- <div v-show="changeNavIdx == 2" class="search_news">
        <div class="search_result">
          搜索
          <span>“WET”</span> 找到
          <i>6</i> 个
          <em>币种</em>结果
        </div>
        <ul class="news_content">
          <li class="itemCenter">
            <img src="@/assets/headline.png" alt />
            <div class="box_container">
              <h3>CoinEx 研究院：区块链世界的悖论——“稳定币”</h3>
              <p>从比特币被作为一种创新的支付网络和一种新型的货币发行以来，去中心化、不可篡改、公开透明已经作为区块链核心精神传承。</p>
              <div class="itemBetween">
                <div class="time">
                  <img src="@/assets/time.png" alt />
                  <span>2020/03/20</span>
                </div>
              </div>
            </div>
          </li>
          <li class="itemCenter">
            <img src="@/assets/headline.png" alt />
            <div class="box_container">
              <h3>CoinEx 研究院：区块链世界的悖论——“稳定币”</h3>
              <p>从比特币被作为一种创新的支付网络和一种新型的货币发行以来，去中心化、不可篡改、公开透明已经作为区块链核心精神传承。</p>
              <div class="itemBetween">
                <div class="time">
                  <img src="@/assets/time.png" alt />
                  <span>2020/03/20</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
        </div>-->
      </div>
      <div class="home_right">
        <Hotlist/>
      </div>
      </div>
    </div>
  </div>
</template>

<script>
import { saveSearch } from "~/plugins/cache"; //引用本地存储js
import storage from "good-storage"; //引入good-storage包
export default {
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  watchQuery:['q'],
  data() {
    return {
      searchNav: ["行情", "平台"],
      changeNavIdx: 0,
      tokens: [],
      exchanges: [],
      keyWord: this.$route.query.q||'',
      loading: false,
      currency: this.$store.state.currency,
      language: this.$store.state.language,
      searches_list:[],
      historyxs: false
    };
  },
  created() {
    // 实例被创建之后执行代码
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 方法
    handleChangeNav,
    loadData,
    initPage() {
      //为避免重复先清空再添加
      this.searches_list = [];
      let searches = storage.get("_search_");
      this.searches_list = searches ? searches : [];

      if (this.searches_list.length > 0) {
        this.historyxs = true;
      } else {
        this.historyxs = false;
      }
    },
    clearhis() {
      storage.remove("_search_");
      this.searches_list = [];
      this.historyxs = false;
    },
    historysearch(item) {
      saveSearch(item);
      this.keyWord = item;
      this.historyxs = false;
    },
    gotoDatail(row, event, column) {
      this.$router.push({
        path: "/" + this.$i18n.locale + "/exchange/" + row.code
      });
    },
    gotoDatail2(row, event, column) {
      this.$router.push({
        path: "/" + this.$i18n.locale + "/coinlist/" + row.code
      });
    },
    getMag(msg){
      this.loadData(this.keyWord,msg);
    },
    setLang(msg){
      this.loadData(this.keyWord,this.currency,msg);

    }
  },
  mounted() {
    // 页面进入时加载内容
    this.loadData(this.keyWord,this.$store.state.currency,this.$store.state.language);
    this.initPage()
  },
  watch: {
    // 监测变化
    keyWord(val){
      this.keyWord = val
      this.loadData(val,this.$store.state.currency,this.$store.state.language);
    }
  }
};

function handleChangeNav(idx) {
  this.changeNavIdx = idx;
}
function loadData(value,currency,language) {
  if(this.keyWord.length<=1||undefined) {
  return false
  }
  saveSearch(this.keyWord); 
  this.loading = true;
  this.$router.push({ path:'/'+this.$i18n.locale+ '/search/?q=' + this.keyWord });
  // http://18.163.114.150/search/?q=qweqwe
  this.$axios
    .get("search/", {
      params: { q: value, currency: currency, language:language }
    })
    .then(({ data }) => {
      this.tokens = data.data.token;
      this.exchanges = data.data.exchange;
      this.loading = false;
    })
}
</script>
<style lang='scss'>
.search_page {
  .tokenstyle{
    font-size: 12px;
    line-height: 12px;
    color: #50546A;
    display: block;
  }
  .search_page_left {
    padding: 57px 30px 0;
    padding-bottom: 40px;
    position: relative;
    .search_input {
      margin: 0 auto;
      position: relative;
      width: 665px;
      margin-bottom: 109px;
      display: flex;
      justify-content: center;
      input {
        height: 51px;
        width: 519px;
        padding: 15px;
        font-size: 14px;
        border: 1px solid #50546A;
        border-radius: 4px;
        margin-right: 20px;
        outline: none;
      }
      button {
        width: 146px;
        height: 51px;
        vertical-align: top;
        font-size: 22px !important;
        border: 0;
        border-radius: 4px;
        background: #5480d8;
      }
    }
    .search_nav {
      width: 100%;
      height: 49px;
      line-height: 49px;
      ul {
        border-bottom: 1px solid #e9e9e9;
        li {
          margin: 0 25px;
          color: #6e6e6e;
          font-size: 16px;
          cursor: pointer;
          &.active {
            position: relative;
            color: #f86b1d;
            font-weight: 500;
            &::after {
              content: "";
              position: absolute;
              width: 100%;
              background: #f86b1d;
              height: 4px;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
    }
    /* 搜索结果 */
    .search_result {
      position: absolute;
      top: 200px;
    }
    .Coinnames {
      padding-left: 26px;
      position: relative;
      img {
        position: absolute;
        left: 0;
        height: 20px;
        max-width: 30px;
      }
      p {
        color: #50546A;
        font-size: 13px;
        line-height: 14px;
      }
    }
    /* 行情 */
    .search_exchang {
    }
    /* 平台 */
    .search_platform {
    }
    /* 资讯 */
    .search_news {
      .news_content {
        li {
          width: 100%;
          height: 201px;
          padding: 20px 30px 30px;
          border-bottom: 1px solid #e9e9e9;
          &:last-child {
            border: 0;
          }
          img {
            width: 230px;
            height: 140px;
            border-radius: 4px;
          }
          .box_container {
            margin-left: 30px;
            height: 100%;
            h3 {
              color: #242735;
              font-size: 16px;
              font-weight: 500;
              margin: 10px 0;
            }
            p {
              color: #242735;
              margin-bottom: 44px;
            }
            .time {
              color: #50546A;
              img {
                width: 14px;
                height: 14px;
                vertical-align: middle;
                margin-right: 5px;
              }
            }
            /* .share {
              display: block;
              cursor: pointer;
              img {
                width: 14px;
                height: 16px;
                vertical-align: middle;
                margin-right: 5px;
              }
            } */
          }
        }
      }
    }
    /* 行情 /平台公共样式*/
    .search_exchange,
    .search_platform {
      padding-top: 20px;
      .el-table th {
        background: #f6f7fa;
        padding: 7px 0;
        &:first-child {
          padding-left: 15px;
        }
      }

      tbody {
        td:first-child {
          padding-left: 15px;
          .cell {
            text-align: center;
            min-width: 26px;
            min-height: 26px;
            display: inline-block;
            text-overflow: clip;
            padding: 0;
          }
        }
      }
      thead {
        th:first-child {
          padding-left: 15px;
        }
      }
    }
  }

}
</style>