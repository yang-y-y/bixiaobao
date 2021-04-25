<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="copyright margin flex">
      <div class="container">
        <div class="cons">
          <h1>{{$t('footerNav.免责和版权声明')}}</h1>
          <div class="infos">
            <span>{{$t('message.币小宝官方')}}</span>
            {{newsData.crate_date|changeFormatDate}}
          </div>
          <div class="datails">
            <div class="showCoon" v-if="$store.state.locale=='cn'">
              <p>免责和版权声明</p>
              <p>欢迎您使用币小宝区块链数据资讯网站（以下称"本平台"，包括域名为bixiaobao.com的网站、币小宝App、币小宝公众号、币小宝小程序等）。在您使用本平台各项服务之前，请仔细阅读本《免责和版权声明》。凡以任何方式登陆浏览本平台内容或直接、间接使用本平台内容者，视为同意本平台《免责和版权声明》（以下简称“本声明”）。</p>
              <p
                class="down"
              >风险提示：本平台承诺提供专业资讯服务，本平台内容仅供投资者参考，不作为任何投资决策建议。同时，本平台不承诺投资者获取收益，也不与投资者约定分享投资收益或分担投资损失。市场有风险，投资需谨慎。</p>
              <p>一、本平台依法提供区块链数据资讯服务。如有发现任何机构或个人冒用币小宝或币小宝工作人员在网络上非法从事投资咨询业务，请及时与本平台联系，币小宝保留对侵权机构或个人追究法律责任的权利。</p>
              <p>二、本平台的内容受有关法律法规及国际条约的保护。除有关法律法规、国际条约另有规定或本平台与第三方另有约定外，本平台提供的所有内容以及相关软件程序的知识产权均归属币小宝所有。</p>
              <p>三、任何机构或者个人使用本平台，均应遵守有关法律法规、国际条约及本声明，不得破坏本平台运行安全，不得利用本平台进行任何违法活动，不得损害币小宝的合法权益。</p>
              <p>四、未经币小宝书面许可，任何机构或个人不得以向他人出售牟利为目的使用本平台的任何内容，此种使用包括但不限于拷贝、下载、存贮、通过硬盘拷贝或电子抓取系统获取、发送、转换、出租、演示、转载、复制、修改、销售、传播、出版或任何其它形式的散发。</p>
              <p>
                五、用户须明白，本平台对所提供的内容力求准确、完整和及时，但并不对其准确性、完整性和及时性做出任何保证。
                <span
                  class="down"
                >对任何因直接或间接使用本平台内容而造成的损失，包括但不限于因有关内容不准确、不完整而导致的损失，币小宝不承担任何法律责任。本平台对外部链接已进行相应的测试，但网络可能会不时受到各个环节不稳定因素的影响，因此本平台不保证用户访问外部链接时的准确性和完整性。任何机构或者个人通过本平台与其他网站的链接而获得其他网站内容，其风险责任自负，币小宝对此不承担任何法律责任。</span>
              </p>
              <p>
                六、权利人认为本平台所提供的信息存储空间、搜索或链接服务存储、搜索或链接的内容所涉及的作品侵犯了其信息网络传播权或者被删除、改变了自己的权利管理电子信息的，可依法向本平台提交书面通知。
                <span
                  class="down"
                >权利人应对通知书的真实性负责，并承担由于通知书内容不真实所导致的全部法律责任。</span>
              </p>
              <p
                class="down"
              >七、用户须明白，在使用本平台过程中存在有来自任何他人的包括威胁性的、诽谤性的、令人反感的或非法的内容或行为或对他人权利的侵犯（包括知识产权）的匿名或冒名的信息的风险，用户须承担以上风险，本平台和合作公司对此不作任何类型的担保，不论是明确的或隐含的，包括所有有关信息真实性、适当性、适于某一特定用途、所有权和非侵权性的默示担保和条件，对因此导致任何因用户不正当或非法使用服务产生的直接、间接、偶然、特殊及后续的损害，本平台不承担任何责任。</p>
              <p>
                八、本声明受有关法律法规及国际条约的约束并依据其解释。
                <span
                  class="down"
                >如出现纠纷，双方应友好协商，协商不成，任何一方可提请本平台所在地人民法院诉讼解决。</span>在法律允许的最大范围内，本声明最终解释权归币小宝享有。
              </p>
            </div>
            <div class="showCoon" v-else>
              <p>Disclaimer and Copyright</p>
              <p>Welcome to the coinage.block-chain data information website (hereinafter referred to as "this platform", including domain name bixiaobao.com,bixiaobao App,bixiaobao Public No, bixiaobao minor procedure, etc)。Please read this Disclaimer and Copyright carefully before you use the various services on this platform.Any person who log in to browse the content of this platform in any way or directly and indirectly uses the content of this platform shall be deemed to agree to the Disclaimer and Copyright Statement of this platform (hereinafter referred to as the "Declaration").</p>
              <p>All content on this website can be used in a number of languages, such as user convenience, conflict or omission, whichever is Chinese.</p>
              <p
                class="down"
              >Risk hints: This platformCommitment to provide professional information services. This platform is for investors' reference only and does not serve as any investment decision making recommendations.At the same time, this platform does not commit to the benefit of investors, nor does it promise to share investment gains or share investment losses with investors.The market is risky and investment needs to be cautious.</p>
              <p>1. This platform provides block-chain data information services in accordance with the law.If any organisation or individual is found to have used Bixiaobao or Bixiaobao staff to illegally engage in investment consulting business on the Internet, please contact this platform promptly. Bixiaobao reserves the right to hold legal liability against infringing organizations or individuals.</p>
              <p>2. The contents of this platform are protected by relevant laws and regulations and international treaties.Except as otherwise provided for by relevant laws and regulations, international treaties, or otherwise agreed between this platform and a third party, all the contents provided by this platform and the intellectual property rights of the related software programs are owned by Bixiaobao.</p>
              <p>3. No organization or individual shall comply with the relevant laws and regulations, international treaties and this statement, and shall not jeopardize the safety of the operation of this platform, nor use this platform for any illegal activities or impair the legitimate rights and interests of Bixiaobao.</p>
              <p>4. No organization or individual shall use any contents of this platform for profit-making purposes without Bixiaobao's written permission, including but not limited to copying, downloading, storage, acquisition, sending, converting, leasing, presentation, reprinting, copying, modifying, selling, etc.dissemination or publishing or any other form of distribution.</p>
              <p>
                5. Users need to understand that this platform strives to ensure the accuracy, completeness and timeliness of the content provided, but does not guarantee its accuracy, completeness and timeliness.
                <span
                  class="down"
                >Bixiaobao shall not be held liable for any loss, including but not limited to loss due to inaccuracy and incomplete use of the contents of this platform directly or indirectly.This platform has been tested for external links, but the network may be subject to instability from time to time, so the accuracy and integrity of users accessing external links are not guaranteed.Bixiaobao has no legal responsibility for obtaining other Web content through links to other sites through this platform.</span>
              </p>
              <p>
                6. AuthorizationWhere the work involved in the content of the information storage space, search or link service stored, searched or linked for this platform violates its right to propagate, or is deleted, or changes its right to manage electronic information, it may submit a written notice to this platform in accordance with the law.
                <span
                  class="down"
                >The right person shall be responsible for the authenticity of the notification and shall bear all legal responsibilities arising from the inaccuracy of the notification.</span>
              </p>
              <p
                class="down"
              >7. Users need to understand,There is a risk in the use of this platform of anonymous or impersonal information including threatening, defamatory, offensive or illegal contents or acts or infringement of other rights (including intellectual property rights). Users will be exposed to the above risks. This platform and partner company will not guarantee any type of information, whether explicitly or implicit, including all references to the authenticity, appropriateness, fitness for a particular purpose, and non-infringement of ownership and therefore warranties.This platform shall not be held liable for any direct, indirect, accidental, special and consequential damages resulting from improper or illegal use of services by users.</p>
              <p>
                8. This Statementsubject to and interpreted in accordance with relevant laws and regulations and international treaties.
                <span
                  class="down"
                >In the event of a dispute, the two parties shall negotiate amicably and fail to negotiate, and either party may bring a suit to the people's court where the platform is located for settlement.</span>To the maximum extent permitted by law, the final right to interpret this statement shall be vested in the currency, BixiaoBao.
              </p>
            </div>
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
      titleTemplate: this.$t("footerNav.免责和版权声明"),
      meta: [
        {
          charset: "utf-8"
        },
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1"
        },
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
  name: "copyright",
  data() {
    return {
      newsData: [],
      NextLink: [],
      LastLink: [],
      seoData: []
    };
  },
  created() {},
  components: {
    // 组件的引用
  },
  methods: {
    setLang(msg) {},
    loadData(id) {}
  },
  mounted() {
    // this.loadData(this.$route.params.id)
  }
};
</script>
<style lang="scss">
.copyright {
  width: 100%;
  min-height: 800px;
  .down {
    color: rgb(255, 0, 0);
    text-decoration: underline;
  }
  .container {
     min-width:1200px;
      @media screen and (min-width:1200px){
        width: 1200px;
       }
       @media screen and (min-width:1440px){
        width: 1400px;
       }
    min-height: 800px;
    margin: 0 auto;
    background: #fff;
    border-radius: 4px;
    padding: 40px 50px;
    .breadcrumb {
      margin-bottom: 50px;
    }
    .cons {
      width: 90%;
      margin: 0 auto;
      h1 {
        text-align: center;
        font-size: 22px;
        font-weight: 500;
      }
      .infos {
        text-align: center;
        padding: 30px 0;
        margin-bottom: 50px;
        border-bottom: 1px solid #cccccc;
        color: #a1a6b4;
        span {
          color: #0386d9;
          margin-right: 20px;
        }
      }
      .datails {
        min-height: 500px;
      }
      .showCoon {
        h4 {
          margin-bottom: 5px;
        }
        p {
          margin-bottom: 10px;
        }
      }
    }
  }
}
</style>