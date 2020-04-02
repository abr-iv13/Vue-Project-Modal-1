import Vue from 'vue'

/**
 * Для флоата 1000000,11:
 *
 * в шаблоне:
 * {{ someVar | numberFormat(0, '', ' ') }} // 1 000 000
 * {{ someVar | numberFormat(2, ',', ' ') }} // 1 000 000,11
 * {{ someVar | numberFormat(1, ',', '.') }} // 1.000.000,1
 * в JS:
 * this.$options.filters.numberFormat(someVar, 0, '', ' ') // 1 000 000
 */
Vue.filter('numberFormat', function(number, decimals, decPoint, thousandsSep, ending) {
  number = (number + '').replace(/[^0-9+\-Ee.]/g, '')
  const n = !isFinite(+number) ? 0 : +number
  const prec = !isFinite(+decimals) ? 2 : Math.abs(decimals)
  const sep = typeof thousandsSep === 'undefined' ? ' ' : thousandsSep
  const dec = typeof decPoint === 'undefined' ? '.' : decPoint
  let s = ''
  const toFixedFix = function(n, prec) {
    const k = Math.pow(10, prec)
    return '' + Math.round(n * k) / k
  }
  s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.')
  if (s[0].length > 3) {
    s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep)
  }
  if ((s[1] || '').length < prec) {
    s[1] = s[1] || ''
    s[1] += new Array(prec - s[1].length + 1).join('0')
  }
  return s.join(dec) + (ending || '')
})

/**
 * Для месяцев русское окончание исходя из цифры (2 месяца, 5 месяцев)
 *
 * в шаблоне:
 * {{ someVar | ending('месяц', 'месяца', 'месяцев') }}
 * либо массивом
 * {{ someVar | ending(['месяц', 'месяца', 'месяцев']) }}
 * в JS:
 * this.$options.filters.ending(someVar, 'месяц', 'месяца', 'месяцев')
 */
Vue.filter('ending', function(count, e1, e2, e3, ret = true, delim = ` `) {
  if (typeof e1 !== 'string') {
    e2 = e1[1]
    e3 = e1[2]
    e1 = e1[0]
  }

  ret = ret ? count + delim : ``

  const n = Math.abs(+count) % 100
  const n1 = n % 10
  if (n > 10 && n < 20) return ret + e3
  if (n1 > 1 && n1 < 5) return ret + e2
  if (n1 === 1) return ret + e1

  return ret + e3
})
