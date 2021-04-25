<template>
  <div class="header">
    <div class="second itemCenter">
      <nuxt-link to="/"><img class="logo" src="@/assets/logo.png" alt /></nuxt-link>
      <div class="navlink">
        <nuxt-link to="/">币小宝行情站</nuxt-link>
        <nuxt-link to="/">白皮书</nuxt-link>
        <el-dropdown trigger="click" @command="handleChange">
            <span class="el-dropdown-link">
              <img src="@/assets/local.png" width="14" height="14" style="margin-right:10px" />
              {{$i18n.locale=='cn'?$t("message.简体中文"):$t("message.韩语")}}
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="item in options"
                :key="item.id"
                :command="item.id"
              >{{ $t("message")[item.label] }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;
export default {
  name: "headers",
  created: function() {
   
  },
  data() {
    return {
      coinall: [],
      nav: [
        {
          value: "行情",
          locale: "index"
        },
        {
          value: "平台",
          locale: "exchange"
        },
        {
          value: "快讯",
          locale: "news"
        }
      ],
      navIdx: 0,
      options: [
        {
          value: "1",
          label: "简体中文",
          id: "cn"
        },
        {
          value: "2",
          label: "韩语",
          id: "kr"
        }
      ],
      value: "",
      hidden: true,
      search: ""
    };
  },
  methods: {
    handleNavList,
    handleInputFocus,
    handleMask,
    handleChange,
    handleSearch,
    handleRemove,
    handleHistory
  }
};
function handleChange(command) {
  this.$i18n.locale = command;
  this.$store.commit("SET_LANG", command);
  this.$router.go(0)
  Cookie.set("lang", command);
}
function handleNavList(idx, value) {
  this.navIdx = value;
  this.$router.push(this.$i18n.path(idx));
}
function handleInputFocus(hidden) {
  this.hidden = false;
}
function handleMask(){
  this.hidden = true;
}
function handleSearch(search) {
  let routeUrl = this.$router.resolve({
     path: "/search",
     query: {q:this.search}
   });
   window.open(routeUrl.href, '_blank');
  // this.$router.push({ path: "/search/?q=" + this.search });
  this.search = "";
  this.hidden = true;
  Cookie.set("search", search);
}
function handleRemove(value){
  this.$store.commit("REMOVE_SEARCH", value);
  this.hidden = true;

}
function handleHistory(value){
  window.location.href="/search/?q="+ value
}
</script>
<style scoped lang="scss">
.header {
  width: 100%;
  height: 88px;
  color: #444444;
  .second {
    width: 1280px;
    height: 80px;
    margin: 0 auto;
    align-items: flex-end;
    justify-content:space-between;
    .el-dropdown {
      text-transform: uppercase;
      top: 3px;
    }
    .el-dropdown-link {
      display: flex;
      justify-content: right;
      align-items: center;
      outline: none;
      color:#444;
      cursor: pointer;
    }
    .logo {
      width: 135px;
    }
    .navlink{
      line-height: 30px;
      a{
        color: #444444;
        text-decoration: none;
        margin-right: 40px;
        display: inline-block;
      }
    }
    ul {
      flex: 1;
      li {
        font-size: 16px;
        color: #242735;
        margin-right: 30px;
        cursor: pointer;
        &.choice {
          position: relative;
          color: #F86B1D;
          font-weight: 500;
          &::after {
            content: "";
            position: absolute;
            width: 100%;
            background: #F86B1D;
            height: 4px;
            bottom: -28px;
            left: 50%;
            transform: translateX(-50%);
          }
        }
      }
    }
    .seach {
      width: 260px;
      height: 38px;
      position: relative;
      border-radius: 19px;
      .masking {
        position: fixed;
        width: 100vw;
        height: 100vh;
        left: 0;
        top: 0;
        z-index: 2;
        background: transparent;
      }
      input {
        width: 260px;
        height: 38px;
        border-radius: 19px;
        outline: none;
        border: 1px solid #e9e9e9;
        padding-left: 18px;
      }
      .search_btn{
        position: absolute;
        right: 0;
        top: 0;
        height: 36px;
        width: 36px;
        z-index: 10;
        cursor: pointer;
      }
      img {
        width: 15px;
        height: 15px;
        z-index: 2;
        margin: 0;
        margin-top: 12px;
        margin-left: 5px;
      }
      .auto_finish {
        width: 260px;
        height: 366px;
        border-radius: 4px;
        box-shadow: 0 3px 5px rgba(80, 84, 106, 0.3);
        background: #ffffff;
        padding: 18px 20px 0;
        position: absolute;
        z-index: 999999999;
        .tit {
          font-size: 14px;
          color: #242735;
          border-bottom: 1px solid #f0f2f9;
          line-height: 32px;
          font-weight: 500;
          position: relative;
          button {
            color: #5480d8;
            cursor: pointer;
            outline: none;
            border: 0;
            position: absolute;
            top: 5px;
            right: 0;
            padding: 0;
          }
        }
        .list {
          margin: 5px 0;
          div,
          a {
            display: block;
            line-height: 32px;
            color: #242735;
            font-size: 14px;
            padding: 0 7px 0 10px;
            cursor: pointer;
          }
          div {
            span {
              float: right;
              color: #009bf4;
              display: none;
            }
          }
          a {
            background: transparent;
            text-decoration: none;
            outline: none;
            transition: color 0s ease;
          }
          div:hover,
          a:hover {
            background: #f1f2f5;
          }
          div:hover > span {
            display: inline;
          }
        }
      }
    }
  }
}
.el-select ::v-deep .el-input__inner {
  height: 20px !important;
  line-height: 20px;
  padding: 0;
}
</style>

