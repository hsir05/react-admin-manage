import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import { imgUpload} from '../../envconfig/envconfig.js'
import API from '../../api/api'
import { Form, Input, Select, Button, Upload, Icon, message } from 'antd';
import { validateForm, getSessionToken, typeList} from '../../util/util.js'
const { TextArea } = Input;
const { Option } = Select;

class AddEdit extends React.Component {
    state = {
        loading: false,
        imageUrl: '',
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '添加单位', icon: '' }],
            btn: { addUrl: '/unitManager', btnName: '返回', icon: 'left' }
        },
    };
    componentWillMount () {
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
            let result = await API.addUnit(values)
            result.code === 200 && message.success('保存成功')
            this.setState({ loading: false, imageUrl: ''})
            this.props.form.resetFields();
        } catch (err) {
            this.setState({ loading: false })
            console.warn(err)
        }
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            if (info.file.response.code >= 600) {
                message.error(info.file.response.msg)
                setTimeout(() => {
                    this.props.history.push('/login')
                }, 1500);
            } 
            let imgUrl = info.fileList[0].response.data
            this.setState({ imageUrl: imgUrl, loading: false, })
        }
    };
    beforeUpload = file =>{
        const isJPG = file.type === 'image/jpeg';
        if (!isJPG) {
            message.error('You can only upload JPG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJPG && isLt2M;
    }

    render () {
        const { getFieldDecorator } = this.props.form;
        const headers = { user_token: getSessionToken()}
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

        const uploadButton = (
            <div>
                <Icon type={this.state.loading ? 'loading' : 'plus'} />
                <div className="ant-upload-text">Upload</div>
            </div>
        );
        const { imageUrl } = this.state;

        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form-wrap">
                    <Form.Item label="单位名称">
                        {getFieldDecorator('name', { rules: validateForm.name })(<Input />)}
                    </Form.Item>
                    <Form.Item label="单位英文名称">
                        {getFieldDecorator('en_name', { rules: validateForm.en_name})(<Input />)}
                    </Form.Item>

                    <Form.Item label="单位代码" >
                        {getFieldDecorator('code', {
                            rules: validateForm.code
                        })(<Input />)}
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

                    <Form.Item label="单位地址">
                        {getFieldDecorator('address', {
                            rules: validateForm.address
                        })(<Input />)}
                    </Form.Item>

                    <Form.Item label="介绍">
                        {getFieldDecorator('introduction', {
                            rules: validateForm.introduction
                        })(<TextArea rows={4} />)}
                    </Form.Item>

                    <Form.Item label="logo">
                        {getFieldDecorator('logo', {
                            rules: validateForm.logo
                        })(<Upload
                            name="file"
                            headers={headers}
                            listType="picture-card"
                            className="avatar-uploader"
                            showUploadList={false}
                            action={imgUpload }
                            beforeUpload={this.beforeUpload}
                            onChange={this.handleChange}
                        >
                            {imageUrl ? <img src={imageUrl} alt="avatar" /> : uploadButton}
                        </Upload>)}
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