<template>
  <div>
    <Header @toSetlang="setLang" />
    <div class="faq margin flex">
      <div class="container">
        <div class="title">{{$t('message.常见问题')}}</div>
        <div class="cons" v-if="$store.state.locale=='cn'">
          <ul>
            <li>
              <h3>币小宝是什么？</h3>
              <div>
                <p>币小宝是一个区块链大数据服务平台，提供加密货币行情、交易所数据排名服务。币小宝收录了全球3000多种主流加密货币以及500多家交易所数据，可为用户提供实时高速的加密货币价格数据。</p>
              </div>
            </li>
            <li>
              <h3>什么是BXB挖矿？</h3>
              <div>
                <p>BXB挖矿是币小宝推出的挖矿活动。用户通过矿机可挖出BXB，BXB可通过市场变现。矿机的获取方法有两种，一种是直接购买，另一种是通过水晶免费兑换。</p>
              </div>
            </li>
            <li>
              <h3>水晶是什么?</h3>
              <div>
                <p>水晶可用来兑换矿机，每邀请一名好友赠送1个水晶。</p>
              </div>
            </li>
            <li>
              <h3>邀请好友免费送矿机吗?</h3>
              <div>
                <p>邀请好友可获得水晶，水晶可兑换矿机。</p>
              </div>
            </li>
            <li>
              <h3>矿机如何购买？</h3>
              <div>
                <p>进入个人中心——购买矿机即可。</p>
              </div>
            </li>
            <li>
              <h3>挖出的BXB可以提币吗？</h3>
              <div>
                <p>可以提币。BXB是基于ERC20发行的通证，您可以提币至您的ERC20钱包。</p>
              </div>
            </li>
            <li>
              <h3>矿机到期后怎么办？</h3>
              <div>
                <p>矿机到期后自动停止挖矿，若需继续挖矿，需购买矿机。</p>
              </div>
            </li>
            <li>
              <h3>挖矿奖励什么时候发放？</h3>
              <div>
                <p>挖矿奖励将于香港时间23点59分59秒发放（UTC+8）。</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="cons" v-if="$store.state.locale=='kr'">
          <ul>
            <li>
              <h3>비쇼보란?</h3>
              <div>
                <p>비쇼보는 블록체인 빅데이터 서비스 플랫폼으로서, 암호화폐 시세, 거래소 데이터순위 등 서비스를 제공합니다. 전 세계 3000여 종의 주류 암호화폐와 500여 개의 거래소 데이터가 수록돼 있으며 사용자에게 빠르고 정확한 실시간 암호화폐 가격 데이터 및 정보를 제공합니다.</p>
              </div>
            </li>
            <li>
              <h3>BXB채굴 이란?</h3>
              <div>
                <p>BXB채굴은 비쇼보에서 출시한 채굴 시스템 입니다. 사용자는 채굴기를 통해 BXB를 채굴 할 수 있으며, 거래소에서 현금화 할 수 있습니다. 채굴기의 획득 방식은 2가지입니다. 하나는 비쇼보 홈페이지에서 직접 구매 할 수 있으며, 다른 하나는 다이아를 통해 교환 할 수 있습니다.</p>
              </div>
            </li>
            <li>
              <h3>다이아란?</h3>
              <div>
                <p>다이아는 채굴기를 교환 할 수 있으며, 친구초대 1명 당 다이아 하나를 획득 할 수 있습니다.</p>
              </div>
            </li>
            <li>
              <h3>친구를 초대하면 무료로 채굴기를 획득할 수 있나요?</h3>
              <div>
                <p>친구를 초대하면 다이아를 획득 할 수 있으며, 획든한 다이아로 채굴기를 교환 할 수 있습니다.</p>
              </div>
            </li>
            <li>
              <h3>채굴기를 어떻게 구매하나요?</h3>
              <div>
                <p>비쇼보 홈페이지 - 마이페이지에 입장하여 채굴기를 구매 할 수 있습니다.</p>
              </div>
            </li>
            <li>
              <h3>채굴한 BXB는 출금 할 수 있나요?</h3>
              <div>
                <p>출금 가능 합니다. BXB는 ERC20기반 발행 토큰으로, ERC20지갑으로 출금 할 수 있습니다. </p>
              </div>
            </li>
            <li>
              <h3>채굴기가 만료되면 어떡하나요?</h3>
              <div>
                <p>채굴기가 만료된 후 자동으로 채굴이 정지되며, 계속 채굴을 진행하려면  채굴기를 구매해야 합니다.</p>
              </div>
            </li>
            <li>
              <h3>채굴 보상은 언제 지급하나요?</h3>
              <div>
                <p>채굴 보상은 홍콩 시간 매일 23시 59분 59초에 지급 됩니다（UTC+8）.</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="cons" v-if="$store.state.locale=='en'">
          <ul>
            <li>
              <h3>What is Bixiaobao?</h3>
              <div>
                <p>Bixiaobao is a blockchain big data service platform that provides cryptocurrency quotations and exchange rankings. Bixiaobao lists the data of over 3,000 mainstream cryptocurrencies and over 500 exchanges, and provides latest cryptocurrency data.</p>
              </div>
            </li>
            <li>
              <h3>What is BXB mining?</h3>
              <div>
                <p>BXB mining is the mining activity provided by BXB. With mining rigs, users can mine BXB, which can turn into cash in markets. Mining rigs can be acquired through purchase or exchange with crystal for free.</p>
              </div>
            </li>
            <li>
              <h3>What is crystal?</h3>
              <div>
                <p>Crystal can be exchanged for mining rigs. You can get a crystal when a friend is invited.</p>
              </div>
            </li>
            <li>
              <h3>Can I get a mining rig by inviting friends?</h3>
              <div>
                <p>You can get crystals by inviting friends, and exchange for mining rigs with the crystals.</p>
              </div>
            </li>
            <li>
              <h3>How to buy mining rigs?</h3>
              <div>
                <p>Click "My Profile" -- "Buy Mining Rigs".</p>
              </div>
            </li>
            <li>
              <h3>Can I withdraw my BXB?</h3>
              <div>
                <p>Yes. BXB is an ERC20-based token, and you can withdraw BXB to your ERC20 wallet.</p>
              </div>
            </li>
            <li>
              <h3>What if my mining rig expires?</h3>
              <div>
                <p>When a mining rig expires, mining will be stopped. Buy a new rig if you want to continue.</p>
              </div>
            </li>
            <li>
              <h3>When is mining reward awarded?</h3>
              <div>
                <p>Mining reward is rewarded on 23:59:59 (UTC+8).</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="cons" v-if="$store.state.locale=='tw'">
          <ul>
            <li>
              <h3>幣小寶是什麼?</h3>
              <div>
                <p>幣小寶是一個區塊鏈大數據服務平臺，提供加密貨幣行情、交易所數據排名服務。幣小寶收錄了全球3000多種主流加密貨幣以及500多家交易所數據，可為用戶提供即時高速的加密貨幣價格數據。</p>
              </div>
            </li>
            <li>
              <h3>什麼是BXB挖礦?</h3>
              <div>
                <p>BXB挖礦是幣小寶推出的挖礦活動。用戶通過礦機可挖出BXB，BXB可通過市場變現。礦機的獲取方法有兩種，一種是直接購買，另一種是通過水晶免費兌換。</p>
              </div>
            </li>
            <li>
              <h3>水晶是什麼?</h3>
              <div>
                <p>水晶可用來兌換礦機，每邀請一名好友贈送1個水晶。</p>
              </div>
            </li>
            <li>
              <h3>邀請好友免費送礦機嗎?</h3>
              <div>
                <p>邀請好友可獲得水晶，水晶可兌換礦機。</p>
              </div>
            </li>
            <li>
              <h3>礦機如何購買?</h3>
              <div>
                <p>進入個人中心——購買礦機即可。</p>
              </div>
            </li>
            <li>
              <h3>挖出的BXB可以提幣嗎?</h3>
              <div>
                <p>可以提幣。BXB是基於ERC20發行的通證，您可以提幣至您的ERC20錢包。</p>
              </div>
            </li>
            <li>
              <h3>礦機到期後怎麼辦?</h3>
              <div>
                <p>礦機到期後自動停止挖礦，若需繼續挖礦，需購買礦機。</p>
              </div>
            </li>
            <li>
              <h3>挖礦獎勵什麼時候發放?</h3>
              <div>
                <p>挖礦獎勵將於香港時間23點59分59秒發放（UTC+8）。</p>
              </div>
            </li>
          </ul>
        </div>
        <div class="cons" v-if="$store.state.locale=='ru'">
          <ul>
            <li>
              <h3>Что такое Bixiaobao? (Бисяобао)</h3>
              <div>
                <p>Bixiaobao - это блокчейн-платформа для обслуживания больших данных, которая предоставляет котировки криптовалют и рейтинг биржевых данных. BiXiaobao собирает данные о более 3000 основных криптовалют и более 500 бирж по всему миру и может быстро предоставлять пользователям данные о ценах на криптовалюты в реальном времени.</p>
              </div>
            </li>
            <li>
              <h3>Что такое майнинг BXB?</h3>
              <div>
                <p>Майнинг BXB - это мероприятие, запущенное BiXiaobao. Пользователи могут добывать BXB с помощью майнинг-машины, BXB можно вывести через рынок. Есть два способа получить майнинговые машины: один - прямая покупка, а другой - бесплатный обмен кристаллов.</p>
              </div>
            </li>
            <li>
              <h3>Что такое кристалл?</h3>
              <div>
                <p>Кристаллы можно обменять на майнинговые машины. Если вы пригласите друга, вам дадут 1 кристалл.</p>
              </div>
            </li>
            <li>
              <h3>Можно ли бесплатно получить майнинговые машины, если приглашу друга?</h3>
              <div>
                <p>Если пригласите друзей, то можно получить кристаллы, которые можно обменять на майнинговые машины.</p>
              </div>
            </li>
            <li>
              <h3>Как купить майнинговые машины?</h3>
              <div>
                <p>Войдите в личный кабинет и купите.</p>
              </div>
            </li>
            <li>
              <h3>Можно ли вывести добытые BXB?</h3>
              <div>
                <p>Можно. BXB - это токен, выпущенный на основе ERC20, и вы можете вывести монеты на свой кошелек ERC20.</p>
              </div>
            </li>
            <li>
              <h3>Что делать после истечения срока действия майнинг-машины?</h3>
              <div>
                <p>После истечения срока действия майнинг-машины она автоматически останавливается. Если вам нужно продолжить майнинг, то вам надо купить майнинговые машины.</p>
              </div>
            </li>
            <li>
              <h3>Когда будут выданы награды за майнинг?</h3>
              <div>
                <p>Награды за майнинг будут выданы в 23:59:59 по гонконгскому времени (UTC + 8). </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  head() {
    return {
      titleTemplate: "常见问题"
      // meta: [
      //     {
      //     charset: "utf-8"
      //     },
      //     {
      //     name: "viewport",
      //     content: "width=device-width, initial-scale=1"
      //     },
      //     {
      //     hid: "kewords",
      //     name: "keywords",
      //     content: this.$t("news.keywords")
      //     },
      //     {
      //     hid: "description",
      //     name: "description",
      //     content: this.$t("news.description")
      //     }
      // ]
    };
  },
  name: "faq",
  data() {
    return {};
  },
  // async asyncData({ $axios, params }) {
  //    const { data }  = await $axios.get( "article/detail/"+params.id+"/"); //此时就可以用类似相对路径的写法

  //     return {
  //         newsData:data.data.article,
  //         NextLink:data.data.next_title,
  //         LastLink:data.data.previous_title
  //     };

  // },

  created() {
    // console.log(this.seoData)
  },
  components: {
    // 组件的引用
    // myheader
  },
  methods: {
    setLang(msg) {}
    // loadData(id){
    //     this.$axios
    //     .get("article/detail/" + id + "/")
    //     .then(({ sdata }) => {
    //         this.newsData = sdata.data.article
    //         this.NextLink = sdata.data.next_title
    //         this.LastLink = sdata.data.previous_title
    //     })
    // },
  },
  mounted() {
    // this.loadData(this.$route.params.id)
  }
};
</script>
<style lang="scss">
.faq {
  width: 100%;
  min-height: 800px;
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
    padding: 40px 80px;
    .title {
      margin-bottom: 30px;
      border-bottom: 1px solid #eaeaea;
      padding-bottom: 20px;
      font-size: 18px;
      font-weight: 500;
    }
    .cons {
      ul {
        li {
          border-bottom: 1px dashed #e0e0e0;
          padding: 15px 0;
          padding-left: 35px;
          background: url("~@/assets/quction.png") no-repeat left 15px;
          background-size: 20px;
          h3 {
            margin-bottom: 5px;
          }
          p {
            line-height: 26px;
          }
        }
      }
    }
  }
}
</style>