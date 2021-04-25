
<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div class="user margin">
      <div class="container">
        <Menulist pageindex="invite" />
        <div class="rightCon box">
          <div class="invite_head">{{$t('message.我的邀请')}}</div>
          <div class="invite_count itemCenter">
            <div class="count">
              <span>{{$t('message.我的邀请数量')}}</span>
              <h3>{{this.$store.state.userinfo.invite_count||'0'}}</h3>
            </div>
            <div class="crystal">
              <span>{{$t('message.我的水晶')}}</span>
              <h3>{{this.$store.state.userinfo.score||'0'}}</h3>
            </div>
          </div>
          <div class="invite_code">
            <div class="flex" style="padding-top: 50px;">
              <h4>{{$t('message.专属邀请链接')}}</h4>
              <p style="padding-left:6px;">(邀请1名好友赠送1枚水晶，水晶可兑换矿机哟！)</p>
            </div>
            <div class="flex">
              <div id="copyTarget">
                <div id="copy_invite_link">https://www.bixiaobao.com/{{$store.state.locale}}/?invite={{invite_code}}</div>
                <div class="slogan">{{$t('message.我已经在币小宝挖了')}} {{totalRevenue}} {{$t('message.个')}}BXB，{{$t('message.快来薅羊毛')}}</div>
              </div>
              <div class="flex">
                <div class="copy_btn">
                  <img src="~/assets/copy_pic.png" alt />
                  <span @click="copyUrl('copyTarget')">{{$t('message.复制口令')}}</span>
                </div>
                <div class="copy_btn">
                  <img src="~/assets/copy_pic.png" alt />
                  <span @click="copyUrl('copy_invite_link')">{{$t('message.复制链接')}}</span>
                </div>
              </div>
            </div>
            <textarea
              id="inputBox"
              style="position: absolute;top: 0;left: 0;opacity: 0;z-index: -10;"
            ></textarea>
          </div>
          <div class="invite_record">
            <h4>{{$t('message.邀请记录')}}</h4>
            <div class="invite_record_head flex">
              <div>{{$t('message.时间')}}</div>
              <div>{{$t('message.手机号')}}</div>
              <div class="water_jing">{{$t('message.获得水晶')}}</div>
            </div>
            <ul
              v-show="recordList.length != '0'"
              class="flex"
              v-for="(item,index) in recordList"
              :key="index"
            >
              <li>{{item.timestamp}}</li>
              <li>{{item.invited | phoneFilter}}</li>
              <li class="water_jing_count">1</li>
            </ul>
            <div v-show="recordList.length == '0'" class="no_results">{{$t('message.暂无数据')}}</div>
          </div>
          <div class="invite_record">
            <h4>{{$t('message.水晶消费记录')}}</h4>
            <div class="invite_record_head flex">
              <div>{{$t('message.时间')}}</div>
              <div>{{$t('message.类型')}}</div>
              <div class="water_jing">{{$t('message.数量')}}</div>
            </div>
            <ul
              v-show="crystalList.length != '0'"
              class="flex"
              v-for="(item,index) in crystalList"
              :key="index"
            >
              <li>{{item.timestamp}}</li>
              <li>{{item.task}}</li>
              <li class="water_jing_count">{{item.score}}</li>
            </ul>
            <div v-show="crystalList.length == '0'" class="no_results">{{$t('message.暂无数据')}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const Cookie = process.client ? require("js-cookie") : undefined;
import Menulist from "~/pages/_lang/user/menulist";
export default {
  name: "invite",
  middleware: "userAuth",
  data() {
    let user_invite = this.$cookies.get("USER_INVITE");
    return {
      invite_code: this.$store.state.userinfo.invite || user_invite,
      recordList: [],
      crystalList: [],
      totalRevenue: ""
    };
  },
  created() {
    this.getInviteList();
    this.getCrystalList();
    this.getRevenue();
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    // VeLine,
    Menulist
  },
  methods: {
    getInviteList() {
      let user_token = this.$cookies.get("token");
      this.$axios
        .get("account/invite/list/?t=" + this.$store.state.newtime, {
          headers: { Authorization: "BIXIAOBAO " + user_token }
        })
        .then(({ data }) => {
          this.recordList = data.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCrystalList() {
      let user_token = this.$cookies.get("token");
      this.$axios
        .get("account/score/bill/?t=" + this.$store.state.newtime, {
          headers: { Authorization: "BIXIAOBAO " + user_token }
        })
        .then(({ data }) => {
          this.crystalList = data.data.results;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRevenue() {
      let user_token = this.$cookies.get("token");
      this.$axios
        .get("account/profit/?t=" + this.$store.state.newtime, {
          headers: { Authorization: "BIXIAOBAO " + user_token }
        })
        .then(({ data }) => {
          this.totalRevenue = data.data.total;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getMag(msg) {},
    setLang(msg) {},
    successTip(msg) {
      this.$notify({
        type: "success",
        message: msg
      });
    },
    errorTip(msg) {
      this.$notify.error({
        title: "error",
        message: msg
      });
    },
    copyUrl(val) {
      let copyTarget = document.getElementById(val);
      let copyBox = document.getElementById("inputBox");
      copyBox.value = copyTarget.innerText;
      copyBox.select();
      if (document.execCommand("copy")) {
        document.execCommand("copy");
        this.successTip(this.$t("message.复制成功"));
      }
    }
  }
};
</script>
<style lang="scss" scoped>
@import "~/pages/_lang/user/user.scss";
.invite_head {
  font-size: 18px;
  color: #50546a;
  border-bottom: 1px solid #e0e0e0;
  padding-bottom: 16px;
  font-weight: 500;
}
.invite_count {
  height: 190px;
  border-bottom: 1px solid #e0e0e0;
  padding-left: 17px;
  position: relative;
  .count::after {
    content: "";
    position: absolute;
    width: 1px;
    height: 46px;
    left: 160px;
    top: 70px;
    background: #e0e0e0;
  }
  .crystal {
    margin-left: 63px;
  }
  div {
    width: 150px;
    color: #50546a;
    span {
      font-size: 14px;
    }
    h3 {
      font-size: 30px;
      font-weight: 500;
      padding-top: 10px;
    }
  }
}
.invite_code {
  height: 190px;
  border-bottom: 1px solid #e0e0e0;
  position: relative;
  h4 {
    font-size: 16px;
    color: #50546a;
    // padding-top: 50px;
  }
  #copyTarget {
    font-size: 20px;
    color: #50546a;
    padding-top: 15px;
    .slogan {
      font-size: 14px;
    }
  }
  .copy_btn {
    padding-left: 15px;
    padding-top: 20px;
    cursor: pointer;
    img {
      width: 16px;
      vertical-align: middle;
    }
    span {
      font-size: 14px;
      color: #5480d8;
      padding-left: 5px;
      font-weight: 500;
    }
  }
}
.invite_record {
  h4 {
    font-size: 16px;
    color: #50546a;
    padding: 50px 0 25px;
  }
  .invite_record_head {
    padding-left: 20px;
    div {
      width: 190px;
      font-size: 14px;
      color: #50546a;
    }
    // .water_jing {
    //   width: 150px;
    //   text-align: center;
    // }
  }
  ul {
    padding-top: 12px;
    padding-left: 20px;
    li {
      width: 190px;
      font-size: 14px;
      color: #50546a;
    }
    // .water_jing_count {
    //   width: 150px;
    //   text-align: center;
    // }
  }
  .no_results {
    text-align: center;
    width: 100%;
    padding-top: 20px;
  }
}
</style>