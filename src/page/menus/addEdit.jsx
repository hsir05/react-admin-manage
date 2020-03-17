import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import { Form, Input, Button, Select } from 'antd';
import { validateForm, formItemLayout, tailFormItemLayout, typeList } from '../../utils/utils.js'
const { TextArea } = Input;
const { Option } = Select

class AddEdit extends React.Component {
    state = {
        loading: false,
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/menusManager', menuName: '菜单管理', icon: 'appstore' }, { url: null, menuName: '编辑菜单', icon: '' }],
            btn: { addUrl: '/menusManager', btnName: '返回', icon: 'left' }
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
               console.log(values);
               
            }
        });
    };

    render () {
        const { getFieldDecorator } = this.props.form;

        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form-wrap">
                    <Form.Item label="菜单名称">
                        {getFieldDecorator('name', { rules: validateForm.name })(<Input maxLength={100}/>)}
                    </Form.Item>
                    <Form.Item label="组件code">
                        {getFieldDecorator('code', { rules: validateForm.code })(<Input maxLength={130}/>)}
                    </Form.Item>

                    <Form.Item label="图标" >
                        {getFieldDecorator('icon')(<Input maxLength={20}/>)}
                    </Form.Item>
                    <Form.Item label="跳转路径" >
                        {getFieldDecorator('uri')(<Input  />)}
                    </Form.Item>
                    <Form.Item label="父组件" >
                        {getFieldDecorator('pid', {
                            rules: validateForm.pid
                        })(<Select style={{ width: 200 }} placeholder="请选择父组件">
                            {
                                typeList.map(item => {
                                    return (
                                        <Option key={item.id} value={item.type}> {item.name}</Option>
                                    )
                                })
                            }
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="备注">
                        {getFieldDecorator('introduction')(<TextArea rows={4} maxLength={100}/>)}
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