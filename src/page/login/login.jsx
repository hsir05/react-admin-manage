import React from 'react'
import API from '../../api/api'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, message, Divider, Row,Col, } from 'antd';
import { validateForm} from '../../util/util.js'
import './login.scss'

const FormItem = Form.Item;

class WrappedLoginApp extends React.Component {
  state = {
    isAuth: true,
    form: {
        userName: '',
        password: '',
        captcha: ''
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
        let data = {userName: 'test', id: 'asdfsa234123', avatar: 'adfasdfswr234'}
        sessionStorage.setItem('user', JSON.stringify(data))
        this.props.setUserInfo(data)
        this.props.history.push('/home')  
        // this.login(values)
      }
    });
  }
    handleIsAuth () {
        this.setState({isAuth: !this.state.isAuth})
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuth } = this.state
    let formItem = null
    if (!isAuth) {
        formItem = (
            <FormItem style={{ marginBottom: '6px' }}>
                {getFieldDecorator('password', {
                    rules: validateForm.password
                })(
                    <Input.Password prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="Password" />
                )}
            </FormItem>
        ) 
    }else {
        formItem = (
            <Form.Item style={{ marginBottom: '6px' }}>
                <Row gutter={8}>
                    <Col span={15}>
                        {getFieldDecorator('captcha', {
                            rules: validateForm.captcha
                        })(<Input prefix={< Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={6} placeholder="captcha" />)}
                    </Col>
                    <Col span={6}>
                        <Button>获取验证码</Button>
                    </Col>
                </Row>
            </Form.Item>
        ) 
    }
    return (
      <section className='login'>
          <div className="login-wrap">
              <h3 className="login-title mb15">后台管理系统</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">
                    <FormItem style={{ marginBottom: '6px' }}>
                {getFieldDecorator('phone', { rules: validateForm.phone
                })(
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="Phone" />
                )}
            </FormItem>

            {formItem}

            <div style={{display:'flex', justifyContent:'space-between'}}>
                    <FormItem style={{ marginBottom: '0' }}>  <Link className="login-form-forgot" to="">忘记密码</Link></FormItem>
            </div>
                <Button type="primary" htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                登录
                </Button>
            </Form>
                <h3 className="login-auth mt15" onClick={this.handleIsAuth.bind(this)}>免密登陆</h3>
                <Divider className="mt15 mb15" />
            <h3 className="login-auth">第三方登陆</h3>
            <div className="auth-wrap mt15">
                    <span className="auth-type" style={{marginRight: '10px'}}>
                        <img src={require('../../assets/weixin.png')}width="100%" height="100%" alt="" />
                    </span>
                    <span className="auth-type" style={{ marginLeft: '10px' }}>
                        <img src={require('../../assets/qq.png')} width="100%" height="100%" alt="" />
                    </span>
            </div>
            <p className="register-wrap mt15">还没有账号? 
                <Link to='' style={{ marginTop: '10px', display: 'inline-block' }}>点我注册</Link>
             </p>
        </div>
      </section>
    )
  }
}

const Login = Form.create()(WrappedLoginApp)

export default Login;
