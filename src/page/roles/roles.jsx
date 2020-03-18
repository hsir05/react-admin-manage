import React from 'react'
import { Table, Button, Popconfirm, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import BreadCrumb from '@/components/breadCrumb/breadCrumb.jsx'
import Search from '@/components/search/search.jsx'
import { getRolesList } from '@/api/roles'
import './roles.scss'

class Roles extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                list: [{ url: '/', menuName: '首页', icon: '' }, { url: '', menuName: '权限管理', icon: '' }, { url: '', menuName: '角色管理', icon: '' }],
                btn: { addUrl: '/roleAddEdit', btnName: '添加', icon: 'plus' }
            },
            list: [],
            loading: false,
            total: 0,
            pageSize: 1,
            pageNum: 10, 
            columns: [
                { title: 'ID', dataIndex: 'id' },
                { title: '名称', dataIndex: 'name' },
                { title: '排序', dataIndex: 'sort' },
                {
                    title: '操作', dataIndex: '', create_at: 'x', render: (record) =>
                        <p>
                            <Popconfirm title="你确定要删除?" onConfirm={() => this.deleteSel(record.id)}>
                                <Button type="danger" style={{ marginRight: '5px' }}>删除</Button>
                            </Popconfirm>
                            <Button type="primary" ><Link to={`/edit/${record._id}`}>修改</Link></Button>
                        </p>
                }
            ]
        }
    }
    componentDidMount () {
        let option = {
            pageSize: this.state.pageSize,
            pageNum: this.state.pageNum,
        }
        this.getData(option)
    }
    getData = async (option) => {
        this.setState({ loading: true })
        try {
            let res = await getRolesList(option)
            this.setState({ list: res.data, total: res.data.total })
        } catch (err) {
            console.log(err)
        }
        this.setState({ loading: false })
    }
    handlePage (page) {
        let option = {
            page: page - 1,
            size: this.state.size
        }
        this.setState({ loading: true, page: page }, () => {
            this.getDate(option)
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
            <section >
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

export default Roles;
