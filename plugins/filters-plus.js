export default {
  formatMoney(number, decimals = 0, decPoint = '.', thousandsSep = ',') {
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
  },
  formatePrice(num) {
    if (num || num == 0) {
      num = num.toString().replace(/\$|\,/g, '')
      if (num === '' || isNaN(num)) {
        return ' '
      }
      var cents = num.indexOf('.') > 0 ? num.substr(num.indexOf('.')) : ''
      cents = cents.length > 1 ? cents : ''
      num = num.indexOf('.') > 0 ? num.substring(0, (num.indexOf('.'))) : num
      if (cents === '') {
        if (num.length > 1 && num.substr(0, 1) === '0') {
          return ' '
        }
      } else {
        if (num.length > 1 && num.substr(0, 1) === '0') {
          return ' '
        }
      }
      for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++) {
        num = num.substring(0, num.length - (4 * i + 3)) + ',' + num.substring(num.length - (4 * i + 3))
      }
      return num + cents
    }

  },
  priceFloat(value) {
  value = value.toString();
  let Precision = 0;
  if (value >= 9999999) {
    Precision = 0
  } else if (value > 1000 && value <= 9999) {
    Precision = 1
  } else if (value > 100 && value <= 999) {
    Precision = 2
  } else if (value > 1 && value <= 99) {
    Precision = 3
  } else if (value > 0.001 && value <= 0.9) {
    Precision = 4
  } else if (value < 0.0009) {
    Precision = 6
  }
  var result = Number(value).toFixed(Precision);
  return result;
},
reverseStr(val,locale) {
  val = val.toString().replace(/\$|\,/g, '');
  
  let lang= locale
  if(lang=='en'){
    if (val < 1000000000 && val >= 1000000) {
      let newval = val / 1000000
      return newval.toFixed(2) + 'M'
    } else if (val >= 1000000000) { 
      let newval = val / 1000000000
      return newval.toFixed(2) +'B'
    } else if (val == 0) {
      return '--'
    } else {
      return val
    }
  }else if(lang == "ru"){
    if (val < 1000000000 && val >= 1000000) {
      let newval = val / 1000000
      return newval.toFixed(2) + 'млн'
    } else if (val >= 1000000000&& val < 1000000000000) {
      let newval = val / 1000000000
      return newval.toFixed(2) + 'млрд'
    }else if (val >= 1000000000000) {
      let newval = val / 1000000000000
      return newval.toFixed(2) + 'трлн'
    } else {
      return val
    }
  }else{
    if (val < 100000000 && val >= 10000) {
      let newval = val / 10000
      return newval.toFixed(2) + (lang=='cn'?'万':lang=='tw'?'萬':'만')
    } else if (val < 1000000000000 && val >= 100000000) {
      let newval = val / 100000000
      return newval.toFixed(2) + (lang=='cn'?'亿':lang=='tw'?'億':'억')
    } else if (val > 1000000000000) {
      let newval = val / 1000000000000
      return newval.toFixed(2) + (lang=='cn'?'万亿':lang=='tw'?'萬億':'만억')
    } else if (val == 0) {
      return '--'
    } else {
      return val
    }
  }
 
},
en_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val < 1000000000 && val >= 1000000) {
    let newval = val / 1000000
    return newval.toFixed(2) + 'M'
  } else if (val >= 1000000000) { 
    let newval = val / 1000000000
    return newval.toFixed(2) +'B'
  } else if (val < 1000000 && val >= 1000) { 
    let newval = val / 1000
    return newval.toFixed(2) +'K'
  }else if (val == 0) {
    return '--'
  } else {
    return val
  }
},
// 成交额
kr_turnover_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val < 1000000000000 && val >= 100000000) {
    let newval = val / 100000000
    return newval.toFixed(2) + ' 억'
  } else if (val >= 10000  && val < 100000000) { 
    let newval = val / 10000  
    return newval.toFixed(2) +' 만'
  } else if (val == 0) {
    return '--'
  } else {
    return val
  }
},
cn_turnover_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val < 1000000000000 && val >= 100000000) {
    let newval = val / 100000000
    return newval.toFixed(2) + ' 亿'
  } else if (val >= 10000  && val < 100000000) { 
    let newval = val / 10000  
    return newval.toFixed(2) +' 万'
  } else if (val == 0) {
    return '--'
  } else {
    return val
  }
},
tw_turnover_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val < 1000000000000 && val >= 100000000) {
    let newval = val / 100000000
    return newval.toFixed(2) + ' 億'
  } else if (val >= 10000  && val < 100000000) { 
    let newval = val / 10000  
    return newval.toFixed(2) +' 萬'
  } else if (val == 0) {
    return '--'
  } else {
    return val
  }
},
en_turnover_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val < 1000000000 && val >= 1000000) {
    let newval = val / 1000000
    return newval.toFixed(2) + 'M'
  } else if (val >= 1000000000) { 
    let newval = val / 1000000000
    return newval.toFixed(2) +'B'
  } else if (val < 1000000 && val >= 1000) { 
    let newval = val / 1000
    return newval.toFixed(2) +'K'
  }else if (val == 0) {
    return '--'
  } else {
    return val
  }
},
ru_turnover_reverseStr(val) {
  if (val < 1000000000 && val >= 1000000) {
    let newval = val / 1000000
    return newval.toFixed(2) + 'млн'
  } else if (val >= 1000000000&& val < 1000000000000) {
    let newval = val / 1000000000
    return newval.toFixed(2) + 'млрд'
  }else if (val >= 1000000000000) {
    let newval = val / 1000000000000
    return newval.toFixed(2) + 'трлн'
  } else {
    return val
  }
},
//流通市值
ru_market_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val >= 10) {
    let newval = val / 10
    return newval.toFixed(2) + 'млрд'
  } else {
    return val
  }
},
en_market_reverseStr(val) {
  val = val.toString().replace(/\$|\,/g, '');
  if (val >= 10) { 
    let newval = val / 10
    return newval.toFixed(2) +'B'
  } else if (val == 0) {
    return '--'
  } else {
    return val
  }
}
}