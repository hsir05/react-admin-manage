// state.js
import { getSessionUserInfo, getSessionToken } from '../utils/utils.js'

// 声明默认值
// 这里我们列举两个示例
// 同步数据：pageTitle
// 异步数据：spaceData（将来用异步接口获取

export default {
    pageTitle: '首页',
    loading: false,
    userInfo: getSessionUserInfo(),
    token: getSessionToken(),
    menu: [
        { key: '1', icon: 'appstore', url: '/home', menu: '首页', children: [] }, 
        { key: '2', icon: 'bank', url: '/unitAddEdit', menu: '编辑单位', hidden: true, children: [] },
        { key: '3', icon: 'user', menu: '权限管理',
            children: [
                { key: '31', url: '/usersManager', icon: 'appstore', menu: '用户管理', children: [] },
                { key: '32', url: '/userAddEdit', hidden: true, icon: 'appstore', menu: '编辑用户', children: [] },
                { key: '33', url: '/userAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑用户', children: [] },
                { key: '333', url: '/userAuth/:id', hidden: true, icon: 'appstore', menu: '用户授权', children: [] },

                { key: '34', url: '/roles', icon: 'appstore', menu: '角色管理', children: [] },
                { key: '35', url: '/roleAddEdit', hidden: true, icon: 'appstore', menu: '编辑角色', children: [] }, 
                { key: '36', url: '/roleAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑角色', children: [] }, 

                { key: '37', url: '/menusManager', icon: 'appstore', menu: '菜单管理', children: [] },
                { key: '38', url: '/menuAddEdit', hidden: true, icon: 'appstore', menu: '编辑菜单', children: [] },
                { key: '39', url: '/menuAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑菜单', children: [] },
            ]
        },
        { key: '4', icon: 'setting', menu: '系统管理',
            children: [
                { key: '41', url: '/setting', icon: 'appstore', menu: '主题设置', children: [] }
            ]
        },
        
    ]
} 