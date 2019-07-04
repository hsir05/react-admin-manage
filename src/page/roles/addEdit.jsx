import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import API from '../../api/api'
import { Form, Input, Button, message } from 'antd';
import { validateForm} from '../../util/util.js'

class AddEdit extends React.Component {
    state = {
        loading: false,
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '添加单位', icon: '' }],
            btn: { addUrl: '/unitManager', btnName: '返回', icon: 'left' }
        }, 
    };
    componentDidMount () {
        // let option = {
        //     address: "兰州南山路",
        //     unitType: 0,
        //     code: "10018",
        //     en_name: "NorthWestMinzuUniversity",
        //     introduction: "西北民族大学（Northwest Minzu University），简称“西北民大”",
        //     logo: "https://innovation-img-1257635584.cos.ap-chengdu.myqcloud.com/1126690710142058496.png",
        //     name: "西北民族大学"
        // }
        // this.props.form.setFieldsValue(option)
        // this.setState({ imageUrl: option.logo})
    }
    handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.addData(values)
            }
        });
    };
    addData = async (values) => {
        this.setState({ loading: true })
        try {
            let result = await API.addRoles(values)
            result.code === 200 && message.success('保存成功')
            this.setState({ loading: false, imageUrl: ''})
            this.props.form.resetFields();
        } catch (err) {
            this.setState({ loading: false })
            console.warn(err)
        }
    }


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
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form-wrap">
                    <Form.Item label="角色名称">
                        {getFieldDecorator('name', { rules: validateForm.name })(<Input maxLength={100}/>)}
                    </Form.Item>
                    <Form.Item label="角色code">
                        {getFieldDecorator('code', { rules: validateForm.roleCode })(<Input maxLength={130}/>)}
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

const WrappedRegistrationForm = Form.create()(AddEdit);

export default WrappedRegistrationForm;