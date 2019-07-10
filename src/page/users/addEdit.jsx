import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import { addUser } from '../../api/users'
import { Form, Input, Button, message, Select } from 'antd';
import moment from 'moment';
import { validateForm, formItemLayout, tailFormItemLayout} from '../../util/util.js'
const { Option } = Select;
const { TextArea } = Input;

class AddEdit extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        autoCompleteResult: [],
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '编辑单位', icon: '' }],
            btn: { addUrl: '/usersManager', btnName: '返回', icon: 'left' }
        },
    };

    componentWillMount () {}

    addData = async (values) => {
        this.setState({ loading: true })
        try {
            let res = await addUser(values)
            console.log(res)
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
                this.addData(values)
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
                        {getFieldDecorator('username', { rules: validateForm.username })(<Input maxLength={20}/>)}
                    </Form.Item>

                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName', { rules: validateForm.nickName })(<Input maxLength={10}/>)}
                    </Form.Item>

                    <Form.Item label="密码" >
                        {getFieldDecorator('password', {
                            rules: validateForm.password
                        })(<Input maxLength={20}/>)}
                    </Form.Item>

                    <Form.Item label="电话">
                        {getFieldDecorator('mobile', {
                            rules: validateForm.phone
                        })(<Input maxLength={11}/>)}
                    </Form.Item>
                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', { rules: validateForm.email })(<Input />)}
                    </Form.Item>

                    <Form.Item label="用户角色">
                        <Select defaultValue="lucy">
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                        </Select>
                    </Form.Item>

                    <Form.Item label="备注">
                        {getFieldDecorator('note', { rules: validateForm.note })(
                            <TextArea placeholder="备注"
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