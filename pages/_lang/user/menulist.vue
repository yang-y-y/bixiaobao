<template>
  <div class="leftMenu">
    <div class="menu box">
      <div class="menuList" v-for="(item,index) in menuData" :key="index">
        <div class="title">{{$t('message')[item.title]}}</div>
        <ul>
          <li
            v-for="(itemList,index) in item.listData"
            :key="index"
            @click="handleCsutomTab(itemList.id,itemList.isopen)"
            :class="pageindex==itemList.id?'active':''"
          >
            <span :class="itemList.isopen?'open':'close'">{{$t('message')[itemList.name]}}</span>
            <i class="el-icon-arrow-right"></i>
          </li>
        </ul>
      </div>
    </div>
    <div class="logout box">
      <div @click="logout">{{$t('message.退出登录')}}</div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  props: ["pageindex", "onload"],
  data() {
    return {
      walletdata: [],
      menuData: [
        {
          title: "个人设置",
          listData: [
            {
              name: "账号信息",
              id: "mycenter",
              isopen: true
            }
          ]
        },
        {
          title: "挖矿BXB",
          listData: [
            {
              name: "我的矿机",
              id: "product",
              isopen: true
            },
            {
              name: "购买矿机",
              id: "productlist",
              isopen: true
            }
          ]
        },
        {
          title: "我的钱包",
          listData: [
            {
              name: "我的BXB",
              id: "wallet",
              isopen: true
            },
            {
              name: "我要充币",
              id: "recharge",
              isopen: true
            },
            {
              name: "我要提币",
              id: "extract",
              isopen: true
            }
          ]
        },
        {
          title: "邀请",
          listData: [
            {
              name: "我的邀请",
              id: "invite",
              isopen: true
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleCsutomTab(value, bool) {
      if (!bool) return false;
      let lang = this.$store.state.locale;

      if (value == "mycenter") {
        this.$router.push("/" + lang + "/user");
      } else {
        this.$router.push("/" + lang + "/user/" + value);
      }
    },
    logout() {
      Cookie.remove("token");
      this.$store.commit("logout", false);
      this.$router.push({ path: "/" });
    },
    loadData(bool) {
      console.log(bool);
      if (!this.$store.state.wallet) return false;
      if (!bool) return false;
      let cookieToken = this.$cookies.get("token");
      this.$axios
        .get("account/wallet/?t=" + this.$store.state.newtime, {
          headers: {
            Authorization: "BIXIAOBAO " + cookieToken
          }
        })
        .then(({ data }) => {
          // this.walletdata = data.data
          this.$store.commit("setWallet", data.data);
          this.$emit("loadData", data.data);
          setTimeout(() => {
            this.loading = false;
          }, 2000);
        })
        .catch(err => {
          alert(err);
          // this.$router.push('/')
        });
    }
  },
  mounted() {
    this.loadData(Boolean(this.onload));
  }
};
</script>
<style lang="scss" scoped>
@import "~/pages/_lang/user/user.scss";
</style>