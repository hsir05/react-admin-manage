import Home from '../page/home/home.jsx'
import Setting from '../page/setting/setting.jsx'
import Users from '../page/users/users.jsx'
import Roles from '../page/roles/roles.jsx'
import Menus from '../page/menus/menus.jsx'

import UserAddEdit from '../page/users/addEdit.jsx'
import RoleAddEdit from '../page/roles/addEdit.jsx'
import MenuAddEdit from '../page/menus/addEdit.jsx'

// 定义路由不允许有相同的出现 如 /home/home
const routes = [
    {
        name: '首页',
        auth: true,
        path: '/home',
        component: Home
    },
    {
        name: '设置',
        auth: true,
        path: '/setting',
        component: Setting
    },
    {
        name: '用户管理',
        auth: true,
        path: '/usersManager',
        component: Users
    },
    {
        name: '编辑用户',
        auth: true,
        path: '/userAddEdit',
        component: UserAddEdit
    },
    {
        name: '编辑用户',
        auth: true,
        path: '/userAddEdit/:id',
        component: UserAddEdit
    },
    {
        name: '角色管理',
        auth: true,
        path: '/roles',
        component: Roles
    },
    {
        name: '编辑角色',
        auth: true,
        path: '/roleAddEdit',
        component: RoleAddEdit
    },
    {
        name: '编辑角色',
        auth: true,
        path: '/roleAddEdit/:id',
        component: RoleAddEdit
    },
    {
        name: '菜单管理',
        auth: true,
        path: '/menusManager',
        component: Menus
    },
    {
        name: '编辑菜单',
        auth: true,
        path: '/menuAddEdit',
        component: MenuAddEdit
    },
    {
        name: '编辑菜单',
        auth: true,
        path: '/menuAddEdit/:id',
        component: MenuAddEdit
    },
]
export default routes