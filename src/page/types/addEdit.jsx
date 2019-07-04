import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import API from '../../api/api'
import { Form, Input, Select, Button, message } from 'antd';
import { validateForm, category, formItemLayout, tailFormItemLayout} from '../../util/util.js'
const { Option } = Select;

class AddEdit extends React.Component {
    state = {
        loading: false,
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/typesManager', menuName: '菜单管理', icon: 'appstore' }, { url: null, menuName: '编辑菜单', icon: '' }],
            btn: { addUrl: '/typesManager', btnName: '返回', icon: 'left' }
        }, 
    };
    componentDidMount () {
    }
    handleSubmit = e => {
        e.preventDefault();
        if (this.state.imageUrl) {
            this.props.form.setFieldsValue({
                logo: this.state.imageUrl,
            });
        }
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                this.addData(values)
            }
        });
    };
    addData = async (values) => {
        this.setState({ loading: true })
        try {
            let result = await API.addType(values)
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

        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form-wrap">
                    <Form.Item label="名称">
                        {getFieldDecorator('name', { rules: validateForm.name })(<Input maxLength={100}/>)}
                    </Form.Item>
   
                    <Form.Item label="所属类型" >
                        {getFieldDecorator('category', {
                            rules: validateForm.category
                        })(<Select style={{ width: 200 }} placeholder="请选择类型">
                            {
                                category.map(item => {
                                    return (
                                        <Option key={item.id} value={item.id}> {item.name}</Option>
                                    )
                                })
                            }
                        </Select>)}
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