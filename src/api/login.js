import { postRequestParam, get } from '../utils/request'

// 获取图片验证码
export const  captcha = async (params = {}) =>{
    try {
        let res = await get('/code/image', params)
        return 'data:image/png;base64,' + btoa(new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
    } catch (err) {
        throw err
    }  
}

// 账号密码方式登陆
export const loginAccount = async (data = {}) => {
    let res = await postRequestParam('/authentication/form', data)
    return res
}
// 获取当前登陆用户信息
export const getCurrentUserInfo = async (data = {}) => {
    let res = await get('/admin/info', data)
    return res
}