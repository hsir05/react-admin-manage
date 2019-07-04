import Home from '../page/home/home.jsx'
import Setting from '../page/setting/setting.jsx'
import Users from '../page/users/users.jsx'
import Units from '../page/units/units.jsx'
import Roles from '../page/roles/roles.jsx'
import UnitAddEdit from '../page/units/addEdit.jsx'
import UserAddEdit from '../page/users/addEdit.jsx'
import RoleAddEdit from '../page/roles/addEdit.jsx'

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
        name: '管理员管理',
        auth: true,
        path: '/usersManager',
        component: Users
    },
    {
        name: '编辑管理员',
        auth: true,
        path: '/userAddEdit',
        component: UserAddEdit
    },
    {
        name: '单位管理',
        auth: true,
        path: '/unitsManager',
        component: Units
    },
    {
        name: '编辑单位',
        auth: true,
        path: '/unitAddEdit',
        component: UnitAddEdit
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
]
export default routes