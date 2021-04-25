<template>
  <div class="">
    <myheader />
    <div class="container">
      <div class="main">
        <h1> Uh. oh... </h1>
        <div>
          <p style="font-size:30px;margin-bottom:0;"> <strong>迷路了吧</strong> </p>
          <p style="font-size:18px;"> <strong>I think we're lost</strong> </p>
          
        </div>
        <p>访问的这个页面不存在</p>
          <p>We couldn't find your page</p>
        <!-- <nuxt-link :to="'/'+$i18n.locale+'/'">Back Home</nuxt-link> -->
        <!-- <div>{{count}}秒后跳回首页</div> -->
      </div>
    </div>
   
  </div>
</template>

<script>
import myheader from "~/pages/_lang/commen/header";
export default {
  props: ["error"],
  layout: "blog", // 你可以为错误页面指定自定义的布局
  components: {
    myheader
  },
  data() {
    return {
      timer: null,
      count: ""
    };
  },
  methods: {
    // handleGotoHomePage() {
    //   let routeUrl = this.$router.resolve({
    //     path: "/"+ this.$i18n.locale
    //   });
    //   window.open(routeUrl.href, "_self");
    // },
    // handleCountdown() {
    //   const TIME_COUNT = 5;
    //   if (!this.timer) {
    //     this.count = TIME_COUNT;
    //     this.timer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.count--;
    //       } else {
    //         clearInterval(this.timer);
    //         this.timer = null;
    //         this.handleGotoHomePage()
    //       }
    //     }, 1000);
    //   }
    // }
  },
  mounted() {
    // this.handleCountdown();
  }
};
</script>
<style lang="scss" scoped>
.container {
  .main {
    min-width:1200px;
    @media screen and (min-width:1200px){
      width: 1200px;
    }
    @media screen and (min-width:1440px){
      width: 1400px;
    }
    margin: 20px auto 50px;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 3px 5px rgba(0, 0, 0, 0.05);
    text-align: center;
    min-height: 800px;
    padding-top: 200px;
    color: #444;
    h1 {
      font-size: 30px;
    }
    div{
      margin-bottom: 40px;
p{
      margin-bottom: 10px;
    }
    }
    
  }
}
</style>