
/*分秒倒计时*/
export function countTime() {
  let m = 0;  //分
  let s = 59;  //秒
  setInterval(() => {
    if( m === 0 && s === 0 ){
       clearInterval(this.state.timer)
       this.timeOutAlert()
       m = 15;
       s = 59;
     }else if( m >= 0 ){
      if( s > 0 ){
        s--;
      }else if( s === 0 ){
        m--;
        s = 59;
      }
    }
    m = m < 10 ? (0 + m):m
    s = s < 10 ? ('0' + s):s
    let cou = m+':'+s
    return cou;
    })
}

// 日期处理函数
// formatDate(new Date().getTime());//2017-05-12
// formatDate(new Date().getTime(),'YY年MM月DD日');//2017年05月12日

export function dateUtil (time, format = 'YYYY-MM-DD') {
    let date = new Date(parseInt(time))
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hour = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    let preArr = Array.apply(null, Array(10)).map((elem, index) => {
        return '0' + index
    })
    let newTime = format.replace(/YYYY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec)
    return newTime
}
/**
 * 判断权限
 * @currentPath {String}当前将要跳转的菜单路径
 * @menu [list] 所有路由
 *  */
export function menuIsRoutes (currentPath, menu) {
    let isRedirect = false
    let keys = '0'
    for (let j = 0; j < menu.length; j++) {
        let item = menu[j]
        if (item.children.length < 1 && item.url && item.url.indexOf(currentPath) !== -1) {
            isRedirect = true
            keys = item.key
        }
        for (let j = 0; j < item.children.length; j++) {
            if (item.children[j].url.indexOf(currentPath) !== -1) {
                isRedirect = true
                keys = item.children[j].key
            }
        }
    }
    return { isRedirect, keys}
}

/**
 * 判断数据类型
 * @param {*} arg 被判断类型
 * @param {*} type 类型
 */
export function argType(arg, type) {
    if (Object.prototype.toString.call(arg) === type) {
        return true
    } else {
        return false
    }
}