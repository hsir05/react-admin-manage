import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import API from '../../api/api'
import { Form, Input, Button, message, TreeSelect} from 'antd';
import { validateForm, formItemLayout, tailFormItemLayout} from '../../util/util.js'
const { TreeNode } = TreeSelect;
const { TextArea } = Input;

const treeData = [
    {
        title: 'Node1',
        value: '0-0',
        key: '0-0',
        children: [
            {
                title: 'Child Node1',
                value: '0-0-0',
                key: '0-0-0',
            },
        ],
    },
    {
        title: 'Node2',
        value: '0-1',
        key: '0-1',
        children: [
            {
                title: 'Child Node3',
                value: '0-1-0',
                key: '0-1-0',
            },
            {
                title: 'Child Node4',
                value: '0-1-1',
                key: '0-1-1',
            },
            {
                title: 'Child Node5',
                value: '0-1-2',
                key: '0-1-2',
            },
        ],
    },
];

class AddEdit extends React.Component {
    state = {
        loading: false,
        list: [],
        data: {
            list: [{ url: '/', menuName: '首页', icon: 'appstore' }, { url: '/unitManager', menuName: '单位管理', icon: 'appstore' }, { url: null, menuName: '添加单位', icon: '' }],
            btn: { addUrl: '/rolesManager', btnName: '返回', icon: 'left' }
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
    onChange = value => {
        console.log(value);
        this.setState({ value });
    };


    render () {
        const { getFieldDecorator } = this.props.form;
        const {list} = this.state

        return (
            <section>
                <BreadCrumb   {...this.state.data} />
                <Form {...formItemLayout} onSubmit={this.handleSubmit} className="form-wrap">
                    <Form.Item label="角色名称">
                        {getFieldDecorator('name', { rules: validateForm.name })(<Input maxLength={100}placeholder="请输入角色名称"/>)}
                    </Form.Item>
                    <Form.Item label="角色code">
                        {getFieldDecorator('adminCount', { rules: validateForm.adminCount })(<Input maxLength={130}placeholder="请输入角色code"/>)}
                    </Form.Item>

                    <Form.Item label="角色描述">
                        {getFieldDecorator('description')(<TextArea rows={4} maxLength={100} />)}
                    </Form.Item>

                    <Form.Item label="角色菜单">
                        <TreeSelect
                            showSearch
                            style={{ width: 300 }}
                            treeCheckable
                            dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                            placeholder="请选择角色所属菜单"
                            allowClear
                            treeDefaultExpandAll
                            onChange={this.onChange}
                        >
                            {
                                treeData.map(item => {
                                    if (item.children.length !== 0) {
                                        return (
                                            <TreeNode value={item.value} title={item.title} key={item.key}>
                                                {
                                                    item.children.map(val => {
                                                        return (
                                                            <TreeNode value={val.value} title={val.title} key={val.key} />
                                                        )
                                                    })
                                                }
                                            </TreeNode>
                                        )
                                    } else {
                                        return (
                                            <TreeNode value={item.value} title={item.title} key={item.key}> </TreeNode>
                                        )
                                    }
                                })
                            }
                        </TreeSelect>
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