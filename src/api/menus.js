import { postRequestBody, get } from '../utils/request'

// 获取菜单列表
export const getMenusList = async (data = {}) => {
    let res = await get('/permission/list', data)
    return res.data
}

// 添加菜单
export const addMenu = async (data = {}) => {
    let res = await postRequestBody('/permission/crearte', data)
    return res.data
}