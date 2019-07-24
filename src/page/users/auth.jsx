import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import { getIdUserRole, authUserRole } from '../../api/users'
import { getRolesList } from '../../api/roles'
import { Form, Input, Button, message, Select } from 'antd';
import { validateForm, formItemLayout, tailFormItemLayout } from '../../util/util.js'
const { Option } = Select;

class Auth extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        autoCompleteResult: [],
        list: [],
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/usersManager', menuName: '用户管理', icon: 'appstore' }, { url: null, menuName: '编辑用户', icon: '' }],
            btn: { addUrl: '/usersManager', btnName: '返回', icon: 'left' }
        },
    };

    componentWillMount () {
        console.log(this.props)
        if (this.props.match.params.id) {
            this.getData(this.props.match.params.id)
        }
        this.getRolesData()
    }

    getData = async (id)=> {
        let res = await getIdUserRole(id)
        console.log(res)

        let { id: roleIds} = res.data
        this.props.form.setFieldsValue({ roleIds })
    }
    getRolesData = async () => {
        let res = await getRolesList()
        this.setState({ list: res.data })
    }

    updateData = async (data) => {
        await authUserRole(data)
        message.success('保存成功')
        this.props.form.resetFields();
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                values.adminId = this.props.match.params.id
                this.updateData(values)
            }
        });
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const {list} = this.state
        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="用户姓名">
                        {getFieldDecorator('adminId', { rules: validateForm.adminId })(
                            <Input maxLength={20} placeholder="请输入用户姓名" />)}
                    </Form.Item>

                    <Form.Item label="角色">
                        {getFieldDecorator('roleIds', { rules: validateForm.roleIds })(
                            <Select mode="multiple" placeholder="请选择角色" >
                                {
                                    list.map(item => {
                                        return (
                                            <Option value={item.id} key={item.id}>{item.name}</Option>
                                        )
                                    })
                                }
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">
                            保存
                    </Button>
                    </Form.Item>
                </Form>
            </section>
        );
    }
}
const WrappedAuthForm = Form.create()(Auth);

export default WrappedAuthForm;