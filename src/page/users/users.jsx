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
                            <Button type="primary" style={{ marginRight: '5px' }}><Link to={`/userAddEdit/${record.id}`}>编辑</Link></Button>
                            <Button type="primary" ><Link to={`/userAuth/${record.id}`}>授权</Link></Button>
                        </p>
                }
            ],
            data: {
                list: [{ url: '/', menuName: '首页', icon: '' }, { url: null, menuName: '权限管理', icon: '' }, { url: null, menuName: '用户管理', icon: '' }],
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
        this.props.setLoading(true)
        try {
            let res = await getUsersList(option)
            if (res.code === 200) {
                this.setState({ list: res.data.list, loading: false, total: res.data.total })
            }
        } catch (err) {
            console.log(err)
        }
        this.props.setLoading(false)
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
        this.setState({ pageSize: pageSize })
        let option = {
            pageSize: pageSize,
            pageNum: this.state.pageNum,
            name: ''
        }
        this.getData(option)
    }

    getSearch = val => {
        let option = {
            pageSize: 1,
            pageNum: this.state.pageNum,
            name: val.name
        }
        this.getData(option)
    }

    render () {

        return (
            <section className="users">
                <BreadCrumb   {...this.state.data} />
                <div style={{ background: 'white', padding: '15px', paddingTop: '0' }}>
                    <Search getSearch={this.getSearch} />
                    <div className="table-wrap">
                        <Table bordered loading={this.props.loading} pagination={false} columns={this.state.columns} rowKey={'id'} dataSource={this.state.list} />
                    </div>
                    <Pagination onChange={this.handlePage.bind(this)} total={this.state.total} itemRender={itemRender.bind(this)} />
                </div>
            </section>
        )
    }
}

export default Users;
