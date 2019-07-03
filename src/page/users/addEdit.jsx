import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
// import API from '../../api/api'
import { Form, Input, Button, message, DatePicker } from 'antd';
import moment from 'moment';
import { validateForm} from '../../util/util.js'

const dateFormat = 'YYYY/MM/DD';

class AddEdit extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        autoCompleteResult: [],
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '编辑单位', icon: '' }],
            btn: { addUrl: '/unitManager', btnName: '返回', icon: 'left' }
        },
    };

    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
            }
        });
    }; residences

    handleConfirmBlur = e => {
        const { value } = e.target;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    };

    compareToFirstPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!');
        } else {
            callback();
        }
    };

    validateToNextPassword = (rule, value, callback) => {
        const { form } = this.props;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    };

    handleWebsiteChange = value => {
        let autoCompleteResult;
        if (!value) {
            autoCompleteResult = [];
        } else {
            autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
        }
        this.setState({ autoCompleteResult });
    };

    render () {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 14 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 14 },
                sm: { span: 8 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };

        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                    <Form.Item label="账号">
                        {getFieldDecorator('loginAccount', { rules: validateForm.loginAccount })(<Input />)}
                    </Form.Item>
                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName', { rules: validateForm.nickName})(<Input />)}
                    </Form.Item>

                    <Form.Item label="真实姓名" >
                        {getFieldDecorator('realName', {
                            rules: validateForm.realName
                        })(<Input onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>

                    <Form.Item label="出生年月日">
                        {getFieldDecorator('birthday', { rules: validateForm.birthday })(
                            <DatePicker format={dateFormat} />)}
                    </Form.Item>

                    <Form.Item label="电话">
                        {getFieldDecorator('phone', {
                            rules: validateForm.phone
                        })(<Input onBlur={this.handleConfirmBlur} />)}
                    </Form.Item>
                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', { rules: validateForm.email })(<Input />)}
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