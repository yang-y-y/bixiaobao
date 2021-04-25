<template>
  <div>
    <Header @toParent="getMag" @toSetlang="setLang" />
    <div :class="proup == true ? 'pricePopup popped' : 'pricePopup'">
      <div class="leftcon">
        <img
          :src="$store.state.bixiaobao + listdata.logo_m"
          :alt="listdata.token + ',' + listdata.code + ',' + listdata.name"
          :onerror="defaultImg"
          width="30"
        />&nbsp;
        <span
          style="
            font-size: 16px;
            font-weight: bold;
            margin-left: 5px;
            text-transform: capitalize;
          "
          >{{ listdata.name_en }}</span
        >
        &nbsp; {{ listdata.token }}&nbsp;{{
          listdata.lang_all_name
            ? listdata.lang_all_name["name_" + $i18n.locale]
            : []
        }}
      </div>
      <div class="rightcon">
        <div class="priceCon">
          {{ $t("message.价格") }}：
          <span class="prices" v-if="$route.params.id == 'bitcoin'"
            >{{ $store.state.curRate }}
            {{
              wsData != ""
                ? (wsData * rateCur).toFixed(0)
                : listdata.price_now | formatMoney
            }}</span
          >
          <span class="prices" v-else
            >{{ $store.state.curRate }} {{ listdata.price_now }}</span
          >

          <span v-if="listdata.increase24h >= 0" class="btns up"
            >+{{ wsUpDown != "" ? wsUpDown : listdata.increase24h }}%</span
          >
          <span v-else class="btns down"
            >{{ wsUpDown != "" ? wsUpDown : listdata.increase24h }}%</span
          >
        </div>
        <Toptool v-bind="$attrs" v-on="$listeners" />
      </div>
    </div>
    <div class="coin_details homelv2 margin">
      <div class="container">
        <!-- 币对详情头部 -->
        <div class="coin_header">
          <div class="coin_breadcrumbs">
            <a
              :href="'/' + $i18n.locale + '?currency=' + $store.state.currency"
              :title="$t('message.首页')"
              >{{ $t("message.首页") }}</a
            >&nbsp;&gt;&nbsp;
            <a
              :href="'/' + $i18n.locale + '?currency=' + $store.state.currency"
              :title="$t('nav.加密货币')"
              >{{ $t("nav.加密货币") }}</a
            >&nbsp;&gt;&nbsp;
            <span>{{ listdata.token }}</span>
          </div>
          <!-- 币对信息顶部 -->
          <div class="coin_top between">
            <div class="left itemBetween">
              <img
                :src="$store.state.bixiaobao + listdata.logo_m"
                :alt="
                  listdata.token + ',' + listdata.code + ',' + listdata.name
                "
                :onerror="defaultImg"
              />
              <div class="currency">
                <h1 class="coin_name">
                  <i>{{ listdata.name_en }}</i>
                  <span
                    >{{ listdata.token }}&nbsp;{{
                      listdata.lang_all_name
                        ? listdata.lang_all_name["name_" + $i18n.locale]
                        : []
                    }}</span
                  >
                </h1>
                <span class="ranking"
                  >{{ $t("message.市值排名") }}&nbsp;#{{
                    listdata.market_value_index || "--"
                  }}</span
                >
                <span class="included">{{ $t("message.已收录") }}</span>
              </div>
              <div class="present_price">
                <div>
                  {{
                    listdata.lang_all_name["name_" + $i18n.locale]
                      ? listdata.lang_all_name["name_" + $i18n.locale]
                      : listdata.name_en
                  }}<i v-if="$i18n.locale == 'cn' || $i18n.locale == 'tw'">{{
                    $t("message.价格")
                  }}</i
                  ><i v-else>&nbsp;{{ $t("message.价格") }}</i>
                </div>
                <div class="flex">
                  <div>
                    <span v-if="$route.params.id == 'bitcoin'"
                      >{{ $store.state.curRate }}
                      {{
                        wsData != ""
                          ? (wsData * rateCur).toFixed(0)
                          : listdata.price_now | formatMoney
                      }}</span
                    >
                    <span v-else
                      >{{ $store.state.curRate }} {{ listdata.price_now }}</span
                    >
                    <p v-if="$route.params.id == 'bitcoin'">
                      $
                      {{
                        wsData != ""
                          ? wsData.toFixed(0)
                          : listdata.price_global | formatMoney
                      }}
                    </p>
                    <p v-else>$ {{ listdata.price_global }}</p>
                  </div>
                  <div style="padding-top: 13px; padding-left: 20px">
                    <div v-if="listdata.increase24h >= 0" class="upShow">
                      +{{ wsUpDown != "" ? wsUpDown : listdata.increase24h }}%
                    </div>
                    <div v-else class="downShow">
                      {{ wsUpDown != "" ? wsUpDown : listdata.increase24h }}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- 币对信息底部 -->
          <div class="coin_bottom flex">
            <div class="coin_detail_left">
              <div class="detail_view">
                <div class="view_titles">{{ $t("message.板块标签") }}</div>
                <div class="tagCon" v-if="listdata.tags.length > 0">
                  <em v-for="(item, index) in listdata.tags" :key="index">{{
                    item
                  }}</em>
                </div>
              </div>
              <div class="detail_view">
                <div class="view_titles">{{ $t("message.官网地址") }}</div>
                <div class="tagCon" v-if="listdata.siteurl.length > 0">
                  <a
                    :href="item"
                    target="_blank"
                    :title="item"
                    style="margin-right: 15px; color: #5480d8"
                    v-for="(item, index) in listdata.siteurl"
                    :key="index"
                    rel="nofollow"
                    ><em>{{ item }}</em></a
                  >
                </div>
                <div class="tagCon" v-else><em>{{ $t("message.暂未收录") }}</em></div>
              </div>
              <div class="detail_view">
                <div class="view_titles">{{ $t("message.浏览器") }}</div>
                <div class="tagCon">
                  <a
                    :href="item"
                    :title="key"
                    target="_blank"
                    v-for="(item, key, index) in listdata.explorers_json"
                    :key="index"
                    rel="nofollow"
                  >
                    <em>{{ key }}</em>
                  </a>
                </div>
              </div>
              <div class="detail_view">
                <div class="view_titles">{{ $t("message.合约地址") }}</div>
                <div class="tagCon">
                  <em
                    v-for="(item, key, index) in listdata.contact_json"
                    :key="index"
                    >{{ key }}</em
                  >
                </div>
              </div>
              <div class="detail_view">
                <div class="view_titles">{{ $t("message.源代码") }}</div>
                <div class="tagCon">
                  <a
                    :href="item"
                    :title="key"
                    target="_blank"
                    v-for="(item, key, index) in listdata.source_code_json"
                    :key="index"
                    rel="nofollow"
                    ><em>{{ key }}</em></a
                  >
                </div>
              </div>
            </div>
            <div class="coin_detail_right">
              <ul>
                <li>
                  <div class="tit">{{ $t("message.市值") }}</div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{
                      listdata.market_value | formatMoney
                    }}
                  </div>
                  <!-- <div class="down">
                    -18% <i class="el-icon-caret-bottom"></i>
                  </div> -->
                </li>
                <li>
                  <div class="tit">{{ $t("message.24H成交额") }}</div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{
                      listdata.volume24h | formatMoney
                    }}
                  </div>
                  <!-- <div class="down">
                    -18% <i class="el-icon-caret-bottom"></i>
                  </div> -->
                </li>
                <li>
                  <div class="tit">{{ $t("message.流通供应量") }}</div>
                  <div class="price">
                    {{ listdata.circulation | formatMoney }}
                    {{ listdata.token }}
                  </div>
                  <div class="price">
                    {{ listdata.maxsupply | formatMoney }} {{ listdata.token }}
                  </div>
                </li>
                <li>
                  <div class="tit">{{ $t("message.24H最高") }}/{{ $t("message.最低") }}</div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{
                      listdata.max24 || "--" | formatePrice
                    }}
                  </div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{
                      listdata.min24 || "--" | formatePrice
                    }}
                  </div>
                </li>
                <li>
                  <div class="tit">{{ $t("message.占全球总市值") }}</div>
                  <div class="price">
                    {{ listdata.market_value_percent | numFilter(3) }}%
                  </div>
                </li>
                <li>
                  <div class="tit">{{ $t("message.24H成交量") }}</div>
                  <div class="price">
                    {{ listdata.amount24h | reverseStr }}&nbsp;{{
                      listdata.token
                    }}
                  </div>
                </li>
                <li>
                  <div class="tit">{{ $t("message.换手率") }}</div>
                  <div class="price">{{ listdata.turnover }}%</div>
                </li>
                <li>
                  <div class="tit">
                    {{ $t("message.历史最高") }}/{{ $t("message.最低") }}
                  </div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{
                      listdata.max || "--" | formatePrice
                    }}
                  </div>
                  <div class="price">
                    {{ $store.state.curRate }}&nbsp;{{ listdata.min || "--" }}
                  </div>
                </li>
              </ul>
            </div>
            
          </div>
        </div>
        <!-- 币对详情中间内容区 -->
        <div class="coin_details_page flex">
          <div class="coinl_details_left">
            <ul class="coin_nav itemCenter">
              <li
                v-for="(item, index) in tab"
                :key="index"
                @click="handleCsutomTab(item.id)"
                :class="Number(index) == csutomTabIdx ? 'choice' : ''"
                :style="item.name=='介绍'||item.name=='相关资讯'?'display:none;':''"
              >
                <i v-if="item.status == 0"></i>
                <span v-else>{{ $t("message")[item.name] }}</span>
              </li>
            </ul>
            <!-- 币详情数据 -->
            <div v-show="csutomTabIdx == 0" class="coin_data">
              <div class="coin_left_bar">
                <h2 v-if="$i18n.locale == 'cn' && listdata.name">
                  {{ listdata.name }} ({{ listdata.token }}){{
                    $t("message.图表数据")
                  }}
                </h2>
                <h2 v-else>{{ listdata.token }} {{ $t("message.图表数据") }}</h2>
                <div class="chartCon">
                  <div class="selectDate">
                    <ul>
                      <li
                        v-for="(item, index) in selectDate"
                        :key="index"
                        @click="initGetdata(index)"
                        :class="selectDateIndex == index ? 'selectactive' : ''"
                      >
                        {{ item.name }}
                      </li>
                    </ul>
                  </div>
                  <div
                    id="echartContainer"
                    ref="echartContainer"
                    style="width: 100%; height: 500px;margin-bottom:40px;"
                  ></div>
                </div>

                <h2 v-if="$i18n.locale == 'cn' && listdata.name">
                  {{ listdata.name }} ({{ listdata.token }}){{
                    $t("message.市场行情")
                  }}
                </h2>
                <h2 v-else>{{ listdata.token }} {{ $t("message.市场行情") }}</h2>
                <div
                  class="chartCon now_coin_all tokenlist"
                  v-if="exchangeCoinlist.results.length > 0"
                >
                
                  <ul class="coin_name_nav itemCenter">
                    <li
                      :class="coinGoodsChildIdx == 0 ? 'active' : ''"
                      @click="handleCoinGoodsChild(0)"
                    >
                      {{ $t("message.全部") }}
                    </li>
                    <li
                      v-for="(item, index) in pairNav"
                      :key="index + 1"
                      @click="handleCoinGoodsChild(index + 1, item)"
                      :class="index + 1 == coinGoodsChildIdx ? 'active' : ''"
                    >
                      {{ item }}
                    </li>
                  </ul>
                  <i-table
                    :loading="loading"
                    :columns="columns1"
                    :data="exchangeCoinlist.results"
                  ></i-table>

                  <div class="pages">
                    <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="Number(coinCount)"
                      @current-change="handlepageChange"
                      :page-size="30"
                      :hide-on-single-page="true"
                      :current-page="Number(page)"
                    ></el-pagination>
                  </div>
                </div>
                <h2 v-if="$i18n.locale == 'cn'">
                  {{ listdata.name }}({{ listdata.token }}) {{
                    $t("message.交易对成交额占比")
                  }}
                </h2>
                <h2 v-else>
                  {{ listdata.token }} {{ $t("message.交易对成交额占比") }}
                </h2>
                <div class="chartCon">
                  <div
                    id="main1"
                    ref="main1"
                    style="width: 100%; height: 300px"
                  ></div>
                </div>
                <h2 v-if="$i18n.locale == 'cn'">
                  {{ listdata.name }}({{ listdata.token }}) {{
                    $t("message.市值排行走势")
                  }}
                </h2>
                <h2 v-else>
                  {{ listdata.token }} {{ $t("message.市值排行走势") }}
                </h2>
                <div class="chartCon">
                  <div >
                    {{ $t("message.当前排名") }}:
                    <span>{{ listdata.market_value_index }}</span>
                  </div>
                  <div
                    id="main2"
                    ref="main2"
                    style="width: 100%; height: 350px;"
                  ></div>
                </div>
                <div class="aboutCoin">
                  <h2 v-if="$i18n.locale == 'cn'">
                    关于{{ listdata.name }}({{ listdata.token }})
                  </h2>
                  <h2 v-else>关于({{ listdata.token }})</h2>
                 
                  <div class="aboutMain">
                     <p v-if="$i18n.locale == 'cn'">
                    {{ listdata.name }}({{ listdata.token }})的最新价格是{{
                      $store.state.curRate
                    }}{{ listdata.price_now | formatMoney }}，
                    {{ listdata.name }}价格在过去24小时涨跌幅为<span
                      v-if="listdata.increase24h >= 0"
                      class="upShow"
                      >+{{ listdata.increase24h }}%</span
                    ><span v-else class="downShow"
                      >{{ listdata.increase24h }}%</span
                    >， 成交额为{{ $store.state.curRate }}&nbsp;{{
                      listdata.volume24h | formatMoney
                    }}， {{ listdata.name }}流通量是{{
                      listdata.circulation | formatMoney
                    }}&nbsp;{{ listdata.token }}， 最大供应量是{{
                      listdata.maxsupply | formatMoney
                    }}&nbsp;{{ listdata.token }}。
                    <span v-if="exchangeCoinlist.results.length > 0"
                      >{{ exchangeCoinlist.results[0].exchange.name }}是{{
                        listdata.name
                      }}当前交易深度最好的市场。</span
                    >
                    <span
                      v-if="Object.keys(listdata.explorers_json).length != 0"
                    >
                      如果想了解{{ listdata.name }}({{
                        listdata.token
                      }})区块链上的交易数据，您可以使用区块浏览器，
                      <a
                        :href="item"
                        :title="key"
                        target="_blank"
                        v-for="(item, key, index) in listdata.explorers_json"
                        :key="index"
                        rel="nofollow"
                        style="padding: 0 2px"
                        >{{ key }}</a
                      >。
                    </span>
                    <span v-else></span>
                  </p>
                  <p v-else>
                    {{ listdata.name_en }}({{ listdata.token }})的最新价格是{{
                      $store.state.curRate
                    }}{{ listdata.price_now | formatMoney }}，
                    {{ listdata.name_en }}价格在过去24小时涨跌幅为<span
                      v-if="listdata.increase24h >= 0"
                      class="upShow"
                      >+{{ listdata.increase24h }}%</span
                    ><span v-else class="downShow"
                      >{{ listdata.increase24h }}%</span
                    >， 成交额为{{ $store.state.curRate }}&nbsp;{{
                      listdata.volume24h | formatMoney
                    }}， {{ listdata.name_en }}流通量是{{
                      listdata.circulation | formatMoney
                    }}&nbsp;{{ listdata.token }}， 最大供应量是{{
                      listdata.maxsupply | formatMoney
                    }}&nbsp;{{ listdata.token }}。
                    <span v-if="exchangeCoinlist.results.length > 0"
                      >{{ exchangeCoinlist.results[0].exchange.name }}是{{
                        listdata.name
                      }}当前交易深度最好的市场。</span
                    >
                    <span
                      v-if="Object.keys(listdata.explorers_json).length != 0"
                    >
                      如果想了解{{ listdata.name_en }}({{
                        listdata.token
                      }})区块链上的交易数据，您可以使用区块浏览器，
                      <a
                        :href="item"
                        :title="key"
                        target="_blank"
                        v-for="(item, key, index) in listdata.explorers_json"
                        :key="index"
                        rel="nofollow"
                        style="padding: 0 2px"
                        >{{ key }}</a
                      >.
                    </span>
                    <span v-else></span>
                  </p>
                      <div :class="isshowtxt?'text_box show':'text_box'" v-html="this.listdata.summary||'--'"></div>
                      <span class="openclose" @click="ChangeShow"><font v-if="isshowtxt==false">{{$t("message.展开内容") }}</font><font v-else>{{$t("message.收起内容") }}</font></span>
                      <!-- <el-button
                        v-if="listdata.brief"
                        class="show_fullText"
                        type="text"
                        @click="openDatail"
                      >{{$t('message.详细内容')}}</el-button> -->
                  </div>
               
                </div>
                <div v-show="newslist.length>0">
                  <h2>{{ listdata.name }}({{ listdata.token }}) {{ $t("message.相关资讯") }}</h2>
                  <div
                    v-if="newslist == ''"
                    class="coin_news"
                    style="text-align: center"
                  >
                    {{ $t("message.暂无内容") }}
                  </div>
                  <div class="coin_news" v-else>
                    <dl v-for="(item, index) in newslist" :key="index">
                      <dt>
                        <a
                          :href="
                            'https://www.bixiaobao.com/' +
                            $i18n.locale +
                            '/news/blockchain_news_' +
                            item.id +
                            '.html'
                          "
                          target="_blank"
                        >
                          <img
                            :src="$store.state.bixiaobao + item.t_img"
                            :alt="item.title"
                          />
                        </a>
                      </dt>
                      <dd>
                        <div class="headtitle">
                          <a
                            :href="
                              'https://www.bixiaobao.com/' +
                              $i18n.locale +
                              '/news/blockchain_news_' +
                              item.id +
                              '.html'
                            "
                            target="_blank"
                            >{{ item.title }}</a
                          >
                        </div>
                        <div>
                          <a
                            :href="
                              'https://www.bixiaobao.com/' +
                              $i18n.locale +
                              '/news/blockchain_news_' +
                              item.id +
                              '.html'
                            "
                            target="_blank"
                            >{{ item.description }}</a
                          >
                        </div>
                        <div class="timedata">{{ item.auth_release_time }}</div>
                      </dd>
                    </dl>
                    <div class="morelink">
                      <a
                        :href="
                          '/' +
                          $i18n.locale +
                          '/blockchain_news/' +
                          $route.params.id
                        "
                        target="_blank"
                        >{{ $t("message.查看所有") }}</a
                      >
                    </div>
                  </div>
                </div>
              </div>
              <div class="coin_right_bar">
                <div class="bar_view txtchart border radiu">
                  <h3>{{ listdata.name }} {{ $t("message.信息统计") }}</h3>
                  <div class="txtchart_Con">
                    <div class="tit">{{ $t("message.价格") }}</div>
                    <ul>
                      <li>
                        <div class="keys">{{ listdata.name }}{{ $t("message.价格") }}</div>
                        <div class="vals">
                          {{
                            $store.state.curRate + listdata.price_now || "--"
                          }}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.24H涨跌幅") }}</div>
                        <div class="vals">
                          <span v-if="listdata.increase24h >= 0" class="up">+{{ listdata.increase24h }}% <i class="el-icon-caret-up"></i></span><span v-else class="down">{{ listdata.increase24h }}% <i class="el-icon-caret-bottom"></i></span>
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.7D涨跌幅") }}</div>
                        <div class="vals">
                          <span v-if="listdata.history.incream.hour24 >= 0" class="up">+{{ listdata.history.incream.week }}% <i class="el-icon-caret-up"></i></span><span v-else class="down">{{ listdata.history.incream.week }}% <i class="el-icon-caret-bottom"></i></span>
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.24H最高") }}</div>
                        <div class="vals">
                          {{ $store.state.curRate }}&nbsp;{{
                            listdata.max24 || "--" | formatePrice
                          }}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.24H最低") }}</div>
                        <div class="vals">
                           {{ $store.state.curRate }}&nbsp;{{
                            listdata.min24 || "--" | formatePrice
                          }}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.24H成交额") }}</div>
                        <div class="vals">
                          {{ $store.state.curRate }}&nbsp;{{
                            listdata.volume24h | formatMoney
                          }}
                        </div>
                      </li>
                      
                    </ul>
                    <div class="tit">{{ $t("message.市值") }}</div>
                    <ul>
                      <li>
                        <div class="keys">{{ $t("message.市值") }}</div>
                        <div class="vals">
                         {{ $store.state.curRate }}&nbsp;{{
                            listdata.market_value | formatMoney
                          }}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.市值排行") }}</div>
                        <div class="vals">
                          #{{listdata.market_value_index || "--"}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.市场占有率") }}</div>
                        <div class="vals">
                         {{ listdata.market_value_percent | numFilter(3) }}%
                        </div>
                      </li>
                    </ul>
                    <div class="tit">{{ $t("message.基本信息") }}</div>
                    <ul>
                      <li>
                        <div class="keys">{{ $t("message.发行时间") }}</div>
                        <div class="vals">
                         {{listdata.online_time}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.最大供应量") }}</div>
                        <div class="vals">
                         {{listdata.maxsupply | formatMoney}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.流通量") }}</div>
                        <div class="vals">
                        {{ listdata.circulation | formatMoney }}&nbsp;{{listdata.token}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.上架交易所") }}</div>
                        <div class="vals">
                         {{listdata.exchange_count}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.核心算法") }}</div>
                        <div class="vals">
                         {{listdata.algorithm}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.激励机制") }}</div>
                        <div class="vals">
                         {{listdata.mechanism}}
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.官网地址") }}</div>
                        <div class="vals">
                        <a
                          :href="item"
                          target="_blank"
                          :title="item"
                          style="margin-right: 15px; color: #5480d8"
                          v-for="(item, index) in listdata.siteurl"
                          :key="index"
                          rel="nofollow"
                          >{{ item }}</a>
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.白皮书") }}</div>
                        <div class="vals">
                          <a
                          :href="listdata.whitepaper"
                          :title="listdata.whitepaper"
                          target="_blank"
                          style="color: #5480d8"
                          rel="nofollow"
                          >{{ listdata.whitepaper }}</a>
                        </div>
                      </li>
                      <li>
                        <div class="keys">{{ $t("message.社交网站") }}</div>
                        <div class="vals">
                         <a
                          :href="item"
                          :title="key"
                          target="_blank"
                          v-for="(item, key, index) in listdata.social"
                          :key="index"
                          rel="nofollow"
                          >{{ key }}</a>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <!-- 币详情持币 -->
            <div v-show="csutomTabIdx == 3" class="coin_holding">
              <!-- 持币地址 -->

              <div class="coin_hold_address">{{ $t("message.持币地址") }}</div>
              <div class="hotDegree_table">
                <ul class="hotDegree_one itemCenter">
                  <li>{{ $t("message.持币地址数") }}</li>
                  <li>{{ $t("message.前10名占比") }}</li>
                  <li>{{ $t("message.前20名占比") }}</li>
                  <li>{{ $t("message.前50名占比") }}</li>
                  <li>{{ $t("message.前100名占比") }}</li>
                </ul>
                <ul class="hotDegree_two itemCenter">
                  <li>{{ holdtotal.count || "--" | formatePrice }}</li>
                  <li>{{ holdtotal.top10 || "--" }}</li>
                  <li>{{ holdtotal.top20 || "--" }}</li>
                  <li>{{ holdtotal.top50 || "--" }}</li>
                  <li>{{ holdtotal.top100 || "--" }}</li>
                </ul>
              </div>
              <!-- 持币占比趋势 -->
              <div class="smallTit_first">
                <div class="smallTit_first_all">
                  <div class="smallTit_first_content">
                    <h4>
                      <span>{{ $t("message.大户持币占比趋势") }}</span>
                    </h4>
                    
                    <div >
                      <div
                        id="holding_ratio"
                        ref="holding_ratio"
                        style="width: 610px; height: 300px"
                      ></div>
                    </div>
                  </div>
                  <div class="smallTit_first_content">
                    <h4>
                      <span>{{ $t("message.持币地址数变化趋势") }}</span>
                    </h4>
                    <div >
                      <div
                        id="holding_trends"
                        ref="holding_trends"
                        style="width: 610px; height: 300px"
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="flow">{{ $t("message.十大流动地址") }}</div>
              <div class="flow_address">
                <el-table :data="holddata.top_active" style="width: 100%">
                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column
                    prop="wallet"
                    :label="$t('message.钱包地址')"
                    width="440"
                  ></el-table-column>
                  <el-table-column prop="count" :label="$t('message.持仓数量')">
                    <template slot-scope="scope">
                      <span>{{ scope.row.count | formatePrice }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="percent"
                    :label="$t('message.持仓占比')"
                  ></el-table-column>
                  <el-table-column
                    prop="days7"
                    :label="$t('message.7D变化')"
                    align="right"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.days7 > 0" class="up"
                        >+{{ scope.row.days7 }}</span
                      >
                      <span v-else class="down">{{ scope.row.days7 }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="flow">{{ $t("message.十大持币地址") }}</div>
              <div class="flow_coin">
                <el-table :data="holddata.top_hold" style="width: 100%">
                  :
                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column
                    prop="wallet"
                    :label="$t('message.钱包地址')"
                    width="440"
                  ></el-table-column>
                  <el-table-column prop="count" :label="$t('message.持仓数量')">
                    <template slot-scope="scope">
                      <span>{{ scope.row.count | formatePrice }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="percent"
                    :label="$t('message.持仓占比')"
                  ></el-table-column>
                  <el-table-column
                    prop="days7"
                    :label="$t('message.7D变化')"
                    align="right"
                  >
                    <template slot-scope="scope">
                      <span v-if="scope.row.days7 > 0" class="up"
                        >+{{ scope.row.days7 }}</span
                      >
                      <span v-else class="down">{{ scope.row.days7 }}</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="holding_coin_details">
                {{ listdata.token }}{{ $t("message.前100持币明细") }}
              </div>
              <div class="holding_details">
                <el-table :data="holddata.top_wallet" style="width: 100%">
                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column
                    prop="wallet"
                    :label="$t('message.钱包地址')"
                  ></el-table-column>
                  <el-table-column prop="count" :label="$t('message.持仓数量')">
                    <template slot-scope="scope">
                      <span>{{ scope.row.count | formatePrice }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="percent"
                    :label="$t('message.持仓占比')"
                    width="80"
                    align="right"
                  ></el-table-column>
                </el-table>
              </div>
            </div>
            <!-- 币详情历史数据 -->
            <div v-show="csutomTabIdx == 2" class="coin_history">
              <h2>{{ listdata.name }}({{ listdata.token }}) {{ $t("message.历史涨跌统计") }}</h2>
              <div class="uncon">
                <div class="leftview">
                  {{ $store.state.curRate
                  }}{{ historyData.history_low || "--" }}
                  <p>{{ $t("message.历史最低") }}</p>
                </div>
                <div class="unshow">
                  <div class="unico" :style="this.nowposition">
                    <div class="undiv">
                      <el-tooltip class="item" effect="dark" :content="this.$t('message.当前价格')+':'+this.$store.state.curRate + this.listdata.price_now || '--'" placement="bottom">
                        <i class="el-icon-caret-top"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div class="rightview">
                  {{ $store.state.curRate
                  }}{{ historyData.history_high || "--" }}
                  <p>{{ $t("message.历史最高") }}</p>
                </div>
              </div>

              <div class="uncon">
                <div class="leftview">
                  {{ $store.state.curRate
                  }}{{ historyData.days_70_low || "--" }}
                  <p>{{ $t("message.70天最低") }}</p>
                </div>
                <div class="unshow">
                  <div class="unico" :style="this.nowposition2">
                    <div class="undiv">
                      <el-tooltip class="item" effect="dark" :content="this.$t('message.当前价格')+':'+this.$store.state.curRate + this.listdata.price_now || '--'" placement="bottom">
                        <i class="el-icon-caret-top"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
                <div class="rightview">
                  {{ $store.state.curRate
                  }}{{ historyData.days_70_high || "--" }}
                  <p>{{ $t("message.70天最高") }}</p>
                </div>
              </div>

              <table class="history_data">
                <tbody>
                  <tr>
                    <td class="tit" style="width: 85px">
                      {{ $t("message.昨天开盘价") }}
                    </td>
                    <td class="val" style="width: 200px">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.yesterday_open_price ||
                          "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.昨天最高") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.yesterday_high || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.30天最高") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.days_30_high || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.历史最高") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.history_high || "--" | formatePrice
                        }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="tit" style="width: 85px">
                      {{ $t("message.昨天收盘价") }}
                    </td>
                    <td class="val" style="width: 200px">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.start_open_price || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.昨天最低") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.yesterday_low || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.30天最低") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.days_30_low || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.历史最低") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{ historyData.history_low || "--" }}</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <td class="tit" style="width: 85px">
                      {{ $t("message.昨天成交额") }}
                    </td>
                    <td class="val" style="width: 200px">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.yesterday_volume || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.70天最高") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.days_70_high || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.90天最高") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{
                          historyData.days_90_high || "--" | formatePrice
                        }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.ATH跌幅") }}</td>
                    <td class="val">
                      <span class="text_red">{{
                        historyData.ath_increase || "--"
                      }}</span>
                    </td>
                  </tr>
                  <tr>
                    <td class="tit" style="width: 85px">
                      {{ $t("message.昨天涨跌幅") }}
                    </td>
                    <td class="val" style="width: 200px">
                      <span class="text_green"
                        >{{ historyData.yesterday_increase || "--" }}%</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.70天最低") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{ historyData.days_70_low || "--" }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.90天最低") }}</td>
                    <td class="val">
                      <span class="convert"
                        >{{ $store.state.curRate
                        }}{{ historyData.days_90_low || "--" }}</span
                      >
                    </td>
                    <td class="tit">{{ $t("message.ATL涨幅") }}</td>
                    <td class="val">
                      <span class="text_green"
                        >+{{ historyData.lth_increase || "--" }}</span
                      >
                    </td>
                  </tr>
                </tbody>
              </table>
              <h2>{{ listdata.name }}{{ listdata.token }}) {{ $t("message.历史月份涨跌比例") }}</h2>
              <div class="history_chart">
                <div class="view">
                  <div class="chartstyle" id="now_year" ref="now_year"></div>
                </div>
              </div>
              <h2>{{ listdata.name }}{{ listdata.token }}) {{ $t("message.历史数据") }}</h2>
              <div class="history_time_select">
                <el-date-picker
                  v-model="dataValue"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  value-format="yyyy-MM-dd"
                  align="right"
                  @change="selectTimeDate"
                  :picker-options="pickerOptions"
                ></el-date-picker>
              </div>
              <el-table
                style="width: 100%"
                :data="historyListData"
                class="coin_list_global"
                v-loading="loading"
              >
                <el-table-column
                  prop="date"
                  :label="$t('message.日期')"
                ></el-table-column>
                <el-table-column
                  prop="open"
                  :label="
                    $t('message.开盘价') + '(' + $store.state.curRate + ')'
                  "
                ></el-table-column>
                <el-table-column
                  prop="high"
                  :label="
                    $t('message.最高价') + '(' + $store.state.curRate + ')'
                  "
                ></el-table-column>
                <el-table-column
                  prop="low"
                  :label="
                    $t('message.最低价') + '(' + $store.state.curRate + ')'
                  "
                ></el-table-column>
                <el-table-column
                  prop="close"
                  :label="
                    $t('message.收盘价') + '(' + $store.state.curRate + ')'
                  "
                ></el-table-column>
                <el-table-column
                  prop="amount"
                  :label="
                    $t('message.成交额') + '(' + $store.state.curRate + ')'
                  "
                >
                  <template slot-scope="scope">{{
                    scope.row.value | reverseStr
                  }}</template>
                </el-table-column>
                <el-table-column
                  prop="market_value"
                  :label="$t('message.市值') + '(' + $store.state.curRate + ')'"
                  align="right"
                >
                  <template slot-scope="scope">{{
                    scope.row.market_value | reverseStr
                  }}</template>
                </el-table-column>
              </el-table>
              <div class="pages">
                <el-pagination
                  background
                  layout="prev, pager, next"
                  :total="Number(histroryCount)"
                  @current-change="handleCurrentChange"
                  :page-size="100"
                  :hide-on-single-page="true"
                  :current-page="Number(page)"
                ></el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Toptool from "../commen/toptool";
import filters from "~/plugins/filters-plus";
import echarts from "echarts"; // 引入echarts
import { getSocket } from "~/plugins/socket.js";
let firstChart,
  myChart,
  myChart1,
  myChart2,
  myChart3,
  now_year_chart;
export default {
  watchQuery: ["page", "currency"],
  props: {
    // 父辈向子辈传参
  },
  name: "datail",
  data() {
    return {
      loading: true,
      proup: false, //是否显示悬浮头
      title: [],
      keywords: [],
      description: [],
      language: this.$store.state.language,
      lastyearDate: [],
      nowyearDate: [],
      social: [],
      listdata: [],
      maxsupply: 0,
      incream: [],
      holddata: [],
      holdtotal: [],
      theyear: 0,
      percent_top10: [],
      percent_top20: [],
      percent_top50: [],
      percent_top100: [],
      historyListData: [],
      histroryCount: [],
      historyData: [],
      hold_sata: [],
      lastMonth: [],
      topDate: [],
      topNum: [],
      wsData: 0, // 保存 websocket 数据对象
      wsUpDown: 0,
      sendCodeData: ["bitcoin"],
      rateCur: 1,
      changeStatu: 0,
      show: false,
      nowposition: [],
      nowposition2: [],
      defaultImg: 'this.src="' + require("~/assets/cash_icon.png") + '"',
      isshowtxt:false,
      tab: [
        {
          id: 1,
          name: "数据",
          status: 1,
        },
        {
          id: 2,
          name: "介绍",
          status: 1,
        },
        {
          id: 3,
          name: "历史数据",
          status: 1,
        },
        {
          id: 4,
          name: "持币",
          status: 1,
        },
        {
          id: 5,
          name: "相关资讯",
          status: 1,
        },
      ],
      csutomTab: ["数据", "介绍", "历史数据", "相关资讯", "持币"],

      csutomTabIdx: 0,
      chartsData: [],
      newslist: [],
      activities: [],
      gettopdata: [],
      newPrice: [],
      selectDateIndex: 0,
      monthdata:[],
      selectDate: [
        {
          name: "7DAY",
          value: [],
        },
        {
          name: "1MONTH",
          value: [],
        },
        {
          name: "3MONTH",
          value: [],
        },
        {
          name: "1YEAR",
          value: [],
        },
        {
          name: "All",
          value: [],
        },
      ],
      pickerOptions: {
        language: "en-us",
        shortcuts: [
          {
            text: this.$t("message.近7天"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("message.近1个月"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            },
          },
          {
            text: this.$t("message.近3个月"),
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            },
          },
        ],
      },
      dataValue: [],
      dealname: [],
      pairNav: [],
      dealvalue: [],
      exchangeCoinlist: [],
      coinGoodsChildIdx: 0,
      coinCount: [],
      token: [],
      page: 1,
      columns1: [
        {
          title: "#",
          type: "index",
          width: "50",
          align: "center",
        },
        {
          title: this.$t("message.币种"),
          key: "name",
          width: "160",
          render: (h, params) => {
            return h(
              "div",
              {
                style: "display:flex;justify-content:left;align-items:center",
              },
              [
                h("div", [
                  h("img", {
                    props: {
                      type: "primary",
                      size: "small",
                    },
                    attrs: {
                      src:
                        this.$store.state.bixiaobao +
                        params.row.exchange.logo_m,
                    },
                    style: "width: 26px;height:26px;margin-right:5px",
                  }),
                ]),
                h("div", [
                  h("h3"),
                  [
                    h(
                      "a",
                      {
                        attrs: {
                          href:
                            "/" +
                            this.$store.state.locale +
                            "/exchange/" +
                            params.row.exchange.code,
                          target: "_blank",
                        },
                      },
                      this.$store.state.locale == "cn"
                        ? params.row.exchange.name
                        : params.row.exchange.code
                    ),
                  ],
                ]),
              ]
            );
          },
        },
        {
          title: this.$t("message.交易对"),
          key: "symbol",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h(
              "a",
              {
                attrs: {
                  href: params.row.exchangeurl,
                  target: "_blank",
                  rel: "nofollow",
                },
              },
              params.row.symbol
            );
          },
        },
        {
          title:
            this.$t("message.最新价") + "(" + this.$store.state.curRate + ")",
          key: "price_now",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("span", filters.formatePrice(params.row.price_now));
          },
        },
        {
          title: this.$t("message.24H成交量"),
          key: "amount24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h("span", filters.formatMoney(params.row.amount24h)),
              h(
                "p",
                {
                  style: "font-size:12px;color:#50546a;line-height:12px",
                },
                params.row.token
              ),
            ]);
          },
        },
        {
          title:
            this.$t("message.24H额") + "(" + this.$store.state.curRate + ")",
          key: "volume24h",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("div", [
              h("span", filters.formatMoney(params.row.volume24h)),
              h(
                "p",
                {
                  style: "font-size:12px;color:#50546a;line-height:12px",
                },
                this.$store.state.currency
              ),
            ]);
          },
        },
        {
          title: this.$t("message.占比"),
          key: "tokenpercent",
          sortable: true,
          align: "right",
          render: (h, params) => {
            return h("span", params.row.tokenpercent + "%");
          },
        },
      ],
    };
  },
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: "description",
          name: "description",
          content: this.description,
        },
        {
          hid: "keywords",
          name: "keywords",
          content: this.keywords,
        },
      ],
    };
  },
  async asyncData({ $axios, $cookies, params, store, redirect, query, error }) {
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
    let currency = "";
    currency = $cookies.get("currency")
      ? $cookies.get("currency")
      : store.state.currency;
    let pages = query.page || 1;
    let timestamp = new Date().getTime();
    let newtime = (timestamp / 10).toFixed(0);
    let newtimeMin = (newtime / 60).toFixed(0);
    try {
      let [seoData, tokenData, tokenliset, newPriceData,getnewsList] = await Promise.all([
        $axios
          .get("/v1/token/seo/" + params.id + "/?language=" + urdata)
          .catch((err) => {
            console.log(err);
          }),
        $axios
          .get(
            "v1/token/symbol/" +
              params.id +
              "/?language=" +
              urdata +
              "&currency=" +
              currency +
              "&page=" +
              pages
          )
          .catch((err) => {
            console.log(err);
          }),
        $axios
          .get(
            "/token/detail/" +
              params.id +
              "/?language=" +
              urdata +
              "&currency=" +
              currency
          )
          .catch((err) => {
            console.log(err);
          }),
        $axios
          .get(
            "/token/price/detail/" +
              params.id +
              "/?language=" +
              urdata +
              "&currency=" +
              currency +
              "&t=" +
              newtime
          )
          .catch((err) => {
            console.log(err);
          }),
        $axios
          .get(
            "/article/column/" + params.id+
              "/?language=" +
              urdata +"&limit=5"
          )
          .catch((err) => {
            console.log(err);
          }),
  
          
      ]);
      return {
        title: seoData.data.data.title || params.id,
        keywords: seoData.data.data.keyword || params.id,
        description: seoData.data.data.description || params.id,
        page: pages,
        exchangeCoinlist: tokenData.data.data,
        coinCount: tokenData.data.data.count,
        listdata: tokenliset.data.data,
        tab: tokenliset.data.data.tab,
        gettopdata: tokenliset.data.data.top,
        newPrice: newPriceData.data.data,
        newslist: getnewsList.data.data.results,
        loading: false,
      };
    } catch (err) {
      error({ statusCode: 404, message: "页面未找到" });
    }
  },
  created() {
    // 实例被创建之后执行代码
    this.uniqueArr(this.listdata, this.newPrice);
    this.timeOption();
    // if (this.$route.params.id == "bitcoin") {
    //   this.getSocketData(); //socket open
    // }
    let theyear = this.$moment().format("YYYY");
    this.theyear = Number(theyear);
  },
  computed: {
    // 计算属性
  },
  components: {
    // 组件的引用
    Toptool,
  },
  methods: {
    // 方法
    // changeselectDate(id) {
    //   this.selectDateIndex = id;
    //   this.$axios
    //     .get("exchange/trade/list/" + this.$route.params.id + "/", {
    //       params: {
    //         start: this.selectDate[id].value[0],
    //         end: this.selectDate[id].value[1],
    //       },
    //     })
    //     .then(({ data }) => {
    //       let datas = data.data.results;
    //       let datalist = [];
    //       for (let i = 0; i < datas.length; i++) {
    //         datalist.push([datas[i].date, datas[i].value]);
    //       }
    //       this.chartdataVol = datalist;
    //       this.loading = false;
    //       this.chartLarge();
    //     });
    // },
    getSocketData() {
      let params = this.sendCodeData;
      getSocket(
        "wss://api.bixiaobao.com/ws",
        JSON.stringify(params),
        (data, ws) => {
          // 保存数据对象, 以便发送消息
          let getwsData = JSON.parse(data.data);
          this.wsData = getwsData[0].price;
          this.wsUpDown = Number(getwsData[0].change).toFixed(2);
        }
      );
    },
    uniqueArr(arr1, arr2) {
      let arr3 = Object.assign(arr1, arr2);
      this.listdata = arr3;
    },
    openDatail() {
      const h = this.$createElement;
      this.$alert(
        this.listdata.summary,
        this.listdata.token + "/" + this.listdata.code,
        {
          distinguishCancelAndClose: true,
          closeOnPressEscape: true,
          showConfirmButton: false,
          dangerouslyUseHTMLString: true,
        }
      );
    },
    setchartpos(high, low, now,type) {
      let a = high; //历史最高
      let b = low; //历史最低
      let c = now; //当前价格
      let intx = (c / a) * 100;
      let inty = intx * 0.65;
      let types=type;
      if(types==1){
         this.nowposition = {
          width: intx - 1 + "%",
        };
      }
      if(types==2){
         this.nowposition2 = {
          width: intx - 1 + "%",
        };
      }
    },
    ChangeShow(){
      if(this.isshowtxt!=true){
        this.isshowtxt=true
      }else{
        this.isshowtxt=false
      }
    },
    loadData(code, currency, language) {
      this.loading = true;
      this.$axios
        .get("token/detail/" + code + "/", {
          params: {
            language: language,
            currency: currency,
          },
        })
        .then(({ data }) => {
          this.listdata = data.data;
          this.gettopdata = data.data.top;
          this.chartBing(); //初始化图表
          this.chartZs(); //初始化图表
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getNewslist() {
      this.$axios
        .get("/article/column/" + this.$route.params.id + "/", {
          params: {
            language: this.$store.state.language,
            limit: 5,
          },
        })
        .then(({ data }) => {
          this.newslist = data.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    async tokenlist(token, page) {
      await this.$axios
        .get("v1/token/symbol/" + this.$route.params.id + "/", {
          params: {
            language: this.$store.state.language,
            currency: this.$store.state.currency,
            token: token,
            page: page,
          },
        })
        .then(({ data }) => {
          this.exchangeCoinlist = data.data;
          this.coinCount = data.data.count;
          this.loading = false;
        });
    },
    timeOption() {
      let today = this.$moment().format("YYYY-MM-DD");
      let today2 = this.$moment().format("YYYY-MM-DD 23:59:59");
      let fut = this.$moment().add(1, "days").format("YYYY-MM-DD 00:00:00");
      let eweek = this.$moment()
        .subtract(1, "weeks")
        .format("YYYY-MM-DD 00:00:00");
      let emonth = this.$moment()
        .subtract(1, "months")
        .format("YYYY-MM-DD 00:00:00");
      let emonth2 = this.$moment().subtract(1, "months").format("YYYY-MM-DD");
      this.dataValue.push(emonth2, today);
      var lastMonth = [];
      for (var i = 0; i < 30; i++) {
        lastMonth.unshift(
          new Date(
            new Date().setDate(new Date().getDate() - i)
          ).toLocaleDateString()
        );
      }
      this.lastMonth = lastMonth;
      let threemonth = this.$moment()
        .subtract(3, "months")
        .format("YYYY-MM-DD 00:00:00");
      let eyear = this.$moment()
        .subtract(1, "years")
        .format("YYYY-MM-DD 00:00:00");
      this.selectDate[0].value.push(eweek, today2);
      this.selectDate[1].value.push(emonth, fut);
      this.selectDate[2].value.push(threemonth, fut);
      this.selectDate[3].value.push(eyear, fut);
    },
    initGetdata(id) {
      this.timeOption();
      this.loading = true;
      let paramsdata = {};
      this.selectDateIndex = id;
      firstChart.showLoading();
      this.setchartpos(
        this.historyData.history_high,
        this.historyData.history_low,
        this.listdata.price_now,
        1
      );
      this.setchartpos(
        this.historyData.days_70_high,
        this.historyData.days_70_low,
        this.listdata.price_now,
        2
      );
      paramsdata = {
        language: this.$store.state.language,
        currency: this.$store.state.currency,
        start: this.selectDate[id].value[0],
        end: this.selectDate[id].value[1],
      };
      if (id == "4") {
        paramsdata = {
          language: this.$store.state.language,
          currency: this.$store.state.currency,
        };
      }
      this.$axios
        .get("token/market/list_new/" + this.$route.params.id + "/", {
          params: paramsdata,
        })
        .then(({ data }) => {
          this.chartsData = data.data.results.reverse();
          this.chartlage(this.chartsData);
        });
      this.loading = false;
    },
    forTopdata(code, currency) {
      if (this.holddata != "") return false;
      this.$axios
        .get("token/hold/" + code + "/", {
          params: {
            language: this.$store.state.language,
            currency: currency,
          },
        })
        .then(({ data }) => {
          // if(data.status == 0) return this.csutomTab=["数据", "介绍", "历史数据"];
          if (data.status == 0)
            return (this.csutomTab = ["数据", "介绍", "历史数据", "相关资讯"]);
          this.holddata = data.data;
          this.holdtotal = data.data.total;
          let newtop10 = [];
          let newtop20 = [];
          let newtop50 = [];
          let newtop100 = [];
          let top10data = data.data.top_percent.top10 || "";
          let top20data = data.data.top_percent.top20 || "";
          let top50data = data.data.top_percent.top50 || "";
          let top100data = data.data.top_percent.top100 || "";
          for (var i = 0; i < top10data.length; i++) {
            newtop10.push(parseFloat(top10data[i]));
          }
          for (var i = 0; i < top20data.length; i++) {
            newtop20.push(parseFloat(top20data[i]));
          }
          for (var i = 0; i < top50data.length; i++) {
            newtop50.push(parseFloat(top50data[i]));
          }
          for (var i = 0; i < top100data.length; i++) {
            newtop100.push(parseFloat(top100data[i]));
          }
          this.percent_top10 = newtop10;
          this.percent_top20 = newtop20;
          this.percent_top50 = newtop50;
          this.percent_top100 = newtop100;
          this.hold_sata = data.data.hold_sata;
          this.chartCb();
          this.chartQs();

          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleCoinGoodsChild(idx, value) {
      this.coinGoodsChildIdx = idx;
      if (value == "全部" || value == "all") {
        value = "";
        this.token = "";
      }
      this.token = value;
      this.page = 1;
      this.loading = true;
      this.tokenlist(value);
    },
    handleCsutomTab,
    sum(arr) {
      return eval(arr.join("+"));
    },
    //初始化数据
    chartlage(val) {
      //大折线图
      let data0 = splitData(val);
      // macd计算
      function splitData(rawData) {
        var categoryData = [];
        var values = [];
        var usdtprice = [];
        var btcprice = [];
        var rmbprice = [];
        var volnumb = [];
        for (var i = 0; i < rawData.length; i++) {
          categoryData.push(
            rawData[i][0].substring(
              0,
              rawData[i][0].indexOf(":", rawData[i][0].indexOf(":") + 1)
            )
          );
          usdtprice.push(rawData[i][1]); //价格
          btcprice.push(rawData[i][2]); //交易量
          volnumb.push(rawData[i][3]); //流通市值
        }
        return {
          categoryData: categoryData,
          usdtprice: usdtprice,
          btcprice: btcprice,
          volnumb: volnumb,
        };
      }
      const dwdm = this.$t("message.亿");
      const tokenname = this.listdata.token;
      let getcur = this.$cookies.get("currency");
      let getlang = this.$cookies.get("lang");
      let _this = this;
      //交易对成交额占比
      firstChart.setOption({
        tooltip: {
          trigger: "axis",
          backgroundColor: "rgba(255, 255, 255)",
          borderWidth: 1,
          borderColor: "#E9E9E9",
          padding: 10,
          textStyle: {
            color: "#50546A",
            fontSize: 13,
            fontFamily: "Lato",
          },
          extraCssText: "box-shadow: 2px 2px 0 rgba(0, 0, 0, 0.1);",
          formatter: function (a) {
            let list = [a[0].name];
            let listItem = "";
            for (var i = 0; i < a.length; i++) {
              if (
                a[i].seriesName == "流通市值" ||
                a[i].seriesName == "유통지수"
              ) {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>&nbsp&nbsp" +
                    a[i].data +
                    "&nbsp" +
                    dwdm
                );
              } else if (a[i].seriesName == "Market Cap") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Lato, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Lato, Helvetica, Arial, sans-serif;'>" +
                    filters.en_market_reverseStr(a[i].data) +
                    "</span>"
                );
              } else if (a[i].seriesName == "Рыночная капитализация") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Lato, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Lato, Helvetica, Arial, sans-serif;'>" +
                    filters.ru_market_reverseStr(a[i].data) +
                    "</span>"
                );
              } else if (a[i].seriesName == "成交额") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>&nbsp&nbsp" +
                    filters.cn_turnover_reverseStr(a[i].data)
                );
              } else if (a[i].seriesName == "成交額") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>&nbsp&nbsp" +
                    filters.tw_turnover_reverseStr(a[i].data)
                );
              } else if (a[i].seriesName == "거래금액") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                    a[i].seriesName +
                    "</span>&nbsp&nbsp" +
                    filters.kr_turnover_reverseStr(a[i].data)
                );
              } else if (a[i].seriesName == "Объем") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Lato, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Lato, Helvetica, Arial, sans-serif;'>" +
                    filters.ru_turnover_reverseStr(a[i].data) +
                    "</span>"
                );
              } else if (a[i].seriesName == "Volume") {
                list.push(
                  '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                    a[i].color +
                    ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Lato, Helvetica, Arial, sans-serif;">' +
                    a[i].seriesName +
                    "</span>" +
                    "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Lato, Helvetica, Arial, sans-serif;'>" +
                    filters.en_turnover_reverseStr(a[i].data) +
                    "</span>"
                );
              } else {
                if (getlang == "ru" || getlang == "en") {
                  list.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      a[i].color +
                      ';margin-right: 10px;border-radius: 50%;}"></i><span style="display:inline-block;font-family: Lato, Helvetica, Arial, sans-serif;">' +
                      a[i].seriesName +
                      "</span>" +
                      "<br/><span style='margin-left:20px;display:inline-block;height:20px;line-height:20px;font-family: Lato, Helvetica, Arial, sans-serif;'>" +
                      _this.$store.state.curRate +
                      a[i].data +
                      "</span>"
                  );
                } else {
                  list.push(
                    '<i style="display: inline-block;width: 10px;height: 10px;background: ' +
                      a[i].color +
                      ';margin-right: 10px;border-radius: 50%;}"></i><span style="width:70px; display:inline-block;">' +
                      a[i].seriesName +
                      "</span>&nbsp&nbsp" +
                      _this.$store.state.curRate +
                      a[i].data
                  );
                }
              }
            }
            listItem = list.join("<br>");

            return '<div class="showBox">' + listItem + "</div>";
          },
        },
        color: ["#5480D8", "#D85454", "#C4C6CE"],
        legend: {
          data: [
            getcur == "CNY"
              ? this.$t("message.人民币价格")
              : getcur == "KRW"
              ? this.$t("message.韩币价格")
              : this.$t("message.美元价格"),
            this.$t("message.流通市值"),
            this.$t("message.成交额"),
          ],
          inactiveColor: "#777",
          textStyle: {
            color: "#555",
          },
          icon: "roundRect",
          bottom: "8",
        },
        icon: "circle",
        grid: [
          {
            show: true,
            borderWidth: 0,
            borderColor: "#eee",
            left: "0",
            right: "0",
            top: "0",
            height: "68.1%",
            with: "100%",
          },
          {
            show: true,
            borderWidth: 0,
            borderColor: "#eee",
            left: "0%",
            right: "0%",
            bottom: "13%",
            height: "19%",
            with: "100%",
          },
        ],
        xAxis: [
          {
            type: "category",
            data: data0.categoryData,
            scale: true,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: "#ccc",
                width: "0",
              },
            },
            // splitLine: {
            //   show: true,
            //   lineStyle: {
            //     color: "#efefef"
            //   }
            // },
            splitNumber: 20,
            axisLabel: {
              color: "#999",
              fontFamily: "Lato",
              show: false,
            },
            axisTick: {
              lineStyle: {
                width: "0",
              },
            },
          },
          {
            type: "category",
            gridIndex: 1,
            data: data0.categoryData,
            scale: true,
            // boundaryGap: false,
            axisLine: { onZero: false, show: false },
            axisTick: { show: false },
            // splitLine: {
            //   //网格线
            //   show: true,
            //   lineStyle: {
            //     color: "#efefef",
            //   },
            // },
            axisLabel: { color: "#999" },
            splitNumber: 20,
            min: "dataMin",
            max: "dataMax",
          },
        ],
        yAxis: [
          {
            type: "value",
            splitLine: {
              show: true,
              lineStyle: {
                color: "#efefef",
              },
            },
            axisLabel: {
              align: "right",
              padding: [0, 15, 0, 0],
              color: "#5480D8",
              fontFamily: "Lato",
              verticalAlign: "bottom",
              formatter: this.$store.state.curRate + "{value}",
            },
            axisTick: {
              lineStyle: {
                width: "0",
              },
            },
            scale: true,
            axisLine: {
              show: false,
            },
            position: "right",
          },

          {
            scale: true,
            gridIndex: 1,
            splitNumber: 1,
            axisLabel: { show: false },
            axisLine: { show: false },
            axisTick: { show: false },
            splitLine: { show: false },
          },
          {
            type: "value",
            splitLine: {
              show: false,
              lineStyle: {
                color: "#efefef",
              },
            },
            axisLabel: {
              align: "left",
              padding: [0, 0, 0, 15],
              color: "#b60300",
              fontFamily: "Lato",
              verticalAlign: "bottom",
              formatter:
                this.$store.state.curRate + "{value}" + this.$t("message.亿"),
            },
            axisTick: {
              lineStyle: {
                width: "0",
              },
            },
            scale: true,
            axisLine: {
              show: false,
            },
            position: "left",
          },
        ],
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 100,
            xAxisIndex: [0, 1],
            minValueSpan: 30,
          },
        ],
        axisPointer: {
          type: "cross",
          link: { xAxisIndex: "all" },
          label: {
            backgroundColor: "#777",
          },
        },
        series: [
          {
            name:
              getcur == "CNY"
                ? this.$t("message.人民币价格")
                : getcur == "KRW"
                ? this.$t("message.韩币价格")
                : this.$t("message.美元价格"),
            type: "line",
            data: data0.usdtprice,
            smooth: true, //平滑
            showSymbol: false,
            lineStyle: {
              normal: {
                width: 1.6,
              },
            },
          },
          {
            name: this.$t("message.流通市值"),
            type: "line",
            data: data0.volnumb,
            smooth: true, //平滑
            showSymbol: false,
            yAxisIndex: 2,
            lineStyle: {
              normal: {
                width: 1.6,
              },
            },
          },
          {
            name: this.$t("message.成交额"),
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: data0.btcprice,
            itemStyle: {
              color: "rgba(196, 198, 206, 0.7)",
            },
            emphasis: {
              itemStyle: {
                color: "rgba(196, 198, 206, 1)",
              },
            },
          },
        ],
      });
      firstChart.hideLoading();
    },
    chartBing() {
      //饼图
      let token_deal = this.listdata.token_deal;
      let dealname = [];
      let pairNav = [];
      let dealvalue = [];
      let sexvalue = [];
      let allval = 0;
      for (let key in token_deal) {
        dealname.push(key);
        pairNav.push(key);
        dealvalue.push({
          name: key,
          value: token_deal[key],
        }); /*属性值*/
        sexvalue.push(token_deal[key]);
      }

      for (var i = 0; i < sexvalue.length; i++) {
        allval += sexvalue[i];
      }
      if (allval < 100) {
        dealvalue.push({
          name: "other",
          value: (100 - allval).toFixed(2),
        });
        dealname.push("other");
      }

      this.dealvalue = dealvalue;
      this.dealname = dealname;
      this.pairNav = pairNav;
      for (let i = 0; i <= dealname.length; i++) {
        if (dealname[i] == "KRW" && this.$store.state.language == "ko_KR") {
          this.coinGoodsChildIdx = i + 1;
        }
      }
      //交易对成交额占比
      myChart.setOption({
        tooltip: {
          trigger: "item",
          formatter: "{b} <br/>{a}:{c}%",
        },
        legend: {
          show:false,
          orient: "vertical",
          right: "40%",
          top: "20%",
          width: "260",
          height: "180",
          itemGap: 16,
          itemWidth: 40,
          data: this.dealname,
          formatter: (name) => {
            var index = 0;
            var clientlabels = this.dealname;
            var clientcounts = this.dealvalue;
            clientlabels.forEach(function (value, i) {
              if (value == name) {
                index = i;
              }
            });
            return name + "  " + clientcounts[index].value + "%";
          },
        },
        series: [{
            type: 'treemap',
            name: this.$t("message.占比"),
            data: [{
                name: this.listdata.token,            // First tree
                value: 200,
                children: this.dealvalue
            }],
            left:0,
            right:0,
            top:0,
            color: [
              "#5480D8",
              "#658ddc",
              "#779ae0",
              "#87a6e4",
              "#99b3e8",
              "#aac0ec",
              "#bbcdf0",
              "#ccd9f4",
              "#dde6f8",
              "#eef3fc",
            ],
        }]
      });
    },
    chartZs() {
      //市值排行走势
      let topDate = [];
      let topNum = [];
      let topdata = this.gettopdata;

      for (let i = 0; i < topdata.length; i++) {
        topDate.push(topdata[i].date);
        topNum.push(topdata[i].market_value_index);
      }
      this.topDate = topDate.reverse();
      this.topNum = topNum.reverse();

      myChart3.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        grid: {
          left: "0%",
          right: "0%",
          top: "10%",
          containLabel: true,
          show: true,
          borderWidth: 1,
          borderColor: "#eee",
        },
        xAxis: {
          type: "category",
          data: this.topDate,
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
        },
        yAxis: {
          inverse: true,
          type: "value",
          position: "right",
          min: 1,
          minInterval: 20,
          axisLine: {
            show: false,
          },
          axisTick: {
            lineStyle: {
              width: "0",
            },
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: "#efefef",
            },
          },
          axisLabel: {
            align: "right",
            padding: [0, 15, 0, 0],
            color: "#999",
            verticalAlign: "bottom",
          },
        },
        series: [
          {
            data: this.topNum,
            type: "line",
            showSymbol: false,
            lineStyle: {
              width: 1,
              color: "#5480D8",
            },
          },
        ],
      });
    },
    chartCb() {
      //大户持币占比趋势
      myChart1.setOption({
        /* title: {
          text: "折线图堆叠"
        }, */
        tooltip: {
          trigger: "axis",
          formatter:
            "{b}" +
            "<br/>" +
            "{a0}:{c0}" +
            "%" +
            "<br/>" +
            "{a1}:{c1}" +
            "%" +
            "<br/>" +
            "{a2}:{c2}" +
            "%" +
            "<br/>" +
            "{a3}:{c3}" +
            "%",
        },
        legend: {
          data: [
            this.$t("message.前10名持币"),
            this.$t("message.前20名持币"),
            this.$t("message.前50名持币"),
            this.$t("message.前100名持币"),
          ],
          y: "85%",
          icon: "roundRect",
        },
        grid: {
          left: "3%",
          right: "4%",
          top: "10%",
          containLabel: true,
        },
        toolbox: {},
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.lastMonth,
        },
        yAxis: {
          type: "value",
          axisLabel: {
            //设置y轴数值为%
            formatter: "{value} %",
            textStyle: {
              color: "#333", //y轴刻度数值颜色
            },
          },
        },
        series: [
          {
            name: this.$t("message.前10名持币"),
            type: "line",
            showSymbol: false,
            data: this.percent_top10,
          },
          {
            name: this.$t("message.前20名持币"),
            type: "line",
            showSymbol: false,
            data: this.percent_top20,
          },
          {
            name: this.$t("message.前50名持币"),
            type: "line",
            showSymbol: false,
            data: this.percent_top50,
          },
          {
            name: this.$t("message.前100名持币"),
            type: "line",
            showSymbol: false,
            data: this.percent_top100,
          },
        ],
      });
    },
    chartQs() {
      //持币地址数变化趋势
      myChart2.setOption({
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        grid: {
          left: "3%",
          right: "-10%",
          top: "10%",
          containLabel: true,
          show: true,
          borderWidth: 1,
          borderColor: "#ccc",
        },
        xAxis: [
          {
            type: "category",
            data: this.lastMonth,
            axisTick: {
              alignWithLabel: false,
            },
            axisLine: {
              color: "#999",
              lineStyle: {
                color: "#999",
                width: 0,
              },
            },
          },
        ],
        yAxis: [
          {
            type: "value",
            position: "right",

            axisLine: {
              lineStyle: {
                color: "#eee",
                width: 0,
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              color: "#333",
              align: "right",
              padding: [0, 10, 0, 0],
              verticalAlign: "top",
            },
            z: 10,
          },
        ],
        series: [
          {
            name: this.$t("message.持币地址数"),
            type: "bar",
            barWidth: "60%",
            data: this.hold_sata,
            itemStyle: {
              normal: {
                color: "rgba(212,223,244,0.6)",
              },
            },
          },
        ],
      });
    },
    successTip(msg) {
      this.$notify({
        type: "success",
        message: msg,
      });
    },
    lastyearData() {
      // 绘制图表
     
      now_year_chart.setOption({
        grid: {
          top: 20,
          bottom: 20,
          left: 40,
          right: 10,
        },
        yAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#efefef",
            },
          },
          axisLabel:{
            formatter:"{value}%"
          },
          axisTick:{ //y轴刻度线
            show:false
          },
          axisLine: {//y轴线的颜色以及宽度
              show: false,
              lineStyle: {
                  color: "#898C9E",
                  width: 1,
                  type: "solid"
              },
          },
        },
        xAxis: {
          type: "category",
          axisLine: { show: false },
          // axisLabel: { show: false },
          axisTick: { show: false },
          splitLine: { show: false },
          data: this.monthdata,
        },
        series: [
          {
            name: "涨跌幅",
            type: "bar",
            stack: "总量",
            label: {
              show: true,
              formatter: "{c}%",
            },
           
            barWidth: 50,
            itemStyle: {
                //柱形图圆角，鼠标移上去效果
                emphasis: {
                    barBorderRadius: [8, 8, 8, 8]
                },
                normal: {
                    //柱形图圆角，初始化效果
                    barBorderRadius:[8, 8, 8, 8]
                }
            },
            data: this.nowyearDate
          },
        ],
      });
    },
    handleCurrentChange(val) {
      this.loading = true;
      this.selectTimeDate(this.$store.state.currency, val);
      this.page = val;
      this.$router.push({ path: this.$route.path, query: { page: val } });
    },
    handlepageChange(val) {
      this.loading = true;
      this.tokenlist(this.token, val);
      this.page = val;
      // this.$router.push({ path:this.$route.path, query:{ page:val } })
    },
    gethistoryDate(code, currency) {
      //现货，期货数据
      this.$axios
        .get("token/history/total/" + code + "/", {
          params: {
            language: this.$store.state.language,
            currency: currency,
          },
        })
        .then(({ data }) => {
          this.historyData = data.data;
          this.loading = false;
          let nowData = [];
          for (var i = 0, len = data.data.month.length; i < len; i++) {
            nowData.push({
              value: data.data.month[i].increase,
              label: { position: data.data.month[i].increase > 0 ? "top" : "bottom" },
              itemStyle: {
                color: data.data.month[i].increase > 0 ? "#5C925F" : "#B64341",
              },
            });
          }

          this.nowyearDate = nowData;
          
          let mdate = []
          for(var e=0;e<data.data.month.length;e++){
            mdate.push(data.data.month[e].date)
          }
          this.monthdata = mdate;



          this.setchartpos(
            this.historyData.history_high,
            this.historyData.history_low,
            this.listdata.price_now,
            1
          );
          this.setchartpos(
            this.historyData.days_70_high,
            this.historyData.days_70_low,
            this.listdata.price_now,
            2
          );
          this.lastyearData();
        });
    },
    async selectTimeDate(currency, page) {
      let url = this.$route.params.id;
      let timeCtrl = this.dataValue;
      if (!timeCtrl) return;
      await this.$axios
        .get("token/history/list/" + url + "/", {
          params: {
            language: this.$store.state.language,
            currency: currency,
            page: page,
            start: timeCtrl[0],
            end: timeCtrl[1],
          },
        })
        .then(({ data }) => {
          this.histroryCount = data.data.count;
          this.historyListData = data.data.results;
          this.loading = false;
          // lastIndexOf("\/")
        });
    },
    getMag(msg) {
      if (this.loading == false) {
        this.initGetdata(0);
      }
    },
    setLang(msg) {
      let getlang = "";
      if (msg == "cn") {
        getlang = "zh_CN";
      } else if (msg == "kr") {
        getlang = "ko_KR";
      } else if (msg == "ru") {
        getlang = "ru";
      } else {
        getlang = "en";
      }
      if ((this.loading = false)) {
        this.loadData(
          this.$route.params.id,
          this.$store.state.currency,
          getlang
        );
      }
      // if(this.csutomTabIdx == 2){
      //   this.selectTimeDate(this.$store.state.currency, this.page);
      // }
      // if (this.$store.state.language == "ko_KR") {
      //   this.tokenlist("KRW");
      // } else {
      //   this.tokenlist("USDT");
      //   this.coinGoodsChildIdx = 0;
      // }
      // this.$router.go(0)
    },
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop; // 滚动条偏移量
      if (scrollTop > 220) {
        this.proup = true;
      } else {
        this.proup = false;
      }
    },
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  mounted() {
    // this.tokenlist(this.language =='ko_KR'?'KRW':'USDT');
    window.addEventListener("scroll", this.handleScroll);
    myChart = echarts.init(this.$refs.main1); //交易对成交额占比
    firstChart = echarts.init(this.$refs.echartContainer); //交易对成交额占比
    myChart3 = echarts.init(this.$refs.main2); //市值排行走势
    myChart1 = echarts.init(this.$refs.holding_ratio); //大户持币占比趋势
    myChart2 = echarts.init(this.$refs.holding_trends); //持币地址数变化趋势
    now_year_chart = echarts.init(this.$refs.now_year); //去年历史涨跌
    this.initGetdata(0);
    this.forTopdata(this.$route.params.id, this.$store.state.currency);
    if (process.client) {
      this.chartBing();
      this.chartZs();
    }
    // this.getNewslist();
  },

  watch: {
    // 监测变化
    wsData: {
      handler: function (val, oldval) {
        let _this = this;
        _this.changeStatu = 0;
        if (val > oldval) {
          _this.changeStatu = 1;
        } else if (val < oldval) {
          _this.changeStatu = 2;
        } else {
          _this.changeStatu = 0;
        }
        let ralist = this.$store.state.ratelist;
        let raNew = [];
        for (let i = 0; i < ralist.length; i++) {
          if (this.$store.state.currency == "CNY") {
            raNew = ralist[0].rate;
          } else if (this.$store.state.currency == "USD") {
            raNew = ralist[1].rate;
          } else {
            raNew = ralist[2].rate;
          }
        }
        this.rateCur = Number(raNew);
        // console.log(raNew)
        setTimeout(function () {
          _this.changeStatu = 0;
        }, 500);
      },
      deep: true, //对象内部的属性监听，也叫深度监听
    },
  },
  filters: {
    //数据过滤
    numFilter: function (value, num) {
      let realVal = "";
      if (!isNaN(value) && value !== "") {
        // 截取当前数据到小数点后两位
        realVal = parseFloat(value).toFixed(num);
      } else {
        realVal = "";
      }
      return realVal;
    },
    removeHTMLTag: function (str) {
      return str.replace(/<\/?.+?\/?>/g, "");
    },
  },
};
function handleCsutomTab(idx) {
  // this.timeOption();
  this.csutomTabIdx = idx - 1;
  this.page = 1;
  if (idx == 3) {
    if (this.historyListData == "") {
      this.gethistoryDate(this.$route.params.id, this.$store.state.currency);
      this.timeOption();
      let theyear = this.$moment().format("YYYY");
      this.theyear = Number(theyear);
      this.selectTimeDate(this.$store.state.currency, this.page);
    } else {
      return false;
    }
  }
  // this.$router.push({ path:this.$route.path, query:{ page:1} })

  if (idx == 5) {
    this.getNewslist();
  }
}
</script>
<style scoped lang='scss'>
.disnone {
  display: none;
}
.tokenlist {
  .coin_name_nav {
    padding: 0 0 24px 5px;
    color: #6e6e6e;
    li {
      margin: 0 15px;
      cursor: pointer;
      &.active {
        color: #5480d8;
      }
    }
  }
  .el-table a {
    // color: #242735;
  }
  .Coinnames {
    padding-left: 26px;
    position: relative;
    img {
      position: absolute;
      left: 0;
      height: 20px;
      max-width: 30px;
    }
    p {
      color: #50546a;
      font-size: 13px;
    }
    a {
      color: #242735;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
}

.pricePopup {
  width: 100%;
  height: 64px;
  padding: 0 calc((100vw - 1200px) / 2);
  @media screen and (min-width: 1200px) {
    padding: 0 calc((100vw - 1200px) / 2);
  }
  @media screen and (min-width: 1440px) {
    padding: 0 calc((100vw - 1400px) / 2);
  }
  background-color: #fff;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  transform: translateY(-100%);
  transition: all 0.3s ease-in-out;
  display: flex;
  justify-content: space-between;
  align-items: center;
  white-space: nowrap;
  .leftcon {
    display: flex;
    justify-content: left;
    align-items: center;
  }
  .rightcon {
    display: flex;
    justify-content: right;
    align-items: center;
    .priceCon {
      margin-right: 10px;
      display: flex;
      align-items: center;
      .prices {
        font-size: 18px;
        font-weight: bold;
      }
      .btns {
        border-radius: 8px;
        margin-left: 10px;
        display: inline-block;
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
      }
      .down {
        background: #ea3943;
        color: #fff !important;
      }
      .up {
        background: #008555;
        color: #fff !important;
      }
    }
  }
}
.popped {
  transform: none;
  box-shadow: 0px 4px 24px rgba(88, 102, 126, 0.08),
    0px 1px 2px rgba(88, 102, 126, 0.12);
}
.aboutCoin{
  margin-bottom: 20px;
}
.coin_details {
  width: 100%;
  min-height: 800px;
  .container {
    width: 1200px;
    @media screen and (min-width: 1200px) {
      width: 1200px;
    }
    @media screen and (min-width: 1440px) {
      width: 1400px;
    }
    min-height: 800px;
    margin: 0 auto;
    /* 币对详情头部 */
    .coin_header {
      width: 100%;
      min-height: 360px;
      h1 {
        font-size: 14px;
        font-weight: normal;
      }
    }
    .coin_breadcrumbs {
      color: #898c9e;
      font-size: 14px;
      line-height: 22px;
      padding-top: 26px;
      a {
        color: #898c9e;
      }
    }
    /* 币对信息顶部 */
    .coin_top {
      width: 100%;
      // height: 150px;
      padding: 18px 0 32px 0;
      border-bottom: 1px solid #e9e9e9;
      .left {
        margin-right: 100px;
        img {
          width: 42px;
          margin-right: 14px;
          margin-bottom: 4px;
        }
        .currency {
          padding: 25px 50px 0 0;
          .coin_name {
            margin-bottom: 6px;
            span {
              font-size: 18px;
              color: #50546a;
              font-family: "Lato";
            }
            i {
              color: #242735;
              font-family: "Lato";
              font-weight: bold;
              font-size: 28px;
              margin-right: 5px;
              text-transform: capitalize;
            }
          }
          .ranking {
            background: rgba($color: #e95515, $alpha: 0.1);
            text-align: center;
            padding: 5px 13px;
            border-radius: 4px;
            color: #e95515;
            font-size: 14px;
            margin-right: 5px;
          }
          .included {
            background: #edf2fb;
            text-align: center;
            padding: 5px 13px;
            border-radius: 4px;
            color: #5480d8;
            font-size: 14px;
          }
        }
        .present_price {
          margin-left: 140px;
          min-width: 100px;
          span {
            display: inline-block;
            margin-top: 5px;
            font-size: 32px;
            color: #242735;
            font-weight: bold;
          }
        }
        .upShow,
        .downShow {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          padding: 5px 10px;
          border-radius: 4px;
        }
        .upShow {
          background: #129824;
        }
        .downShow {
          background: #ea3943;
        }
      }
      .right {
        width: 350px;
        .tagCon {
          em {
            display: inline-block;
            padding: 3px 12px;
            border-radius: 4px;
            background: rgba($color: #50546a, $alpha: 0.1);
            font-size: 14px;
            color: #50546a;
            margin: 0 8px 8px 0;
          }
        }
      }
    }
    /* 币对信息底部 */
    .coin_bottom {
      width: 100%;
      padding-top: 33px;
      justify-content: space-between;
      .coin_detail_left {
        width: 50%;
        .detail_view {
          display: flex;
          justify-content: left;
          min-height: 27px;
          margin-bottom: 10px;
          .view_titles {
            display: table;
            width: 80px;
            max-width: 110px;
            margin-right: 30px;
          }
          .tagCon {
            width: 100%;
            em {
              display: inline-block;
              padding: 3px 12px;
              border-radius: 4px;
              background: rgba($color: #50546a, $alpha: 0.1);
              font-size: 14px;
              color: #50546a;
              margin: 0 8px 8px 0;
            }
          }
        }
        
      }
      .coin_detail_right {
        width: 50%;
        ul {
          li {
            width: 25%;
            float: left;
            margin-bottom: 15px;
            min-height: 74px;
            vertical-align: top;
            text-align: right;
            .tit{
              margin-bottom: 5px;
            }
            .price{
              font-weight: bold;
            }
          }
        }
      }
    }
    .coin_details_left{
.pages{
          margin-bottom: 30px;
        }
    }
    .txtchart{
      background: #F8FAFD;
      h3{margin-bottom: 30px;}
    }
    .txtchart_Con{
      .tit{
        font-weight: bold;
        border-bottom: 1px solid #E9E9E9;
        padding-bottom: 10px;
        margin-bottom:20px;
      }
      ul{
        margin-bottom: 20px;
        li{
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding:12px 0;
          .vals{
            max-width:180px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
      }
    }
    /* 币对详情中间内容区 */
    .coin_details_page {
      width: 100%;
      min-height: 800px;
      margin-top: 20px;
      /* 中间内容区左侧 */
      .coinl_details_left {
        width: 100%;
        min-height: 800px;
        padding-bottom: 50px;
        /* 币种类别导航 */
        .coin_nav {
          height: 50px;
          border-bottom: 1px solid #e9e9e9;
          li {
            line-height: 50px;
            height: 50px;
            font-size: 16px;
            color: #6e6e6e;
            cursor: pointer;
            span {
              display: inline-block;
              margin: 0 20px;
            }
            &:hover {
              color: #f86b1d;
            }
            &.choice {
              position: relative;
              color: #f86b1d;
              font-weight: 500;
              &::after {
                content: "";
                position: absolute;
                width: 64px;
                background: #f86b1d;
                height: 4px;
                bottom: 0%;
                left: 50%;
                transform: translateX(-50%);
              }
            }
          }
        }
        .coin_news {
          .morelink {
            text-align: center;
            padding-top: 30px;
            display: block;
            clear: both;
            a {
              display: inline-block;
              border: 1px solid #5480d8;
              height: 46px;
              padding: 0 24px;
              line-height: 46px;
              border-radius: 23px;
              color: #5480d8;
            }
          }
          dl {
            float: left;
            width: 328px;
            height: 350px;
            padding-bottom: 22px;
            margin-bottom: 22px;
            margin-right: 20px;
            @media screen and (min-width: 1200px) {
              width: 260px;
            }
            @media screen and (min-width: 1440px) {
              width: 328px;
            }
            &:nth-child(3n){
              margin-right: 0;
            }
            &:last-child {
              border: none;
            }
            dt {
              width: 100%;
              margin-right: 30px;
              img {
                width: 100%;
                border-radius: 4px;
              }
            }
            dd {
              width: 100%;
              display: flex;
              flex-direction: column;
              a {
                color: #242735;
                &:hover {
                  color: #5480d8;
                }
              }
              .headtitle {
                font-size: 16px;
                margin-bottom: 6px;
                font-weight: bold;
              }
              .timedata {
                color: #898c9e;
                margin-top: auto;
              }
            }
          }
        }
        /* 币详情数据 */
        .coin_data {
          padding-top: 50px;
          display: flex;
          justify-content: space-between;
          .coin_left_bar {
            width: 100%;
            padding-right: 40px;
          }
          .coin_right_bar {
            width: 286px;
            display: table;
             @media screen and (min-width: 1200px) {
              width: 286px;
            }
            @media screen and (min-width: 1440px) {
              width: 328px;
            }
            .bar_view {
              padding: 20px;
              margin-bottom: 20px;
            }
            .nmupercent {
              .view {
                font-size: 12px;
                color: #50546a;
                line-height: 47px;
                height: 47px;
                border-bottom: 1px solid #efefef;
                display: flex;
                justify-content: space-between;
                &:last-child {
                  border-bottom: 0;
                }
                div,
                span {
                  width: 100%;
                  padding: 0 20px;
                }
                div {
                  width: 190px;
                  padding: 0;
                  text-align: center;
                  border-right: 1px solid #efefef;
                }
                span {
                  display: block;
                  font-size: 14px;
                  color: #242735;
                  text-align: right;
                }
              }
              .title {
                text-align: center;
                font-size: 16px;
                display: block;
              }
            }
          }
          h2 {
            font-size: 22px;
            color: #242735;
            position: relative;
            font-weight: 500;
            margin-bottom: 40px;
            // &::before {
            //   content: "";
            //   position: absolute;
            //   bottom: 20%;
            //   left: 0;
            //   width: 4px;
            //   height: 13px;
            //   background: #242735;
            //   border-radius: 2px;
            // }
          }
          .chartCon {
            margin-bottom: 40px;
            position: relative;
            .selectDate {
              margin-bottom: 10px;
              padding-left: 26px;
              ul {
                overflow: hidden;
                text-align: right;
                li {
                  display: inline-block;
                  padding: 0 10px;
                  height: 26px;
                  line-height: 26px;
                  border: 1px solid #ffffff;
                  border-radius: 4px;
                  color: rgba($color: #5480d8, $alpha: 1);
                  cursor: pointer;
                  &.selectactive {
                    border: 1px solid #5480d8;
                  }
                  &:hover {
                    color: rgba($color: #5480d8, $alpha: 0.8);
                  }
                }
              }
            }
            .pages{
              margin-bottom: 20px;
            }
          }
        }
        .aboutMain{
          .openclose{
            display: block;
            background: #fff;
            padding:20px 0;
            color: #5480D8;
            font-size: 16px;
            font{
              cursor: pointer;
              text-decoration: underline;
            }
          }
        }
         .text_box {
            padding: 15px 0;

            display:-webkit-box;
            -webkit-line-clamp: 7;
            overflow: hidden;
            /* autoprefixer: off */
            -webkit-box-orient: vertical;
            /* autoprefixer: on */
            p{
              margin-bottom: 15px !important;
            }
          }
          .text_box.show{
            -webkit-line-clamp:inherit;
          }
        /* 币详情介绍 */
        .coin_introduce {
          min-height: 800px;
          padding-top: 30px;
         
          .show_fullText {
            font-size: 14px;
            float: right;
            color: #5480d8;
          }
          /* 发行时间 */
          .infoList_new {
            width: 100%;
            padding: 35px 200px 0 30px;
            .tit {
              color: #50546a;
              min-width: 80px;
              white-space: nowrap;
              margin-right: 16px;
              display: inline-block;
            }
            .val {
              white-space: nowrap;
              color: #242735;
            }
            .list_cell {
              width: 50%;
              float: left;
              line-height: 46px;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .list_cell_long {
              .info_concept {
                height: 36px;
                line-height: 36px;
                display: inline-block;
                margin-right: 20px;
                padding: 0 8px;
                color: #242735;
                text-decoration: none;
              }
            }
            &::after {
              content: "";
              display: block;
              height: 1px;
              clear: both;
            }
          }
          /* 相关链接 */
          .smallTit {
            font-size: 16px;
            margin-top: 50px;
            margin-bottom: 30px;
            font-weight: 500;
            color: #242735;
            // width: 64px;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
            &::after {
              content: "";
              width: 794px;
              position: absolute;
              top: 11px;
              left: 20%;
              border-bottom: 1px solid #e9e9e9;
            }
          }
          .infoList {
            width: 100%;
            padding: 0 200px 0 30px;
            .listCell {
              height: 46px;
              width: 50%;
              float: left;
              line-height: 46px;
              overflow: hidden;
              position: relative;
              text-overflow: ellipsis;
              white-space: nowrap;
              .tit {
                color: #50546a;
                // width: 80px;
                white-space: nowrap;
                margin-right: 16px;
                display: inline-block;
              }
              .val {
                white-space: nowrap;
                color: #242735;
                a {
                  margin-right: 5px;
                  display: inline-block;
                  color: #5480d8;
                  img {
                    width: 18px;
                    vertical-align: middle;
                  }
                }
              }
            }
            .listRow {
              &::after {
                content: "";
                display: block;
                height: 1px;
                clear: both;
              }
            }
          }
          /* 发展历程和路线 */
          .develop {
            font-size: 16px;
            margin-top: 50px;
            margin-bottom: 30px;
            font-weight: 500;
            color: #242735;
            width: 112px;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
            &::after {
              content: "";
              width: 742px;
              position: absolute;
              top: 11px;
              left: 145px;
              border-bottom: 1px solid #e9e9e9;
            }
          }
          .event_list {
            .coin_viewmore {
              height: 40px;
              line-height: 40px;
              display: block;
              color: #5480d8;
              padding-left: 181px;
            }
            .el-timeline-item:first-child {
              &div:first-child {
                border: none !important;
              }
            }
          }
          /* 投资机构 */
          .investment_list {
            overflow: hidden;
            width: 920px;
            & > div {
              width: 210px;
              height: 59px;
              display: flex;
              flex-flow: row nowrap;
              align-items: center;
              border: 1px solid #f0f2f9;
              padding: 12px;
              margin-top: 20px;
              float: left;
              margin-right: 20px;
              & > img {
                width: 35px;
                border-radius: 50%;
              }
              & > span {
                flex: 1;
                color: #0b1721;
                margin-left: 12px;
              }
            }
          }
        }
        /* 币详情持币 */
        .coin_holding {
          padding-top: 30px;
          /* 持币地址 */
          .coin_hold_address {
            font-size: 16px;
            margin-bottom: 28px;
            font-weight: 500;
            color: #242735;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
          }
          .hotDegree_table {
            width: 100%;
            margin-top: 30px;
            ul {
              li {
                width: 260px;
                height: 40px;
                color: #50546a;
                line-height: 40px;
                text-align: center;
              }
            }
            .hotDegree_two {
              li {
                color: #242735;
                font-size: 18px;
              }
            }
          }
          /* 持币占比趋势 */
          .smallTit_first_all {
            width: 100%;
            display: flex;
            justify-content: space-between;

            .smallTit_first_content {
              padding-top: 5px;
              width: 610px;
              position: relative;
              /* &:first-child {
                margin-right: 20px;
              } */
              h4 {
                font-size: 16px;
                margin-top: 50px;
                font-weight: 500;
                color: #242735;
                margin-left: 6px;
                position: relative;
                &::before {
                  content: "";
                  position: absolute;
                  bottom: 20%;
                  left: -6px;
                  width: 4px;
                  height: 13px;
                  background: #242735;
                  border-radius: 2px;
                }
                // &::after {
                //   content: "";
                //   width: 100%;
                //   position: absolute;
                //   top: 11px;
                //   left: 160px;
                //   border-bottom: 1px solid #e9e9e9;
                // }
              }
              .noDataStyles {
                width: 100%;
                border: 1px solid #dde0eb;
                text-align: center;
                font-size: 14px;
                color: #0b1721;
                line-height: 250px;
                margin-bottom: 50px;
              }
              .leftTime {
                position: absolute;
                top: 375px;
                left: 30px;
                color: #0b1721;
                font-size: 12px;
                font-weight: 400;
                text-align: left;
              }
              .rightTime {
                position: absolute;
                top: 375px;
                right: 30px;
                color: #0b1721;
                font-size: 12px;
                font-weight: 400;
                text-align: right;
              }
              .footStyle {
                width: 100%;
                margin-top: 25px;
                margin-bottom: -15px;
                display: flex;
                align-content: center;
                justify-content: left;
                button {
                  border: 0 solid #dde0eb;
                  font-size: 14px !important;
                  height: 30px;
                  line-height: 1 !important;
                }
                .cell {
                  color: #0b1721;
                  font-size: 14px;
                  font-weight: 400;
                  margin-right: 20px;
                  padding-left: 20px;
                  background-color: transparent;
                  position: relative;
                  &:last-child {
                    margin-right: 0;
                  }
                  span {
                    position: absolute;
                    width: 14px;
                    height: 14px;
                    top: 9px;
                    left: 0;
                    margin-right: 3px;
                  }
                }
              }
            }
          }
          .flow {
            font-size: 16px;
            margin-top: 50px;
            margin-bottom: 30px;
            font-weight: 500;
            color: #242735;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
            // &::after {
            //   content: "";
            //   width: 716px;
            //   position: absolute;
            //   top: 11px;
            //   left: 145px;
            //   border-bottom: 1px solid #e9e9e9;
            // }
          }
          .holding_coin_details {
            font-size: 16px;
            margin-top: 50px;
            margin-bottom: 30px;
            font-weight: 500;
            color: #242735;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
            // &::after {
            //   content: "";
            //   width: 700px;
            //   position: absolute;
            //   top: 11px;
            //   left: 20%;
            //   border-bottom: 1px solid #e9e9e9;
            // }
          }
        }
        /* 币详情历史数据 */
        .coin_history {
          padding-top: 50px;
          h2{
            margin-bottom: 40px;
            font-size: 22px;
          }
          .uncon {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 20px;
            width: 600px;
            margin: 0 auto;
            margin-bottom: 40px;
           
          }
          .unshow {
            width: 400px;
            height: 8px;
            margin: 0 auto;
            position: relative;
            background:#e9e9e9;
            border-radius: 4px;
            .unico {
              height: 8px;
              border-radius: 5px;
              display: inline-block;
              background: #898C9E;
              position: absolute;
              top: 0;
              left: 0;
            }
            .undiv {
              color: #898C9E;
              left: -34px;
              bottom: 10px;
              padding-left: 10px;
              min-width: 100px;
              i{
                position: absolute;
                right: -5px;
                top:8px;
                cursor: pointer;
              }
            }
          }
          .history_chart {
            height: 400px;
            .view {
              width: 100%;
              height: 350px;
              text-align: center;
              .title {
                font-size: 16px;
                color: #242735;
              }
            }
            .chartstyle {
              height: 350px;
              width: 1200px;
              @media screen and (min-width: 1200px) {
                width: 1200px;
              }
              @media screen and (min-width: 1440px) {
                width: 1400px;
              }
            }
          }
          .history_data {
            width: 100%;
            margin-bottom: 70px;
            .tit,
            .val {
              font-size: 14px;
              line-height: 36px;
              white-space: nowrap;
            }
            .val {
              color: #242735;
              flex: 1;
              padding-left: 10px;
            }
            .tit {
              color: #a1a6b4;
              width: 70px;
              margin-right: 20px;
            }
            .text_red {
              color: #d53c3c !important;
            }
            .text_green {
              color: #34a25f !important;
            }
          }
          .history_title {
            font-size: 16px;
            margin: 30px 0 15px;
            font-weight: 500;
            color: #242735;
            margin-left: 6px;
            position: relative;
            &::before {
              content: "";
              position: absolute;
              bottom: 20%;
              left: -6px;
              width: 4px;
              height: 13px;
              background: #242735;
              border-radius: 2px;
            }
          }
          .history_time_select {
            text-align: right;
          }
          .coin_list_global {
            padding-top: 15px;
          }
        }
      }
      /* 中间内容区右侧 */
      .coinl_details_right {
        /* width: 300px;
        min-height: 800px; */
        /* 汇率转换 */
        /* .exchangeRate {
          width: 300px;
          height: 280px;
          background: #ffffff;
          padding: 24px;
          margin-bottom: 20px;
          h3 {
            font-size: 16px;
            color: #242735;
            margin-bottom: 20px;
            font-weight: 500;
          }
          .time {
            font-size: 12px;
            color: #242735;
            margin-bottom: 16px;
          }
          .nav {
            color: #242735;
            font-size: 18px;
            margin-bottom: 15px;
          }
          .main {
            height: 45px;
            margin-bottom: 10px;
            border: 1px solid #cdcfd8;
            border-radius: 4px;
            .exchangeRate_left {
              height: 100%;
              width: 85px;
              color: #242735;
              font-size: 14px;
              position: relative;
              &::after {
                content: "";
                height: 30px;
                width: 1px;
                background: #e9e9e9;
                position: absolute;
                top: 8px;
                left: 86px;
              }
              .first {
                height: 45px;
                width: 85px;
                line-height: 45px;
                padding-left: 15px;
                color: #242735;
                font-size: 14px;
              }
            }
            .exchangeRate_right {
              height: 100%;
              width: 166px;
              input {
                width: 160px;
                height: 100%;
                padding-left: 20px;
                font-size: 14px;
                color: #242735;
                border: 0;
                outline: none;
              }
            }
          }
        } */
        /* 全网算力 */
        /* .networkStatus {
          min-height: 510px;
          padding: 24px;
          background: #fff;
          .header_net {
            font-size: 16px;
            color: #242735;
            font-weight: 500;
            position: relative;
          }
          .main_net {
            margin-top: 10px;
          }
          .item_net {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 5px 0;
          }
          .left_net {
            color: #50546A;
          }
          .right_net {
            color: #0b1721;
          }
          .lines {
            width: 276px;
            height: 1px;
            margin: 10px 0;
          }
        } */
      }
    }
  }
}
.el-table ::v-deep th {
  background: #f6f7fa;
}
.el-table ::v-deep .el-table__row {
  cursor: auto;
}
</style>
<style lang="scss">
.now_coin_all .ivu-table td {
  cursor: default;
}
.el-message-box__wrapper {
  p:first-child {
    height: 500px;
    overflow: scroll;
    p {
      height: auto;
      margin-bottom: 10px;
    }
  }
}
.coin_choose {
  .el-input__inner {
    width: 99px;
    height: 30px;
    padding: 0;
    padding-left: 14px;
  }
  .el-input__icon {
    line-height: 1;
  }
}
.tokenlist {
  tbody {
    td:first-child {
      .cell {
        text-align: center;
        min-width: 26px;
        min-height: 26px;
        display: inline-block;
        border: 1px solid #e4e4e4;
        border-radius: 4px;
        text-overflow: clip;
        padding: 0;
        margin-left: 15px;
      }
    }
  }
  thead {
    th:first-child {
      padding-left: 15px;
    }
  }
}
/* 币种选择下拉框 */
.el-message-box {
  width: 680px;
}
// .coin_top {
//   .el-select .el-input__inner {
//     height: 30px;
//     line-height: 30px;
//     color: #c7c8d2;
//     background: #ffffff;
//     padding-left: 14px;
//     border: 1px solid #cdcfd8;
//   }
//   .el-select .el-input__icon {
//     line-height: 1;
//   }
// }
/* 汇率计算下拉框 */
// .exchangeRate_left {
//   .el-select .el-input__inner {
//     border: 0;
//     padding: 0;
//     padding-left: 15px;
//     color: #242735;
//   }
// }
/* 发展历程和路线 */
.event_list {
  .el-timeline-item__timestamp.is-bottom {
    margin-top: 0;
    position: absolute;
    top: 5px;
    left: 20px;
    font-size: 16px;
    color: #242735;
  }
  .el-timeline-item__wrapper {
    padding-left: 161px;
  }
  .el-timeline-item__tail {
    border-left: 2px solid #f86b1d;
  }
  .el-timeline-item__content {
    color: #242735;
    line-height: 24px;
  }
  .el-timeline {
    padding-left: 19px;
  }
  .el-timeline-item__node {
    background: #fff;
    border: 1px solid #e95515;
    border-radius: 6px;
    top: 2px;
  }
}
.flow_address,
.flow_coin {
  .cell {
    div {
      text-align: center;
      min-width: 26px;
      border: 1px solid #e4e4e4;
      border-radius: 4px;
    }
  }
  /* thead {
    .cell {
      &:first-child {
      }
    }
  } */
}
</style>
