<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="news margin flex">
      <div class="container">
        <div class="breadcrumb">
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item
              ><a href="/">{{ $t("message.首页") }}</a></el-breadcrumb-item
            >
            <el-breadcrumb-item
              ><a :href="'/' + $i18n.locale + '/news/list'">{{
                $t("message.资讯")
              }}</a></el-breadcrumb-item
            >
            <el-breadcrumb-item>{{
              $t("message.资讯详情")
            }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="cons">
          <h1>{{ newsData.title || "" }}</h1>
          <div class="infos">
            <span>{{ newsData.author || "" }}</span>
            {{ newsData.crate_date | changeFormatDate }}
          </div>
          <div class="datails" v-html="newsData.content || ''"></div>
        </div>
        <div class="btns">
          <div v-if="LastLink.id">
            {{ $t("message.上一篇") }}：<a
              :href="'/' + $i18n.locale + '/news/' + LastLink.id"
              >{{ LastLink.title || "" }}</a
            >
          </div>
          <div v-else>{{ $t("message.上一篇") }}：{{ $t("message.无") }}</div>
          <div v-if="NextLink.id">
            {{ $t("message.下一篇") }}：<a
              :href="'/' + $i18n.locale + '/news/' + NextLink.id"
              >{{ NextLink.title || "" }}</a
            >
          </div>
          <div v-else>
            {{ $t("message.下一篇") }}：{{ $t("message.没有了") }}
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
      titleTemplate: this.newsData.title,
      meta: [
        {
          hid: "kewords",
          name: "keywords",
          content: this.$t("news.keywords"),
        },
        {
          hid: "description",
          name: "description",
          content: this.$t("news.description"),
        },
      ],
    };
  },
  name: "datailList",
  data() {
    return {
      newsData: [],
      NextLink: [],
      LastLink: [],
      seoData: []
    };
  },
  async asyncData({ $axios, params ,error}) {
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
    // let {atcdata} =  await Promise.all([
    //     $axios.get( "news/quick/?language=zh_CN")
    // ]);
    // return {
    //     // newsData:seoData.data.article,
    //     // NextLink:seoData.data.next_title,
    //     // LastLink:seoData.data.previous_title
    //     seoData:atcdata.data.results
    // };
    let str = params.id
    if(str.indexOf(".html")!= -1){
       str = str.match(/(\S*).html/)[1];
    }
    try{
      const { data } = await $axios.get("article/detail/" + str + "/?language=" + urdata)
      return {
        newsData: data.data.article,
        NextLink: data.data.next_title,
        LastLink: data.data.previous_title,
      };
    }catch(err){
      error({ statusCode: 404, message: '页面未找到' })
    }
    
  },

  created() {
    console.log(this.error);
  },
  components: {
    // 组件的引用
    // myheader,
  },
  methods: {
    setLang(msg) {},
    loadData(id) {
      this.$axios.get("article/detail/" + id + "/").then(({ sdata }) => {
        this.newsData = sdata.data.article;
        this.NextLink = sdata.data.next_title;
        this.LastLink = sdata.data.previous_title;
      });
    },
  },
  mounted() {
    // this.loadData(this.$route.params.id)
  },
};
</script>
<style lang="scss">
.news {
  width: 100%;
  min-height: 800px;
  .container {
    width: 1280px;
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 40px 50px;
    .breadcrumb {
      margin-bottom: 50px;
    }
    .cons {
      width: 820px;
      margin: 0 auto;
      h1 {
        text-align: center;
        font-size: 22px;
        font-weight: 500;
      }
      .infos {
        text-align: center;
        padding: 30px 0;
        margin-bottom: 20px;
        border-bottom: 1px solid #eeeeee;
        color: #A1A6B4;
        span {
          margin-right: 20px;
        }
      }
      .datails {
        min-height: 500px;
        overflow: hidden;
        font-family: Helvetica, Arial, sans-serif !important;
        font-size: 16px;
        line-height: 28px;
        img {
          max-width: 85% !important;
          display: block;
          margin: 0 auto;
        }
        strong {
          font-weight: bold;
        }
        p {
          margin-bottom: 20px;
          line-height: 28px;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          margin-bottom: 15px;
        }
        h1 {
          text-align: left;
          padding-top: 20px;
        }
        blockquote {
          border-left: 6px solid #ddd;
          padding: 5px 0 5px 10px;
          margin: 15px 0 20px 15px;
          color: #888888;
          p{
            margin-bottom: 0;
          }
        }
        h2 {
          padding-top: 24px;
        }
        li {
          line-height: 28px;
          list-style: inside;
          margin-bottom: 20px;
        }
      }
    }
  }
}
</style>