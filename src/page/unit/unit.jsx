import React from 'react'
import { Table, Button, Popconfirm, Pagination } from 'antd'
import { Link } from 'react-router-dom'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import API from '../../api/api'
import Search from '../../components/search/search.jsx'
import { getUnitType } from '../../util/util.js'

import './unit.scss'

class Unit extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            list: [],
            loading: false,
            total: 0,
            page: 0,
            size: 10,
            columns: [
                { title: 'logo', dataIndex: 'logo', render: logo => <img src={logo} width="25" height="25" alt="logo"/>, },
                { title: '单位名称', dataIndex: 'name' },
                // { title: '单位英文名', dataIndex: 'en_name' },
                { title: '类型', dataIndex: 'type', render: type => <span> {getUnitType(type)}</span>},
                { title: '单位代码', dataIndex: 'code' },
                { title: '单位地址', dataIndex: 'address' },
                // { title: '介绍', dataIndex: 'introduction' },
                // { title: '状态', dataIndex: 'status' },
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
                list: [{ url: '/', menuName: '首页', icon: '' }, { url: null, menuName: '单位管理', icon: '' }],
                btn: { addUrl: '/unitAddEdit', btnName: '添加', icon: 'plus' }
            },
            rowSelection: {
                onChange: (selectedRowKeys, selectedRows) => {
                    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                },
                getCheckboxProps: record => ({
                    disabled: record.name === 'Disabled User',
                    name: record.name,
                }),
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

    getDate = async (values) => {
        this.setState({ loading: true })
        try {
            let result = await API.getUnitList(values)
            this.setState({ list: result.data.content, loading: false, total: parseInt(result.data.totalElements, 0)})
        } catch (err) {
            this.setState({ loading: false })
            console.warn(err)
        }
    }

    // deleteSel = async (id) => {
    //     try {
    //         let result = await API.delteArticle({ id: id })
    //         if (result.status === '0') {
    //             this.getDate()
    //         }
    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    handlePage (page) {
        console.log(page)
        let option = {
            page: page - 1,
            size: this.state.size
        }
        this.setState({ page: page }, () => {
            this.getDate(option)
        })
    }

    itemRender (current, type, originalElement) {
        if (type === 'prev') {
            // eslint-disable-next-line
            return <a> 上一页</a>;
        } if (type === 'next') {
            // eslint-disable-next-line
            return <a >下一页</a>;
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
                        <Table rowSelection={this.state.rowSelection} bordered loading={this.state.loading} pagination={false} columns={this.state.columns} rowKey={'id'} dataSource={this.state.list} />
                    </div>
                    <Pagination onChange={this.handlePage.bind(this)} total={this.state.total} itemRender={this.itemRender.bind(this)} />
                </div>
            </section>
        )
    }
}

export default Unit;
