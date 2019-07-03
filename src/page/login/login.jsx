import React from 'react'
import API from '../../api/api'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, message } from 'antd';
import './login.scss'

const FormItem = Form.Item;

class WrappedLoginApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      form: {
        userName: '',
        password: ''
      }
    }
  }

  componentDidMount () {}

  login = async (values) => {
    try {
      let result = await API.login(values)
      if (result.code === 200) {
          message.success('登陆成功')
          let token = result.attr.user_token
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('user', JSON.stringify(result.data))
          this.props.setUserInfo(result.data)
          this.props.seToken(token)
          this.props.history.push('/home')
      }
    } catch (err) {
      console.warn(err)
        message.error('登陆失败，请稍后重试!')
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        // let data = {userName: 'test', id: 'asdfsa234123', avatar: 'adfasdfswr234'}
        // sessionStorage.setItem('user', JSON.stringify(data))
        // this.props.setUserInfo(data)
        // this.props.history.push('/home')  
        this.login(values)
      }
    });
  }

  render() {

    const { getFieldDecorator } = this.props.form;

    return (
      <section className='login'>
        <Form onSubmit={this.handleSubmit} className="login-form">
          <FormItem>
                {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入你的帐号' }],
            })(
              <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
            )}
          </FormItem>
          <FormItem style={{marginBottom:'6px'}}>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入你的密码' }],
            })(
              <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
            )}
          </FormItem>

          <div style={{display:'flex', justifyContent:'space-between'}}>
            {/* <FormItem style={{marginBottom:'0'}}>
              {getFieldDecorator('remember', {
                valuePropName: 'checked',
                initialValue: true,
              })(
                <Checkbox>记住密码</Checkbox>
              )}
            </FormItem> */}
                    <FormItem style={{ marginBottom: '0' }}>  <Link className="login-form-forgot" to="">忘记密码</Link></FormItem>
          </div>

            <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
              登录
            </Button>
            <Link to='' style={{ marginTop: '10px', display: 'inline-block' }}>注册</Link>
        </Form>
      </section>
    )
  }
}

const Login = Form.create()(WrappedLoginApp)

export default Login;
