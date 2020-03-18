import React from 'react'
import BreadCrumb from '@/components/breadCrumb/breadCrumb.jsx'
import { addUser, getIdUserInfo, updateUser } from '@/api/users'
import { Form, Input, Button, message, Select } from 'antd';
import moment from 'moment';
import { validateForm, formItemLayout, tailFormItemLayout } from '@/utils/utils.js'
const { Option } = Select;
const { TextArea } = Input;

class AddEdit extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        autoCompleteResult: [],
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
    }

    getData = async id => {
        let res = await getIdUserInfo(id)
        let { username, nickName, password, mobile, email, status, note} = res.data
        this.props.form.setFieldsValue({ username, nickName, password, mobile, email, status, note })
    }

    updateData = async (id, data) => {
        await updateUser(id, data)
        message.success('保存成功')
        this.props.form.resetFields();
    }

    addData = async values => {
        this.setState({ loading: true })
        try {
            await addUser(values)
            message.success('保存成功')
            this.setState({ loading: false })
            this.props.form.resetFields();
        } catch (err) {
            this.setState({ loading: false })
            console.warn(err)
        }
    }

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                if (this.props.match.params.id) {
                    this.updateData(this.props.match.params.id, values)
                } else {
                    this.addData(values)
                }
                
            }
        });
    }

    disabledDate = current =>{
        return current && current > moment('20021231');
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="用户姓名">
                        {getFieldDecorator('username', { rules: validateForm.username })(
                        <Input maxLength={20} placeholder="请输入用户姓名"/>)}
                    </Form.Item>

                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName', { rules: validateForm.nickName })(
                        <Input maxLength={10} placeholder="请输入昵称"/>)}
                    </Form.Item>

                    <Form.Item label="密码" >
                        {getFieldDecorator('password', {
                            rules: validateForm.password
                        })(<Input maxLength={20} placeholder="请输入密码"/>)}
                    </Form.Item>

                    <Form.Item label="电话">
                        {getFieldDecorator('mobile', {
                            rules: validateForm.phone
                        })(<Input maxLength={11} placeholder="请输入电话号码"/>)}
                    </Form.Item>
                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', { rules: validateForm.email })(<Input placeholder="请输入邮箱账号"/>)}
                    </Form.Item>

                    <Form.Item label="状态">
                        {getFieldDecorator('status', { rules: validateForm.status })(
                            <Select placeholder="请选择状态">
                                <Option value={1}>显示</Option>
                                <Option value={0}>隐藏</Option>
                            </Select>
                        )}
                    </Form.Item>

                    <Form.Item label="备注">
                        {getFieldDecorator('note', { rules: validateForm.note })(
                            <TextArea placeholder="请输入备注"
                                autosize={{ minRows: 2, maxRows: 6 }}
                            />
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
const WrappedRegistrationForm = Form.create({ name: '保存' })(AddEdit);

export default WrappedRegistrationForm;