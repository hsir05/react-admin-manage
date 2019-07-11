// state.js
import { getSessionUserInfo, getSessionToken} from '../util/util.js'

// 声明默认值
// 这里我们列举两个示例
// 同步数据：pageTitle
// 异步数据：spaceData（将来用异步接口获取

export default {
    pageTitle: '首页',
    userInfo: getSessionUserInfo(),
    token: getSessionToken(),
    menu: [
        { key: '1', icon: 'appstore', url: '/home', menu: '首页', children: [] }, 
        { key: '2', icon: 'bank', url: '/unitAddEdit', menu: '编辑单位', hidden: true, children: [] },
        { key: '3', icon: 'user', menu: '权限管理',
            children: [
                { key: '4', url: '/usersManager', icon: 'appstore', menu: '用户管理', children: [] },
                { key: '441', url: '/userAddEdit', hidden: true, icon: 'appstore', menu: '编辑用户', children: [] },
                { key: '442', url: '/userAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑用户', children: [] },

                { key: '5', url: '/roles', icon: 'appstore', menu: '角色管理', children: [] },
                { key: '51', url: '/roleAddEdit', hidden: true, icon: 'appstore', menu: '编辑角色', children: [] }, 
                { key: '52', url: '/roleAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑角色', children: [] }, 

                { key: '6', url: '/menusManager', icon: 'appstore', menu: '菜单管理', children: [] },
                { key: '61', url: '/menuAddEdit', hidden: true, icon: 'appstore', menu: '编辑菜单', children: [] },
                { key: '62', url: '/menuAddEdit/:id', hidden: true, icon: 'appstore', menu: '编辑菜单', children: [] },
            ]
        },
        { key: '7', icon: 'setting', menu: '系统管理',
            children: [
                { key: '71', url: '/setting', icon: 'appstore', menu: '主题设置', children: [] }
            ]
        },
        
    ]
} 