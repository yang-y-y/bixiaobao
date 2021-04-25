<template>
  <div>
    <Header />
    <div class="news margin flex">
      <div class="news_left box">
        <div class="news_nav">
          <div class="news_header_nav">
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item
                ><a :href="'/' + $i18n.locale">{{
                  $t("message.首页")
                }}</a></el-breadcrumb-item
              >
              <el-breadcrumb-item
                ><a
                  :href="'/' + $i18n.locale + '/coinlist/' + $route.params.id"
                  >{{ coininfo.token }}</a
                ></el-breadcrumb-item
              >
              <el-breadcrumb-item
                >{{ coininfo.token
                }}{{ $t("message.专栏") }}</el-breadcrumb-item
              >
            </el-breadcrumb>
          </div>
          <div class="coin_datails">
            <dl>
              <dt>
                <img
                  :src="$store.state.bixiaobao + coininfo.logo_m"
                  :alt="coininfo.token"
                />
              </dt>
              <dd>
                <div class="headtitle">
                  {{ coininfo.token }} 
                  <span>{{ coininfo.name_en }}</span>
                  <span>{{ coininfo.name_cn }}</span>
                </div>
                <div class="market">
                  {{ $t("message.市值排名") }}：{{
                    coininfo.market_value_index
                  }}
                </div>
                <div class="links">
                  <div>
                    {{ $t("message.官网地址") }}：
                    <a
                      :href="item"
                      v-for="(item, key, index) in aboutUrl"
                      :key="index"
                      target="_blank"
                      rel="nofollow"
                      >{{ $t("message.网址") }}{{ Number(key + 1) }}</a
                    >
                  </div>
                  <div>
                    {{ $t("message.白皮书") }}：<a
                      :href="coininfo.whitepaper"
                      target="_blank"
                      rel="nofollow"
                      >PDF</a
                    >
                  </div>
                </div>
                <div v-html="coininfo.summary"></div>
                <div class="morelink">
                  <a
                    :href="'/' + $i18n.locale + '/coinlist/' + $route.params.id" :title="'更多' + coininfo.token +'信息'"
                    >{{ $t("message.查看详情") }}</a
                  >
                </div>
              </dd>
            </dl>
          </div>
          <!-- 头条 -->
          <div v-show="newsNavIdx == 0" class="news_headline">
            <ul class="news_content">
              <li
                class="itemCenter"
                v-for="(item, index) in newsList"
                :key="index"
              >
                <a
                  :href="
                    'https://www.bixiaobao.com/' +
                    $i18n.locale +
                    '/news/blockchain_news_' +
                    item.id +
                    '.html'
                  "
                  rel="nofollow"
                  ><img
                    :src="$store.state.bixiaobao + item.t_img"
                    :alt="item.title"
                  />
                </a>
                <div class="box_container">
                  <h3>
                    <a
                      :href="
                        'https://www.bixiaobao.com/' +
                        $i18n.locale +
                        '/news/blockchain_news_' +
                        item.id +
                        '.html'
                      "
                      :title="item.title"
                      >{{ item.title }}</a
                    >
                  </h3>
                  <p>
                    <a
                      :href="
                        'https://www.bixiaobao.com/' +
                        $i18n.locale +
                        '/news/blockchain_news_' +
                        item.id +
                        '.html'
                      "
                      rel="nofollow"
                      >{{ item.description }}</a
                    >
                  </p>
                  <div class="itemBetween timeCon">
                    <div class="time">
                      <span>{{ item.auth_release_time }}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="pages">
              <div class="lastbtn" v-show="page > 1">
                <a
                  :href="
                    '/' +
                    $i18n.locale +
                    '/blockchain_news/' +
                    $route.params.id +
                    '/?page=' +
                    (Number(page) - 1)
                  "
                  >{{ $t("message.上一页") }}</a
                >
              </div>
              <ul>
                <li v-for="index in per_page" :key="index">
                  <a
                    v-if="page != index"
                    :href="
                      '/' +
                      $i18n.locale +
                      '/blockchain_news/' +
                      $route.params.id +
                      '/?page=' +
                      index
                    "
                    >{{ index }}</a
                  >
                  <a v-else class="cur">{{ index }}</a>
                </li>
              </ul>
              <div class="nextbtn" v-show="page < per_page">
                <a
                  :href="
                    '/' +
                    $i18n.locale +
                    '/blockchain_news/' +
                    $route.params.id +
                    '/?page=' +
                    (Number(page) + 1)
                  "
                  >{{ $t("message.下一页") }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="news_right rightlist">
        <div :class="barFixed ? 'tofixed' : ''">
          <div class="trend box">
            <h4>{{ $t("message.其它专栏文章") }}</h4>
            <ul v-if="rightList ? rightList : []">
              <li v-for="(item, index) in rightList" :key="index">
                <a
                  :href="
                    'https://www.bixiaobao.com/' +
                    $i18n.locale +
                    '/news/blockchain_news_' +
                    item.id +
                    '.html'
                  "
                  :title="item.title"
                  >{{ item.title }}</a
                >
              </li>
            </ul>
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
      titleTemplate: this.title,
      meta: [
        {
          hid: "kewords",
          name: "keywords",
          content: this.keywords,
        },
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
      ],
    };
  },
  props: {
    // 父辈向子辈传参
  },
  name: "index",
  data() {
    return {
      title: "",
      keywords: "",
      description: "",
      news_nav: ["快讯"],
      newsNavIdx: 0,
      newsList: [],
      rightList: [],
      coininfo: [],
      page: 1,
      barFixed: false,
      per_page: 1,
      pageCount: 1,
      aboutUrl: [],
    };
  },
  async asyncData({ $axios, $cookies, params, query }) {
    let urdata = "";
    if (params.lang == "cn") {
      urdata = "zh_CN";
    } else if (params.lang == "kr") {
      urdata = "ko_KR";
    } else if (params.lang == "ru") {
      urdata = "ru";
    } else {
      urdata = "en";
    }
    let pages = Number(query.page) || 1;
    let str = params.id
    if(str.indexOf(".html")!= -1){
       str = str.match(/(\S*).html/)[1];
    }
    let [infoData, listData, rightData] = await Promise.all([
      $axios
        .get("/token/detailsimple/" + str + "/?language=" + urdata)
        .catch((err) => {
          console.log(err);
        }),
      $axios
        .get(
          "/article/column/" +
            str +
            "/?language=" +
            urdata +
            "&page=" +
            pages +
            "&limit=all"
        )
        .catch((err) => {
          console.log(err);
        }),
      $axios.get("/article/column/?language=" + urdata).catch((err) => {
        console.log(err);
      }),
    ]);
    let urlAll = infoData.data.data.siteurl;
    let newUrl = [];
    if (urlAll) {
      newUrl = JSON.parse(urlAll);
    }
    return {
      title: infoData.data.data.seo.title,
      keywords: infoData.data.data.seo.keywords,
      description: infoData.data.data.seo.description,
      coininfo: infoData.data.data,
      newsList: listData.data.data.results,
      rightList: rightData.data.data.results,
      per_page: listData.data.data.pages,
      pageCount: listData.data.data.count,
      page: pages,
      aboutUrl: newUrl,
    };
  },
  created() {
    // 实例被创建之后执行代码
    // this.getNewslist()
    // console.log(this.per_page);
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // myheader,
  },
  methods: {
    // 方法
    loadData() {
      // http://18.163.114.150/api/news/quick/
      this.$axios
        .get("/token/detailsimple/" + this.$route.params.id + "/", {
          params: { language: this.$store.state.language },
        })
        .then(({ data }) => {
          // console.log(data);
        });
    },
    getNewslist() {
      this.$axios
        .get("/article/column/" + this.$route.params.id + "/", {
          params: {
            language: this.$store.state.language,
            limit: 5,
          },
        })
        .then(({ data }) => {
          this.newslist = data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 页面进入时加载内容
  },
  watch: {
    // 监测变化
  },
};
</script>
<style scoped lang='scss'>
.news {
  width: 1280px;
  min-height: 800px;
  margin: 0 auto;
  justify-content: space-between;

  .news_left {
    width: 960px;
    min-height: 900px;
    background: #ffffff;
    padding: 15px 30px 0;
    .pages {
      margin-bottom: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      .lastbtn,
      .nextbtn {
        height: 30px;
        padding: 0 4px;
        a {
          line-height: 30px;
          padding: 0 10px;
          display: inline-block;
          border: 1px solid #CDCFD8;
          border-radius: 4px;
          color: #707380;
          background: #F7F8FA;
          &:hover {
            color: #5480D8;
            border-color: #5480D8;
          }
        }
      }
      ul {
        li {
          display: inline-block;
          width: 40px;
          margin: 0 4px;

          a {
            display: inline-block;
            width: 100%;
            line-height: 30px;
            text-align: center;
            border: 1px solid #CDCFD8;
            border-radius: 4px;
            color: #707380;
            background: #F7F8FA;
            &:hover {
              color: #5480D8;
              border-color: #5480D8;
            }
          }
          a.cur {
            color: #5480D8;
            border-color: #5480D8;
          }
        }
      }
    }
    .news_nav {
      .news_header_nav {
        border-bottom: 1px solid #e9e9e9;
        padding: 38px 0 20px 20px;
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
    .coin_datails {
      dl {
        display: flex;
        justify-content: space-between;
        margin-bottom: 30px;
        border-bottom: 1px solid #E9E9E9;
        padding: 28px 0;
        dt {
          width: 50px;
          margin-right: 48px;
          margin-left: 20px;
          text-align: center;
          img {
            border-radius: 25px;
          }
        }
        dd {
          width: 100%;
          .morelink {
            text-align: right;
          }
          .headtitle {
            margin-bottom: 6px;
            font-size: 20px;
            span {
              display: inline-block;
              margin: 0 5px;
            }
            span,
            font {
              font-size: 14px;
            }
          }
          .market {
            color: #E95515;
            margin-bottom: 6px;
          }
          .links {
            display: flex;
            justify-content: left;
            margin-bottom: 10px;
            div {
              margin-right: 30px;
            }
          }
        }
      }
    }
    .news_flash {
      padding-top: 40px;
      .page_scroll_tip {
        text-align: center;
        padding: 20px 0;
      }
      ul {
        padding-left: 40px;
        li {
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
          a {
            color: #242735;
            &:hover {
              color: #5480d8;
            }
          }
          img {
            width: 230px;
            height: 140px;
            border-radius: 4px;
          }
          .box_container {
            margin-left: 30px;
            height: 100%;
            display: flex;
            flex-direction: column;
            h3 {
              color: #242735;
              font-size: 16px;
              font-weight: 500;
              margin: 10px 0;
            }
            p {
              color: #242735;
            }
            .timeCon {
              margin-top: auto;
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
      min-height: 325px;

      background: #ffffff;
      padding: 23px 24px 34px;

      ul {
        li {
          padding: 5px 0;
          a {
            color: #50546A;
            &:hover {
              color: #5480D8;
            }
          }
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
      h4 {
        font-size: 16px;
        color: #000000;
        margin-bottom: 10px;
      }
    }
  }
}
</style>