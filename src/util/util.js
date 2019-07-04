
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
/**
 *  获取存储在session中的用户信息
 * */
export function getSessionUserInfo () {
    const user = sessionStorage.getItem('user')
    return user ? JSON.parse(user) : {}
}
/**
 *  获取存储在session中的token
 * */
export function getSessionToken () {
    const token = sessionStorage.getItem('token')
    return token ? token : ''
}
/**
 * 移除sessionStorage信息
 *  */
export function removeSession () {
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('token')
}

export const validateForm = {
    name: [{ required: true, message: '请输入名称', }],
    en_name: [{ required: true, message: '请输入单位英文名称', }],
    code: [{ required: true, message: '请输入单位代码', }],
    address: [{ required: true, message: '请选择单位地址' }],
    introduction: [{ required: true, message: '请输入介绍', }],
    logo: [{ required: true, message: '请上传logo', },],
    unitCode: [{ required: true, message: '请选择所属单位', },],
    unitType: [{ required: true, message: '请选择单位类型', },],

    loginAccount: [{ required: true, message: '请输入账号', }],
    nickName: [{ required: true, message: '请输入昵称', }],
    realName: [{ required: true, message: '请输入真实姓名', }],
    phone: [
        { required: true, message: '请输入正确格式的电话号码' },
        { pattern: /^((\+)?86|((\+)?86)?)0?1[3458]\d{9}$/, message: '请输入正确格式的电话号码'}
    ],
    email: [
        { required: true, message: '请输入正确格式的邮箱账号', }, 
        { type: 'email', message: '请输入正确格式的邮箱账号', }
    ], 
    gender: [{ required: true, message: '请选择性别', }],
    birthday: [{ required: true, message: '请选择出生日期', },],
    roleCode: [{ required: true, message: '请输入角色code', }],


    
}
export const typeList = [
    {
        id: '1231sdf',
        type: 0,
        name: '学校'
    },
    {
        id: '1www231sdf',
        type: 1,
        name: '企业'
    },
    {
        id: '12eee31sdf',
        type: 2,
        name: '空间'
    },
    {
        id: '123rrrr1sdf',
        type: 3,
        name: '孵化器'
    },
    {
        id: '123rrrrddd1sdf',
        type: 4,
        name: '教育厅'
    },
]

export function getUnitType (type) {
    let item = typeList.find(item => item.type === type)
    return item ? item.name : ''
}
