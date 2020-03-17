import { postRequestBody, get } from '../utils/request'

// 获取用户列表
export const getUsersList = async (data = {}) => {
    try {
        let res = await get('/admin/list', data)
        return res.data
    } catch (err) {
        return err
    }
} 
// 添加用户
export const addUser = async (data = {}) => {
    try{
        let res = await postRequestBody('/admin/register', data)
        return res.data
    } catch (err) {
        return err
    }
}
// 删除用户
export const delUser = async (id) => {
    try{
        let res = await postRequestBody(`/admin/delete/${id}`)
        return res.data
    } catch (err) {
        return err
    }
}
// 根据id获取用户信息
export const getIdUserInfo= async (id) => {
    try{
        let res = await get(`/admin/${id}`)
        return res.data
    } catch (err) {
        return err
    }
}
// 修改用户信息
export const updateUser = async (id, data={}) => {
    try{
        let res = await postRequestBody(`/admin/update/${id}`, data)
        return res.data
    } catch (err) {
        return err
    }
}
// 给用户分配角色 
export const authUserRole = async (data = {}) => {
    try{
        let res = await postRequestBody(`/admin/role/update`, data)
        return res.data
    } catch (err) {
        return err
    }
}
// 获取指定用户角色
export const getIdUserRole = async (adminId) => {
    try{
        let res = await get(`/admin/role/${adminId}`)
        return res.data
    } catch (err) {
        return err
    }
}
