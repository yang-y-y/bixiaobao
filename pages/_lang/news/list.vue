<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="news margin flex">
      <div class="news_left box">
        <div class="news_nav">
          <ul class="itemCenter news_header_nav">
            <li>
              <a :href="'/' + $i18n.locale + '/news'">{{$t('message.快讯')}}</a>
            </li>
            <li
              v-for="(item,index) in news_nav"
              :key="index"
              @click="handleNewsNav(index)"
              :class="index == newsNavIdx ? 'active':''"
            >{{$t('message')[item]}}</li>
          </ul>
          <!-- 资讯 -->
          <div v-show="newsNavIdx ==0" class="news_headline">
            <ul class="news_content">
              <li class="itemCenter" v-for="(item,index) in listData" :key="index">
                <img :src="$store.state.bixiaobao + item.image" :alt="item.title" />
                <div class="box_container">
                  <h3>
                    <a
                      :href="'/'+$route.params.lang+'/news/'+item.id+'.html'"
                      target="_blank"
                    >{{item.title}}</a>
                  </h3>
                  <p>{{item.description}}</p>
                  <div class="itemBetween">
                    <div class="time">
                      <img src="@/assets/time.png" alt />
                      <span>{{item.timestamp|changeFormatDate}}</span>
                    </div>
                    <div class="share">
                      <span>{{item.author}}</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <div class="pages">
              <el-pagination
                background
                layout="prev, pager, next"
                :total="pageCount?pageCount:0"
                @current-change="handleCurrentChange"
                :page-size="10"
                :hide-on-single-page="true"
                :current-page="page"
              ></el-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "newslist",
  watchQuery: ["page"],
  components: {
    // 组件的引用
  },
  props: {
    // 父辈向子辈传参
  },
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
  async asyncData({ $axios, query, params }) {
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
    const { data } = await $axios.get(
      "/article/newlist/?language=" + urdata + "&page=" + pages
    );
    return {
      listData: data.data.results,
      pageCount: data.data.count,
      page: pages
    };
  },
  // 数据
  data() {
    return {
      news_nav: ["资讯"],
      newsNavIdx: 0,
      listData: [],
      page: 1,
      pageCount: ""
    };
  },
  // 方法
  methods: {
    handleNewsNav,
    loadData(page) {
      this.$axios
        .get("article/newlist/", {
          params: {
            language: this.$store.state.language,
            page: page
          }
        })
        .then(({ data }) => {
          this.listData = data.data.results;
        });
    },
    // 切换语言
    setLang(msg) {
      this.listData = [];
      this.loadData(1);
    },
    // 页码数变化
    handleCurrentChange(val) {
      this.page = val;
      this.$router.push({
        path: "/" + this.$i18n.locale + "/news/list/",
        query: { page: val }
      });
    }
  },
  // 实例被创建之后执行代码
  created() {},
  // 计算属性
  computed: {},
  // 页面进入时加载内容
  mounted() {},
  // 监测变化
  watch: {}
};
function handleNewsNav(idx) {
  this.newsNavIdx = idx;
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
      /* 资讯 */
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
              width: 100%;
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
        .pages {
          margin-bottom: 50px;
        }
      }
    }
  }
}
</style>