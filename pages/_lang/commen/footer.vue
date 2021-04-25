<template>
  <div class="footer" v-show="$route.name!='lang-login'">
    <div class="contain between">
      <div class="left">
        <div class="ftlogo">
          <img v-if="$i18n.locale == 'cn'" src="@/assets/logo-cn-w@2x.png" alt />
          <img v-else src="@/assets/logo-en-w@2x.png" alt />
        </div>
        <p>{{$t('message.ftlog')}}</p>
        <div style="margin-bottom:10px" v-show="$store.state.locale=='cn'">
          <a
            target="cyxyv"
            href="https://v.yunaq.com/certificate?domain=www.bixiaobao.com&from=label&code=90030"
          >
            <!-- <img src="https://aqyzmedia.yunaq.com/labels/label_sm_90030.png"> -->
          </a>
        </div>
        <div class="blogLink">
          <a href="https://blog.naver.com/bixiaobao" rel="nofollow" target="_blank">
            <svg width="13px" height="15px" viewBox="0 0 13 15" xmlns="http://www.w3.org/2000/svg" class="naver">
              <g transform="translate(-323.000000, -177.000000)">
                <polygon
                  fill="#FFFFFF"
                  fill-rule="nonzero"
                  opacity="0.400000006"
                  points="336 192 336 177 332.390746 177 332.390746 186.523555 332.323907 186.539615 326.625964 177 323 177 323 191.98394 326.625964 191.98394 326.625964 182.460385 326.692802 182.444325 332.407455 192 336 192"
                />
              </g>
            </svg>
          </a>
          <a href="https://twitter.com/BXB_official" rel="nofollow" target="_blank" class="naver">
            <svg
              width="16px"
              height="13px"
              viewBox="0 0 16 13"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#FFFFFF"
                fill-rule="nonzero"
                opacity="0.400000006"
                d="M14.36,3.24c0,.14,0,.28,0,.43A9.27,9.27,0,0,1,5,13a9.3,9.3,0,0,1-5-1.47H0a6.58,6.58,0,0,0,4.86-1.36h0A3.3,3.3,0,0,1,1.79,7.89h0a3.26,3.26,0,0,0,1.49-.06h0A3.27,3.27,0,0,1,.64,4.62v0A3.42,3.42,0,0,0,2.13,5h0A3.3,3.3,0,0,1,.67,2.26,3.25,3.25,0,0,1,1.11.61h0A9.36,9.36,0,0,0,7.88,4h0a3.28,3.28,0,0,1,5.59-3h0A6.45,6.45,0,0,0,15.56.25h0a3.32,3.32,0,0,1-1.44,1.81h0A6.49,6.49,0,0,0,16,1.54h0a6.47,6.47,0,0,1-1.64,1.7Z"
              />
            </svg>
          </a>
        </div>
        <span v-if="$store.state.locale=='cn'">
          Copyright &copy;2020 bixiaobao.com Ltd All Rights Reserved
          <a
            href="https://beian.miit.gov.cn/"
            style="color:#ffffff;"
            rel="nofollow"
            target="_blank"
          >京ICP备19004204号-5</a>
        </span>
        <span v-else>Copyright &copy;2020 bixiaobao.com Ltd All Rights Reserved</span>
      </div>
      <div class="right between">
        <ul>
          <li v-for="(item,index) in list_our" :key="index">
            <a :href="item.url">{{item.name}}</a>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in list_serve" :key="index">
            <a :href="item.url">{{item.name}}</a>
          </li>
        </ul>
        <ul>
          <li v-for="(item,index) in list_more" :key="index">
            <a :href="'/'+$store.state.locale+item.url">{{item.name}}</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- <div
      class="friendShipLink"
      v-show="pageRouter == '/cn' || pageRouter == '/en' || pageRouter == '/ru' || pageRouter == '/kr' || pageRouter == '/tw'"
    >
      <ul class="flex">
        <li>{{$t('message.友情链接')}}:</li>
        <li v-for="(item,index) in friendLink" :key="index">
          <a :href="item.url" rel="nofollow">{{item.title}}</a>
        </li>
      </ul>
    </div>-->
  </div>
</template>

<script>
import bus from "../../../components/mid.js";
export default {
  middleware: "homeFooter",
  name: "Footer",
  data() {
    return {
      list_our: [],
      list_serve: [],
      list_more: [],
      language: this.$store.state.language,
      pageRouter: "",
      friendLink: []
    };
  },
  created() {
    this.loadData(this.$store.state.language);
    bus.$on("toSetLan", data => {
      if (data == "cn") {
        this.loadData("zh_CN");
      } else if (data == "kr") {
        this.loadData("ko_KR");
      } else if (data == "en") {
        this.loadData("en");
      } else if (data == "tw") {
        this.loadData("zh_tw");
      } else this.loadData("ru");
    });
    // this.pageRouter = this.$cookies.get("homeRoute");
    // console.log(this.pageRouter,123123123)
  },
  mounted() {
    // if (
    //   this.pageRouter == "/cn" ||
    //   this.pageRouter == "/en" ||
    //   this.pageRouter == "/ru" ||
    //   this.pageRouter == "/kr" ||
    //   this.pageRouter == "/tw"
    // ) {
    //   this.handleGetFriendLink();
    // }
  },
  methods: {
    loadData(language) {
      this.$axios
        .get("nav/footer/list/?language=" + language)
        .then(({ data }) => {
          this.list_our = data.data[0];
          this.list_serve = data.data[1];
          this.list_more = data.data[2];
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleGetFriendLink() {
      this.$axios
        .get("account/friendshiplinks/")
        .then(({ data }) => {
          this.friendLink = data.data;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="scss">
.footer {
  width: 100%;
  background: #282b40;
  .contain,
  .friendShipLink {
    width: 1280px;
    margin: 0 auto;
  }
  .left {
    width: 50%;
    padding-bottom: 40px;
    .ftlogo img {
      width: 150px;
      margin-top: 36px;
      opacity: .6;
    }
    p {
      color: #fff;
      font-size: 14px;
      margin: 27px 0 18px 0;
      opacity: .6;
    }
    span {
      color: #fff;
      font-size: 14px;
      opacity: .6;
    }
    .blogLink{
      margin-bottom: 12px;
      a:last-child{
        margin-left: 20px;
      }
      .naver:hover{
        path{
          opacity: .8;
        }
        polygon{
          opacity: .8;
        }
      }
    }
  }
  .right {
    width: 342px;
    height: 133px;
    padding-top: 48px;
    ul {
      font-size: 14px;
      li {
        color: #ffffff;
        line-height: 24px;
        a {
          color: #ffffff;
          opacity: .6;
          &:hover {
            color: #ffffff;
            opacity: .8;
          }
        }
      }
      li:first-child {
        margin-bottom: 17px;
        color: #fff;
        a {
          color: #fff;
          font-weight: 500;
          opacity: .8;
        }
      }
    }
  }
  .friendShipLink {
    ul {
      height: 50px;
      line-height: 50px;
      li {
        color: #898c9e;
        a {
          color: #898c9e;
          padding-left: 10px;
        }
      }
    }
  }
}
</style>

