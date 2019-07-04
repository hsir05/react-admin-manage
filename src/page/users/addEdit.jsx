import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import API from '../../api/api'
import { Form, Input, Button, message, Select, Radio, DatePicker } from 'antd';
import moment from 'moment';
import { validateForm, typeList} from '../../util/util.js'

const dateFormat = 'YYYY/MM/DD';
const { Option } = Select;

class AddEdit extends React.Component {
    state = {
        confirmDirty: false,
        loading: false,
        autoCompleteResult: [],
        unitList: [],
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '编辑单位', icon: '' }],
            btn: { addUrl: '/unitManager', btnName: '返回', icon: 'left' }
        },
    };

    componentWillMount () {
        let option = { page: 0, size: 10000}
        this.getAllUnitData(option)
    }

    getAllUnitData = async (values) => {
        this.setState({ loading: true })
        try {
            let result = await API.getUnitList(values)
            this.setState({ unitList: result.data.content, loading: false })
        } catch (err) {
            this.setState({ loading: false })
            console.warn(err)
        }
    }
    addData = async (values) => {
        this.setState({ loading: true })
        try {
            let result = await API.addUser(values)
            result.code === 200 && message.success('保存成功')
            this.setState({ loading: false, imageUrl: '' })
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
                let val = moment(values.birthday).valueOf()
                let option = {...values}
                option.birthday = val
                this.addData(option)
            }
        });
    }

    onChange = (date, dateString) =>{
        console.log( dateString);
        this.props.form.setFieldsValue({
            birthday: dateString,
        });
    }

    disabledDate = current =>{
        return current && current > moment('20021231');
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const { unitList } = this.state
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
                        {getFieldDecorator('loginAccount', { rules: validateForm.loginAccount })(<Input maxLength={20}/>)}
                    </Form.Item>
                    <Form.Item label="昵称">
                        {getFieldDecorator('nickName', { rules: validateForm.nickName })(<Input maxLength={10}/>)}
                    </Form.Item>

                    <Form.Item label="真实姓名" >
                        {getFieldDecorator('realName', {
                            rules: validateForm.realName
                        })(<Input maxLength={20}/>)}
                    </Form.Item>

                    <Form.Item label="性别">
                        {getFieldDecorator('gender', { rules: validateForm.gender })(
                            <Radio.Group>
                                <Radio value={0}>男</Radio>
                                <Radio value={1}>女</Radio>
                            </Radio.Group>)}
                    </Form.Item>

                    <Form.Item label="出生年月日">
                        {getFieldDecorator('birthday', {rules: validateForm.birthday })(
                            <DatePicker format={dateFormat} defaultPickerValue={moment('2002/12/31', dateFormat)} 
                            onChange={this.onChange} disabledDate={this.disabledDate} />)}
                    </Form.Item>

                    <Form.Item label="电话">
                        {getFieldDecorator('phone', {
                            rules: validateForm.phone
                        })(<Input maxLength={11}/>)}
                    </Form.Item>
                    
                    <Form.Item label="邮箱">
                        {getFieldDecorator('email', { rules: validateForm.email })(<Input />)}
                    </Form.Item>
                    <Form.Item label="所属单位" >
                        {getFieldDecorator('unitCode', {
                            rules: validateForm.unitCode
                        })(<Select style={{ width: 200 }} placeholder="请选择所属单位">
                            {
                                unitList.map((item, index) => {
                                    return (
                                        <Option key={index} value={item.code}> {item.name}</Option>
                                    )
                                })
                            }
                        </Select>)}
                    </Form.Item>

                    <Form.Item label="单位类型" >
                        {getFieldDecorator('unitType', {
                            rules: validateForm.unitType
                        })(<Select style={{ width: 200 }} placeholder="请选择类型">
                            {
                                typeList.map(item => {
                                    return (
                                        <Option key={item.id} value={item.type}> {item.name}</Option>
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
const WrappedRegistrationForm = Form.create({ name: '保存' })(AddEdit);

export default WrappedRegistrationForm;