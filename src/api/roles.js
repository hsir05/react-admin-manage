import { postRequestBody, get } from '../utils/request'

// 获取角色列表
export const getRolesList = async (data = {}) => {
    let res = await get('/role/list', data)
    return res.data
}

// 添加角色
export const addRole = async (data = {}) => {
    let res = await postRequestBody('/admin/register', data)
    return res.data
}