import React from 'react'
import { Link } from 'react-router-dom'
import { Table, Button, Popconfirm, Pagination } from 'antd'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import Search from '../../components/search/search.jsx'
import API from '../../api/api'
import './users.scss'

class Users extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: false,
            total: 0,
            page: 0,
            size: 10, 
            columns: [
                { title: '账号', dataIndex: 'loginAccount' },
                { title: '昵称', dataIndex: 'nickName' },
                { title: '真实姓名', dataIndex: 'realName' },
                { title: '电话', dataIndex: 'phone' },
                { title: '邮箱', dataIndex: 'email' },
                { title: '性别', dataIndex: 'gender', render: gender => <span>{gender === 1 ? '女' : '男'}</span>, },
                { title: '出生日期', dataIndex: 'birthday' },
                {
                    title: '操作', dataIndex: '', create_at: 'x', render: (record) =>
                        <p>
                            <Popconfirm title="你确定要删除?" onConfirm={() => this.deleteSel(record._id)}>
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
            page: this.state.page,
            size: this.state.size
        }
        this.getDate(option)
    }

    getDate = async (option) => {
        this.setState({ loading: true })
        try {
            let result = await API.getUsersList(option)
            this.setState({ list: result.data.content, loading: false, total: parseInt(result.data.totalElements, 0) })
        } catch (err) {
            console.log(err)
        }
    }

    deleteSel = async (id) => {
        try {
            let result = await API.delteArticle({ id: id })
            console.log(result);
            if (result.status === '0') {
                this.getDate()
            }
        } catch (err) {
            console.log(err)
        }
    }

    handlePage (page) {
        console.log(page)
        this.setState({ page: page }, () => {
            this.getDate()
        })
    }

    itemRender (current, type, originalElement) {
        if (type === 'prev') {
            // eslint-disable-next-line
            return <a>上一页</a>;
        } if (type === 'next') {
        // eslint-disable-next-line
            return <a>下一页</a>;
        }
        return originalElement;
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
                    <Pagination onChange={this.handlePage.bind(this)} total={this.state.total} itemRender={this.itemRender.bind(this)} />
                </div>
            </section>
        )
    }
}

export default Users;
