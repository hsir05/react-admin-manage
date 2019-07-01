import Home from '../page/home/home.jsx'
import Setting from '../page/setting/setting.jsx'
import Users from '../page/users/users.jsx'
import Unit from '../page/unit/unit.jsx'
import Auth from '../page/auth/auth.jsx'
// import UnitAddEdit from '../page/unit/addEdit.jsx'

// import Add from '../page/home/add.jsx'
// 定义路由不允许有相同的出现 如 /home/home
const routes = [
    {
        name: '首页',
        auth: true,
        icon: '',
        path: '/home',
        component: Home
    },
    {
        name: '设置',
        auth: true,
        icon: '',
        path: '/setting',
        component: Setting
    },
    {
        name: '管理员管理',
        auth: true,
        icon: '',
        path: '/usersManager',
        component: Users
    },
    {
        name: '单位管理',
        auth: true,
        icon: '',
        path: '/unitManager',
        component: Unit
    },
    // {
    //     name: '编辑单位',
    //     auth: true,
    //     icon: '',
    //     path: '/unitAddEdit',
    //     component: UnitAddEdit
    // },
    {
        name: '角色授权',
        auth: true,
        icon: '',
        path: '/auth',
        component: Auth
    },
]
export default routes