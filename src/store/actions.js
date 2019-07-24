// actions.js
// import API from '../api/api'
// import { message } from 'antd';

// action也是函数
export function setPageTitle (data) {
    return (dispatch, getState) => {
      dispatch({ type: 'SET_PAGE_TITLE', data: data })
    }
  }
// 注册
export function regist (data) {
    return (dispatch, getState) => {
        // let result =  API.getArticleList('/regist', data)
        // fetchPost('/regist', data)
        //     .then((res) => {
        //         if (res.code === 200) {
        //             message.success('注册成功', 2)
        //             dispatch({ type: 'SET_REGIST_VISIBLE', bool: false })
        //         } else {
        //             message.error('请求失败，请稍后重试', 2)
        //         }
        //     }).catch(err => {
        //         message.error('请求失败，请稍后重试！', 2)
        //         console.log(err)
        //     })
    }
}

export function setUserInfo (data) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_USER_INFO', data: data })
    }
}
export function seToken (data) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_TOKEN', data: data })
    }
}
export function setLoading (data) {
    return (dispatch, getState) => {
        dispatch({ type: 'SET_LOADING', data: data })
    }
}