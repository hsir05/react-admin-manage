import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Popconfirm, Pagination, message } from 'antd'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import Search from '../../components/search/search.jsx'
import { getUsersList, delUser} from '../../api/users'
import { itemRender } from '../../util/util.js'
import './users.scss'

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: false,
            total: 0,
            pageSize: 1,
            pageNum: 10, 
            columns: [
                { title: 'ID', dataIndex: 'id' },
                { title: '手机号码', dataIndex: 'mobile' },
                { title: '用户名', dataIndex: 'username' },
                { title: '状态', dataIndex: 'status' },
                {
                    title: '操作', dataIndex: '', create_at: 'x', render: (record) =>
                        <p>
                            <Popconfirm title="你确定要删除?" onConfirm={() => this.deleteSel(record.id)}>
                                <Button type="danger" style={{ marginRight: '5px' }}>删除</Button>
                            </Popconfirm>
                            <Button type="primary" ><Link to={`/edit/${record._id}`}>修改</Link></Button>
                        </p>
                }
            ],
            data: {
                list: [{ url: '/', menuName: '首页', icon: '' }, { url: null, menuName: '角色管理', icon: '' }, { url: null, menuName: '管理员管理', icon: '' }],
                btn: { addUrl: '/userAddEdit', btnName: '添加', icon: 'plus' }
            }
        }
    }

    componentDidMount () {
        let option = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
            name: ''
        }
        this.getData(option)
    }

    getData = async (option) => {
        let res = await getUsersList(option)
        this.setState({ list: res.data.list, loading: false, total: res.data.total })
    }

    deleteSel = async (id) => {
        let res = await delUser(id)
        if (res.code === 200) {
            let list = [...this.state.list]
            let index = list.findIndex(item => item.id === id)
            list.splice(index, 1)
            this.setState({list: list})
            message.success(res.message)
        }
    }

    handlePage (pageSize) {
        this.setState({ pageSize: pageSize }, () => {
            this.getDate()
        })
    }

    render () {

        return (
            <section className="users">
                <BreadCrumb   {...this.state.data} />
                <div style={{ background: 'white', padding: '15px', paddingTop: '0' }}>
                    <Search getDate={this.getDate} />
                    <div className="table-wrap">
                        <Table bordered loading={this.state.loading} pagination={false} columns={this.state.columns} rowKey={'id'} dataSource={this.state.list} />
                    </div>
                    <Pagination onChange={this.handlePage.bind(this)} total={this.state.total} itemRender={itemRender.bind(this)} />
                </div>
            </section>
        )
    }
}

export default Users;
