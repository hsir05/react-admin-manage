// reducers.js

// 工具函数，用于组织多个reducer，并返回reducer集合
import { combineReducers } from 'redux'
// 默认值
import defaultState from './state.js'

// 一个reducer就是一个函数 例子
function pageTitle (state = defaultState.pageTitle, action) {
  // 不同的action有不同的处理逻辑
  switch (action.type) {
    case 'SET_PAGE_TITLE':
      return action.data
    default:
      return state
  }
}
function loading (state = defaultState.loading, action) {
    switch (action.type) {
        case 'SET_LOADING':
            return action.data
        default:
            return state
    }
}
// 菜单
function menu (state = defaultState.menu, action) {
    return state 
}
function userInfo (state = defaultState.userInfo, action) {
    switch (action.type) {
        case 'SET_USER_INFO':
            return action.data
        default:
            return state
    }
}
function token (state = defaultState.token, action) {
    switch (action.type) {
        case 'SET_TOKEN':
            return action.data
        default:
            return state
    }
}


// 导出所有reducer
export default combineReducers({
    pageTitle,
    userInfo,
    menu,
    token,
    loading
})