<template>
  <div>
    <Header @toSetlang="setLang"/>
    <div class="news margin flex">
      <div class="news_left box">
        <div class="news_nav">
          <ul class="itemCenter news_header_nav">
            <li
              v-for="(item,index) in news_nav"
              :key="index"
              @click="handleNewsNav(index)"
              :class="index == newsNavIdx ? 'active':''"
            >{{$t('message')[item]}}</li>
            <li>
              <a :href="'/' + $i18n.locale + '/news/list/'">{{$t('message.资讯')}}</a>
            </li>
          </ul>
          <!-- 快讯 -->
          <div v-show="newsNavIdx ==0" class="news_flash">
            <ul>
              <li v-for="(item,index) in newsList" :key="index">
                <div class="content">
                  <div class="circle"></div>
                  <a class="news_time_title">
                    <h3 :class="item.remind?'hot':''">
                      <div class="newstime">
                        {{item.pubdate|dateformat}}
                        <!-- <p>{{$t('message.币小宝官方')}}</p> -->
                      </div>

                      {{item.title}}
                    </h3>
                  </a>
                  <div class="news_container">
                    <p
                      class="news_text"
                      :style="item.state == 1 ? '-webkit-line-clamp: 2;':''"
                    >{{item.content}}</p>
                    <div class="show_content" v-if="item.state != 3">
                      <span
                        @click="handleArticleClick(index)"
                      >{{item.state == 1 ?$t('message.展开文章'):item.state == 2 ?$t('message.收起文章'):''}}</span>
                    </div>
                  </div>
                  <div class="image_box" v-if="item.imgUrl">
                    <p
                      class="btn"
                      @click="handleArticleImgClick(index)"
                    >{{item.stateImg == '1'?'展开图片':'收起图片'}}</p>
                    <img
                      @click="handleArticleImgClick(index)"
                      :class="item.stateImg == '1'?'':'enlarge'"
                      :src="item.imgUrl"
                    />
                  </div>
                  <!-- <a class="share_btn">
                  <img src="@/assets/share_article.png" alt />
                  <span>分享</span>
                  </a>-->
                </div>
              </li>
            </ul>
            <!-- <div class="page_scroll_tip" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
            <span ><i v-show="loadingShow" class="el-icon-loading"></i>{{nomore}}</span>
            </div>-->
            
            <div class="page_scroll_tip">
              <p v-if="loadingShow">
                <i v-show="loadingShow" class="el-icon-loading"></i>loading...
              </p>
              <p v-if="nodata">{{$t('message.没有更多了')}}</p>
              <div class="more Center" v-else>
                <span class="more_text" @click="loadData(page+=1)">浏览更多</span>
                <div class="bottom_arrows"></div>
              </div>
            </div>

              
          </div>
          <!-- 头条 -->
          <div v-show="newsNavIdx ==1" class="news_headline">
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
                    <div class="share">
                      <img src="@/assets/share.png" alt />
                      <span>分享</span>
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
                    <div class="share">
                      <img src="@/assets/share.png" alt />
                      <span>分享</span>
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
                    <div class="share">
                      <img src="@/assets/share.png" alt />
                      <span>分享</span>
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
                    <a class="share">
                      <img src="@/assets/share.png" alt />
                      <span>分享</span>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div class="more Center">
              <span class="more_text">浏览更多</span>
              <div class="bottom_arrows"></div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="news_right">
        <div :class="barFixed?'tofixed':''">
          <div class="banner box">
            <img src="@/assets/banner.png" alt />
          </div>
          <div class="trend box">
        <h4>行情趋势</h4>
        <ul>
          <li>
            <div>
              <p>1.42万亿</p>
              <span>总市值(CNY)</span>
            </div>
            <div>
              <p>+3.84%</p>
              <span>7D涨幅</span>
            </div>
          </li>
          <li>
            <div>
              <p>1.42万亿</p>
              <span>24H总成交额(CNY)</span>
            </div>
            <div>
              <p>+32.35%</p>
              <span>24H涨幅</span>
            </div>
          </li>
          <li>
            <p>24H币种涨跌分布</p>
            <div class="lineColor itemBetween">
              <span></span>
              <span></span>
            </div>
            <div class="between">
              <div>
                <i>上涨</i>
                <em class="green">1237</em>
              </div>
              <div>
                <em class="red">768</em>
                <i>下跌</i>
              </div>
            </div>
          </li>
        </ul>
          </div>
        </div>
      </div>-->
    </div>
  </div>
</template>

<script>
// import Vue from '@/main.js'
export default {
  head() {
    return {
      titleTemplate: this.$t("news.title"),
      meta: [
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
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      news_nav: ["快讯"],
      newsNavIdx: 0,
      newsList: [],
      page: 1,
      pageCount: "",
      barFixed: false,
      busy: false,
      loadingShow: false,
      loadMoreHide: false,
      nodata:false,
    };
  },
  async asyncData({ $axios,$cookies,params }) {
    let urdata = "";
    if (params.lang == "cn") {
      urdata = "zh_CN";
    }else if(params.lang=='kr'){
      urdata = 'ko_KR'
    }else if(params.lang=='ru'){
      urdata = 'ru'
    }else{
      urdata = "en";
    }
    const { data } = await $axios.get(
      "news/quick/?language=" +
        urdata
    ); //此时就可以用类似相对路径的写法
    return {
      newsList:data.data.results,
      pageCount:data.data.pages,
      loadingShow:true
    };
  },
  created() {
    // 实例被创建之后执行代码
    // this.loadData();
    this.loadingShow = false;
  },
  computed: {
    // 计算属性
    noMore() {
      return this.page >= this.pageCount && this.nodata == true;
    },
    disabled() {
      return this.loadingShow || this.noMore;
    }
  },
  components: {
    // 组件的引用
  },
  methods: {
    // 方法
    handleNewsNav,
    //重置数据
    handleResetData,
    handleArticleClick,
    handleArticleImgClick,
    loadData(page) {
      // http://18.163.114.150/api/news/quick/
      this.loadingShow = true
      this.$axios
        .get("news/quick/", {
          params: { language: this.$store.state.language, page: page }
        })
        .then(({ data }) => {
          let newsListPage = data.data.results;
          for (var i = 0; i < newsListPage.length; i++) {
            this.newsList.push(newsListPage[i]);
          }
          this.pageCount = data.data.pages;
          this.handleResetData();
          this.loadingShow = false
        });
    },
    handleScroll() {
      var scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      if (scrollTop > 115) {
        this.barFixed = true;
      } else {
        this.barFixed = false;
      }
    },
    load() {
      this.loadingShow = true;
      setTimeout(() => {
        this.loadData((this.page += 1));
        this.loadingShow = false;
      }, 2000);
    },
    setLang(msg){
      this.newsList = []
      this.loadData()
    }
  },
  mounted() {
    // 页面进入时加载内容
    window.addEventListener("scroll", this.handleScroll);
  },
  watch: {
    // 监测变化
  }
};
function handleNewsNav(idx) {
  this.newsNavIdx = idx;
}
// 请求后\更换语言 数据重置
function handleResetData() {
  for (var i = 0; i < this.newsList.length; i++) {
    // Vue.set(this.newsList[i],'state','');
    if (this.newsList[i].content.length > 170) {
      this.newsList[i].state = 1;
    } else {
      this.newsList[i].state = 3;
    }
    if (this.newsList[i].imgUrl) {
      this.newsList[i].stateImg = 1;
    }
  }
  // console.log(this.newsList);
  this.$forceUpdate();
}
function handleArticleClick(index) {
  if (this.newsList[index].state == "1") {
    this.newsList[index].state = 2;
  } else {
    this.newsList[index].state = 1;
  }
  this.$forceUpdate();
}
function handleArticleImgClick(index) {
  this.newsList[index].stateImg = !this.newsList[index].stateImg;
  this.$forceUpdate();
}
</script>
<style scoped lang='scss'>
.news {
  width: 1280px;
  min-height: 800px;
  margin: 0 auto;
  .news_left {
    width: 100%;
    min-height: 800px;
    background: #ffffff;
    padding: 15px 30px 0;
    .news_nav {
      .news_header_nav {
        height: 63px;
        border-bottom: 1px solid #e9e9e9;
        li {
          margin: 0 25px;
          color: #242735;
          font-size: 16px;
          &.active {
            position: relative;
            color: #f86b1d;
            font-weight: 500;
            &::after {
              content: "";
              position: absolute;
              width: 30px;
              background: #f86b1d;
              height: 4px;
              bottom: -90%;
              left: 50%;
              transform: translateX(-50%);
            }
          }
        }
      }
      a{
        color: #242735;
      }
      /* 头条/快讯公共样式 查看更多*/
      .more {
        width: 100%;
        height: 50px;
        color: #5480d8;
        cursor: pointer;
        .bottom_arrows {
          width: 10px;
          height: 10px;
          border-top: 1px solid #5480d8;
          border-right: 1px solid #5480d8;
          transform: rotate(135deg);
          margin-top: -6px;
          margin-left: 6px;
        }
      }
    }
    /* 快讯 */
    .news_flash {
      padding-top: 40px;
      .page_scroll_tip {
        text-align: center;
        padding: 20px 0;
      }
      ul {
        padding-left: 40px;
        li {
          width: 1125px;
          position: relative;
          padding: 0 0 60px 10px;
          padding-left: 160px;
          border-left: 1px solid #f86b1d;
          border-color: rgba(233, 85, 21, 0.2);
          .content {
            .circle {
              width: 14px;
              height: 14px;
              border-radius: 50%;
              background: #fff;
              border: 2px solid #f86b1d;
              position: absolute;
              top: 0;
              left: -7px;
            }
            .news_time_title {
              text-decoration: none;
              margin-bottom: 10px;
              display: block;
              .hot {
                color: #e95717 !important;
              }
              h3 {
                color: #242735;
                font-size: 16px;
                font-weight: 500;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                .newstime {
                  font-size: 14px;
                  color: #e95717;
                  position: absolute;
                  top: -1px;
                  left: 17px;
                  word-wrap: break-word;
                  word-break: normal;
                  width: 90px;
                  white-space: normal;
                  p {
                    font-size: 12px;
                    color: #999999;
                  }
                }
              }
            }
            .share_btn {
              display: block;
              cursor: pointer;
              text-align: right;
              color: #50546A;
              margin-top: 20px;
              margin-right: 20px;
              img {
                width: 12px;
                height: 12px;
                vertical-align: middle;
                margin-right: 5px;
              }
            }

            .news_container {
              position: relative;
              .news_text {
                display: -webkit-box;
                -webkit-box-orient: vertical;
                overflow: hidden;
                position: relative;
                line-height: 24px;
                color: #242735;
              }
              .show_content {
                position: absolute;
                bottom: -40px;
                right: 10px;
                color: #5480d8;
                text-decoration: underline;
                cursor: pointer;
              }
            }

            .image_box {
              img {
                width: 300px;
                height: 100px;
                &.enlarge {
                  width: 600px;
                  height: 200px;
                }
              }
              .btn {
                user-select: none;
                color: #5480d8;
                text-decoration: underline;
              }
            }
          }
        }
      }
    }
    /* 头条 */
    .news_headline {
      .news_content {
        li {
          width: 100%;
          height: 201px;
          padding: 20px 30px 30px;
          border-bottom: 1px solid #e9e9e9;
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
              img {
                width: 14px;
                height: 14px;
                vertical-align: middle;
                margin-right: 5px;
              }
            }
            .share {
              display: block;
              cursor: pointer;
              img {
                width: 14px;
                height: 16px;
                vertical-align: middle;
                margin-right: 5px;
              }
            }
          }
        }
      }
    }
  }
  .news_right {
    width: 300px;
    position: relative;
    .tofixed {
      position: fixed;
      top: 15px;
    }
    .banner {
      width: 300px;
      height: 144px;
      margin-bottom: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .trend {
      width: 300px;
      height: 325px;
      background: #ffffff;
      padding: 23px 24px 34px;
      h4 {
        font-size: 16px;
        color: #000000;
      }
      ul {
        li {
          border-bottom: 1px solid #e9e9e9;
          display: flex;
          justify-content: space-between;
          align-items: center;
          div {
            padding: 16px 0;
            p {
              font-size: 20px;
              font-family: "Rubik";
              margin-bottom: 3px;
            }
            span {
              color: #50546A;
            }
          }
        }
        li:last-child {
          border: 0;
          display: block;
          p {
            margin-top: 16px;
          }
          div {
            padding: 0;
          }
          .lineColor {
            height: 6px;
            width: 100%;
            margin: 10px 0 7px 0;
            span {
              display: block;
              border-radius: 4px;
            }
            span:nth-child(1) {
              width: 151px;
              height: 6px;
              background: #66ba72;
            }
            span:nth-child(2) {
              width: 97px;
              height: 6px;
              background: #df5755;
            }
          }
          em {
            font-size: 20px;
            font-family: "Rubik";
            margin: 0 5px;
          }
          .green {
            color: #129824;
          }
          .red {
            color: #b40300;
          }
        }
      }
    }
  }
}
</style>