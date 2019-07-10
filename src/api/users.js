import { postRequestBody, get } from '../util/request'

// 获取用户列表
export const getUsersList = async (data = {}) => {
    let res = await get('/admin/list', data)
    return res.data
}
// 添加用户
export const addUser = async (data = {}) => {
    let res = await postRequestBody('/admin/register', data)
    return res.data
}
// 删除用户
export const delUser = async (id) => {
    let res = await postRequestBody(`admin/delete/${id}`)
    return res.data
}