<template>
  <div id="app" :class="$route.name=='lang-login'?'nobg':''">
    <!-- <myheader/> -->
    <Nuxt v-if="toggleFlag" />
    <Footer v-if="$route.name!='lang-login'" />
    <!-- <login  /> -->
  </div>
</template>

<script>
// import myheader from '~/pages/_lang/commen/header'
const Cookie = process.client ? require("js-cookie") : undefined;
// import myfooter from "~/pages/_lang/commen/footer";
import login from "~/pages/_lang/commen/login";

export default {
  name: "default",
  provide() {
    // 在app组件这提供一个方法
    return {
      reload: this.reload
    };
  },
  head() {
    return {
      htmlAttrs: {
        lang:
          this.$route.params.lang == "cn"
            ? "zh"
            : this.$route.params.lang == null
            ? "zh"
            : this.$route.params.lang
      }
    };
  },
  data() {
    return {
      toggleFlag: true,
      togglelogin: false,
      config: [],
      currency: this.$store.state.currency,
      langOptions: [
        {
          value: "1",
          label: "简体中文",
          code: "zh_CN",
          id: "cn",
          url: require("~/assets/China.png")
        },
        {
          value: "2",
          label: "繁体中文",
          code: "zh_tw",
          id: "tw",
          url: require("~/assets/China.png")
        },
        {
          value: "3",
          label: "韩语",
          code: "ko_KR",
          id: "kr",
          url: require("~/assets/Korea.png")
        },
        {
          value: "4",
          label: "English",
          code: "en",
          id: "en",
          url: require("~/assets/USA.png")
        },
        {
          value: "5",
          label: "俄语",
          code: "ru",
          id: "ru",
          url: require("~/assets/Russia.png")
        }
      ]
    };
  },

  created() {
    this.getconfigdata();

    // if(this.$store.state.langlist!=''){
    //   this.$i18n.mergeLocaleMessage('cn', this.$store.state.langlist.zh_CN)
    //   this.$i18n.mergeLocaleMessage('kr', this.$store.state.langlist.ko_KR)
    //   this.$i18n.mergeLocaleMessage('en', this.$store.state.langlist.en)
    //   this.$i18n.mergeLocaleMessage('ru', this.$store.state.langlist.ru)
    // }
  },
  components: {
    // myheader,
    // myfooter,
    login
  },
  methods: {
    openlogin() {
      this.togglelogin = true;
      this.$nextTick(function() {
        this.togglelogin = false;
      });
    },
    reload() {
      this.toggleFlag = false;
      //等v-if重载渲染后再把值赋值回来重新再渲染
      this.$nextTick(function() {
        this.toggleFlag = true;
      });
    },
    getconfigdata() {
      let cookieToken = this.$cookies.get("token");

      if (this.$store.state.config == "") {
        this.$axios
          .get("global/info/", {
            params: {
              currency: this.currency,
              language: this.$store.state.language
            }
          })
          .then(({ data }) => {
            let mydate = data.data;
            this.$store.commit("configadd", mydate);
            this.$store.commit("setusdt", data.data.usdt_price);
            this.uniqueArr(this.langOptions, data.data.language);
          })
          .catch(err => {
            console.log(err);
          });
      }
      if (this.$store.state.ratelist == "") {
        this.$axios
          .get("global/currency/")
          .then(({ data }) => {
            this.$store.commit("setRate", data.data.results);
          })
          .catch(err => {
            console.log(err);
          });
      }

      if (cookieToken) {
        this.$axios
          .get("account/info/?t=" + this.$store.state.newtime, {
            headers: {
              Authorization: "BIXIAOBAO " + cookieToken
            }
          })
          .then(({ data }) => {
            if (data.status == 1) {
              this.$store.commit("setUserinfo", data.data);
              Cookie.set("USER_INVITE", data.data.invite);
              Cookie.set("prize", data.data.prize);
            } else {
              // console.log(msg)
              this.$cookies.remove("token");
            }
          })
          .catch(err => {
            // alert(err);
            this.$cookies.remove("token");
            this.$router.push("/");
            this.$store.commit("logout", false);
          });
      } else {
        console.log("No Token");
        this.$store.commit("logout", false);
      }
    },
    uniqueArr(arr1, arr2) {
      let arr3 = [];
      for (let i = 0; i < arr1.length; i++) {
        let newarr = { ...arr1[i], ...arr2[i] };
        arr3.push(newarr);
      }
      this.langOptions = arr3;
      this.$store.commit("setHdLgLst", arr3);
    }
  },

  mounted() {
    if (window.WEB_LOCALES) {
      this.$store.commit("setLang", window.WEB_LOCALES);
      this.$i18n.mergeLocaleMessage("cn", window.WEB_LOCALES.zh_CN);
      this.$i18n.mergeLocaleMessage("kr", window.WEB_LOCALES.ko_KR);
      this.$i18n.mergeLocaleMessage("en", window.WEB_LOCALES.en);
      this.$i18n.mergeLocaleMessage("ru", window.WEB_LOCALES.ru);
      this.$i18n.mergeLocaleMessage("tw", window.WEB_LOCALES.zh_tw);
      // this.reload()
    }

    // let isMobile = (ua) => {
    //   return !!ua.match(/(Android|webOS|iPhone|iPod|tablet|BlackBerry|Mobile)/);
    // };
    // if (process.browser) {
    //   let ua = navigator.userAgent;
    //   if (isMobile(ua)) {
    //     window.location.href ='https://m.bixiaobao.com/'
    //     console.log("mobile");
    //   } else {
    //     console.log("pc");
    //   }
    // }
  }
};
</script>
<style lang="scss" scoped>
.container {
  width: 1280px;
  margin: 0 auto;
}
</style>
<style lang="scss">
@import "@/assets/css/common.scss";
@import "@/assets/css/home.scss";
.el-notification__content {
  p {
    line-height: 12px !important;
  }
}
.el-dialog {
  border-radius: 10px !important;
}
.now_coin_all {
  position: relative;
  .ivu-table-wrapper {
    * {
      border: 0 !important;
    }
  }
  .ivu-table-tbody {
    .ivu-table-row {
      border-bottom: 1px solid #e9e9e9 !important;
    }
    tr.ivu-table-row-hover {
      td {
        background: #f5f8ff;
      }
    }
  }
  .ivu-table {
    font-size: 14px;
    th {
      height: 48px;
      color: #515a6e;
    }
    td {
      padding: 12px 0;
      cursor: pointer;
      a {
        color: #50546a;
        &:hover {
          text-decoration: underline;
        }
      }
    }
    &:before {
      display: none !important;
    }
    //  .ivu-table-sort{
    //     i.on{
    //       color: #F86B1D;
    //     }
    //  }
  }
  .ivu-table:after {
    display: none !important;
  }
  .ivu-table-wrapper {
    border: 0;
  }
  .ivu-table-header {
    table {
      position: sticky;
      top: 0px;
    }
  }
  .ivu-table-cell {
    padding: 0 5px;
    padding-left: 0;
  }
}
</style>

