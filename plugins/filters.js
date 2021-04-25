
/**
 * @description 格式化金额
 * @param number：要格式化的数字
 * @param decimals：保留几位小数 默认0位
 * @param decPoint：小数点符号 默认.
 * @param thousandsSep：千分位符号 默认为,
 */

import Vue from "vue";
import moment from 'moment';

export default ({ app, store, i18n }) => {

  if (store.state.locale == 'cn') {
    moment.locale('zh-cn');
  } else {
    moment.locale();
  }

  Vue.filter("formatMoney", function (number, decimals = 0, decPoint = '.', thousandsSep = ',') {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return s.join(dec)
  })
  Vue.filter("formatePrice", function (num) {
    if (num || num == 0) {
      num = num.toString().replace(/\$|\,/g, '')
      if (num === '' || isNaN(num)) {
        return ''
      }
      var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
      cents = cents.length > 1 ? cents : ''
      num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num
      if (cents === '') {
        if (num.length > 1 && num.substr(0, 1) === '0') {
          return ''
        }
      } else {
        if (num.length > 1 && num.substr(0, 1) === '0') {
          return ''
        }
      }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
      }
      return num + cents
    }

  })
  Vue.filter("tittleformatMoney", function (number, decimals = 0, decPoint = '.', thousandsSep = ',') {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '')
    let n = !isFinite(+number) ? 0 : +number
    let prec = !isFinite(+decimals) ? 0 : Math.abs(decimals)
    let sep = (typeof thousandsSep === 'undefined') ? ',' : thousandsSep
    let dec = (typeof decPoint === 'undefined') ? '.' : decPoint
    let s = ''
    let toFixedFix = function (n, prec) {
      let k = Math.pow(10, prec)
      return '' + Math.ceil(n * k) / k
    }
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
    let re = /(-?\d+)(\d{3})/
    while (re.test(s[0])) {
      s[0] = s[0].replace(re, '$1' + sep + '$2')
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || ''
      s[1] += new Array(prec - s[1].length + 1).join('0')
    }
    return store.state.curRate + s.join(dec)
  })
  
  // Vue.filter("reverseStr", function (val) {
  //   val = val.toString().replace(/\$|\,/g, '');
  //   if (val < 100000000 && val >= 10000) {
  //     let newval = val / 10000
  //     return newval.toFixed(2) + (store.state.locale=='cn'?'万':'만')
  //   } else if (val < 1000000000000 && val >= 100000000) {
  //     let newval = val / 100000000
  //     return newval.toFixed(2) +  (store.state.locale=='cn'?'亿':'억')
  //   } else if (val > 1000000000000) {
  //     let newval = val / 1000000000000
  //     return newval.toFixed(2) +  (store.state.locale=='cn'?'万亿':'만억')
  //   } else if (val == 0) {
  //     return '--'
  //   } else {
  //     return val
  //   }
  // })
  Vue.filter("reverseStr", function (val) {
    const lang = store.state.locale;
    if (lang == "en") {
      if (val < 1000000000 && val >= 1000000) {
        let newval = val / 1000000
        return newval.toFixed(2) + 'M'
      } else if (val >= 1000000000) {
        let newval = val / 1000000000
        return newval.toFixed(2) + 'B'
      } else {
        return val
      }
    } else if (lang == "ru") {
      if (val < 1000000000 && val >= 1000000) {
        let newval = val / 1000000
        return newval.toFixed(2) + 'млн'
      } else if (val >= 1000000000 && val < 1000000000000) {
        let newval = val / 1000000000
        return newval.toFixed(2) + 'млрд'
      } else if (val >= 1000000000000) {
        let newval = val / 1000000000000
        return newval.toFixed(2) + 'трлн'
      } else {
        return val
      }
    } else {
      if (val < 100000000 && val >= 10000) {
        let newval = val / 10000
        return newval.toFixed(2) + (lang == 'cn' ? '万' : lang == 'tw' ? '萬' : '만')
      } else if (val < 1000000000000 && val >= 100000000) {
        let newval = val / 100000000
        return newval.toFixed(2) + (lang == 'cn' ? '亿' : lang == 'tw' ? '億' : '억')
      } else if (val > 1000000000000) {
        let newval = val / 1000000000000
        return newval.toFixed(2) + (lang == 'cn' ? '万亿' : lang == 'tw' ? '萬億' : '만억')
      } else if (val == 0) {
        return '--'
      } else {
        return val
      }
    }
  })
  Vue.filter("en_reverseStr", function (val) {
    val = val.toString().replace(/\$|\,/g, '');
    if (val < 1000000000 && val >= 1000000) {
      let newval = val / 1000000
      return newval.toFixed(2) + 'M'
    } else if (val >= 1000000000) {
      let newval = val / 1000000000
      return newval.toFixed(2) + 'B'
    } else if (val == 0) {
      return '--'
    } else {
      return val
    }
  })

  Vue.filter("cn_en_kr_reverseStr", function (val) {
    const lang = app.$cookies.get('lang') || store.state.locale;
    if (lang == "cn") {
      if (val < 100000000 && val >= 10000) {
        let newval = val / 10000
        return newval.toFixed(2) + '万'
      } else if (val < 1000000000000 && val >= 100000000) {
        let newval = val / 100000000
        return newval.toFixed(2) + '亿'
      } else if (val > 1000000000000) {
        let newval = val / 1000000000000
        return newval.toFixed(2) + '万亿'
      } else if (val == 0) {
        return '--'
      } else {
        return val
      }
    } else if (lang == "kr") {
      if (val < 100000000 && val >= 10000) {
        let newval = val / 10000
        return newval.toFixed(2) + '만'
      } else if (val < 1000000000000 && val >= 100000000) {
        let newval = val / 100000000
        return newval.toFixed(2) + '억'
      } else if (val > 1000000000000) {
        let newval = val / 1000000000000
        return newval.toFixed(2) + '만억'
      } else if (val == 0) {
        return '--'
      } else {
        return val
      }
    } else {
      if (val < 1000000000 && val >= 1000000) {
        let newval = val / 1000000
        return newval.toFixed(2) + 'M'
      } else if (val >= 1000000000) {
        let newval = val / 1000000000
        return newval.toFixed(2) + 'B'
      } else {
        return val
      }
    }
  })

  Vue.filter("priceFloat", function (value) {
    value = value.toString();
    let Precision = 0;
    if (value >= 99999) {
      Precision = 0
    } else if (value > 1000 && value <= 9999) {
      Precision = 1
    } else if (value > 100 && value <= 999) {
      Precision = 2
    } else if (value > 1 && value <= 99) {
      Precision = 3
    } else if (value > 0.001 && value < 1) {
      Precision = 4
    } else if (value < 0.0009) {
      Precision = 6
    }
    var result = Number(value).toFixed(Precision);
    return result;
  })
  Vue.filter('dateformat', (dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') => {
    let today = moment().format("YYYY-MM-DD")
    let datatoday = moment(dataStr).format("YYYY-MM-DD")
    if (today == datatoday) {
      pattern = 'HH:mm:ss'
    }

    return moment(dataStr).format(pattern)
  })



  Vue.filter('formatDate', function (value) {
    let inRes = moment((moment().format("YYYY-MM-DD HH:mm:ss")), 'YYYY-MM-DD HH:mm:ss').valueOf()
    let dataRes = moment(value, 'YYYY-MM-DD HH:mm:ss').valueOf()
    let today = moment().format("YYYY-MM-DD")
    let datatoday = moment(value).format("YYYY-MM-DD")
    if (today == datatoday) {
      if (inRes > dataRes) {
        return moment(value).startOf('hour').fromNow();
      }
      return moment(value).startOf('days').fromNow();
    }
  })

  Vue.filter('changeFormatDate', function (value) {
    return moment(value).format("YYYY-MM-DD HH:mm:ss");
  })

  Vue.filter('phoneFilter', function (value) {
    let val = value.slice(3);
    let phone = val.replace(val.substring(3, 7), "****")
    return phone
  })
  Vue.filter('dateFilter', function (ele) {
    var lr = new Date(ele);
    var now = new Date;
    var dt = now - lr;

    var s = dt / 1000;

    var m = s / 60;

    var h = m / 60;

    if (s < 60) {

      return s + '秒前';

    } else if (s < 3600) {

      return parseInt(s / 60) + '分钟前';

    } else if (s < 86400) {

      return parseInt(s / 60 / 60) + '小时前';

    } else if (s < 604800) {//在一周内

      return parseInt(s / 60 / 60 / 24) + '天前';

    } else if (s < 2592000) {

      return parseInt(s / 60 / 60 / 24 / 7) + "周前"

    } else if (s < 2592000 && s > 604800) {//超过一周

      return parseInt(s / 60 / 60 / 24) + '天前';

    } else if (s < 31104000) {

      return parseInt(s / 60 / 60 / 24 / 30) + '月前';

    } else if (s < 311040000) {

      return parseInt(s / 60 / 60 / 24 / 30 / 12) + '年前';

    }
  })
}
