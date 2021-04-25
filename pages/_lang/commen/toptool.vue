<template>
  <div class="tools">
    <el-dropdown @command="handleChangeRate">
      <div class="el-dropdown-link">
        <span>{{$store.state.curRate}} {{$store.state.currency}}</span>
        <i
          class="el-icon-arrow-down el-icon--right"
        ></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="item in $store.state.ratelist"
          :key="item.code"
          :command="beforeHandleCommand(item.symbol,item.code)"
        >{{item.symbol}} {{item.code}}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <el-dropdown @command="handleChange">
      <div class="el-dropdown-link">
        <img class="countryIcon" v-if="$i18n.locale=='cn'" src="@/assets/China.png" />
        <img class="countryIcon" v-if="$i18n.locale=='tw'" src="@/assets/China.png" />
        <img class="countryIcon" v-if="$i18n.locale=='kr'" src="@/assets/Korea.png" />
        <img class="countryIcon" v-if="$i18n.locale=='en'" src="@/assets/USA.png" />
        <img class="countryIcon" v-if="$i18n.locale=='ru'" src="@/assets/Russia.png" />
        <span>{{$i18n.locale=='cn'?$t("message.简体中文"):$i18n.locale=='kr'?$t("message.韩语"):$i18n.locale=='en'?$t("message.English"):$i18n.locale=='ru'?$t("message.俄语"):$t("message.繁体中文")}}</span>
        <i
          class="el-icon-arrow-down el-icon--right"
        ></i>
      </div>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in $store.state.HeadLang" :key="item.id" :command="item.id">
          <img :src="item.url" alt="国家图标" style="width:20px;height:14px;margin:1px 10px 0 0;"/>
          <span v-if="item.lang_status">{{ $t("message")[item.label] }}</span>
          <span v-else></span>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>
<script>
import bus from "../../../components/mid.js";
const Cookie = process.client ? require("js-cookie") : undefined;
import storage from "good-storage"; //引入good-storage包
export default {
  name: "tools",
  watchQuery: true,
  beforeCreate() {},
  props: {
    // 父辈向子辈传参
  },
  created: function() {},
  data() {
    return {
      currency: "USD",
      language: this.$store.state.language
    };
  },
  methods: {
    handleChange,
    handleChangeRate,
    beforeHandleCommand(symbol, code) {
      return {
        symbol: symbol,
        code: code
      };
    },
    toParent: function(currency) {
      this.$emit("toParent", currency);
    },
    toSetlang: function(language) {
      this.$emit("language", language);
    }
  },
  components: {},
  mounted() {}
};
function handleChange(command) {
  //语言
  bus.$emit("toSetLan", command);
  this.$i18n.locale = command;
  this.$store.commit("SET_LANG", command);
  this.$emit("toSetlang", command);
  // this.$router.go(0)
  Cookie.set("lang", command);
  // this.reload()
  // this.$router.go(0)

  // let lang = this.$cookies.get('lang')
  let getpath = this.$route.path;
  let newpath = getpath.split("/")[2];
  let newpathtwo = getpath.split("/")[3] || "";

  //  this.$router.push({path:'/'+lang+'',query: {lang: "2"}})
  if (newpath == "about") {
    this.$router.push({
      path: "/" + command + "/" + newpath + "/" + newpathtwo
    });
    return false;
  }
  if (newpath == "search") {
    this.$router.push({
      path: "/" + command + "/" + newpath + "/?q=" + this.$route.query.q
    });
    return false;
  }
  if (newpath == "user") {
    this.$router.push({
      path: "/" + command + "/" + newpath + "/" + newpathtwo
    });
    return false;
  }
  if (newpath == "coinlist") {
    this.$router.push({
      path: "/" + command + "/" + newpath + "/" + newpathtwo
    });
    return false;
  }
  if (this.$route.params.id && newpath) {
    this.$router.push({
      path: "/" + command + "/" + newpath + "/" + this.$route.params.id
    });
  } else if (this.$route.params.lang && newpath && !this.$route.params.id) {
    this.$router.push({ path: "/" + command + "/" + newpath });
  } else if (!this.$route.params.lang) {
    this.$router.push({ path: "/" + command + getpath });
  } else {
    this.$router.push({ path: "/" + command });
  }
}
function handleChangeRate(command) {
  //汇率
  this.loading = true;
  this.$store.commit("curRate", command.symbol);
  this.$store.commit("setCurrency", command.code);
  this.currency = command.code;
  Cookie.set("symbol", command.symbol);
  Cookie.set("currency", command.code);
  this.toParent(command.code);

  this.$router.push({
    path: this.$route.path,
    query: { currency: command.code }
  });

  this.$axios
    .get("global/info/", {
      params: { currency: command.code, language: this.$store.state.language }
    })
    .then(({ data }) => {
      let mydate = data.data;
      this.$store.commit("configadd", mydate);
      this.$store.commit("setusdt", data.data.usdt_price);
    })
    .catch(err => {
      console.log(err);
    });
}
</script>
<style lang="scss">
.tools {
  .el-dropdown {
    margin-left: 20px;
    text-transform: uppercase;
  }
  .el-dropdown-link {
    display: flex;
    justify-content: right;
    align-items: center;
    outline: none;
    cursor: pointer;
  }
  .countryIcon{
    width: 20px;
    height: 14px;
    margin: 1px 10px 0 0;
    display: block;
  }
}
</style>