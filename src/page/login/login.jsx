import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Icon, Input, Button, message, Divider, Row,Col, } from 'antd';
import { validateForm } from '../../utils/utils.js'
import { captcha, loginAccount, getCurrentUserInfo } from '../../api/login'
import './login.scss'

const FormItem = Form.Item;

class WrappedLoginApp extends React.Component {
  state = {
    isAuth: false,
    captcha: null,
    isSubmit: false,
    form: {
        userName: '',
        password: '',
        captcha: ''
    }
}

  componentDidMount () {
      this.getCaptcha()
  }

  getCaptcha = async() => {
      let res = await captcha()
      this.setState({ captcha: res })
  }

  login = async (values) => {
      this.setState({ isSubmit: true})
        let res = await loginAccount(values)
        // console.log(res)
      if (res.data.code === 200) {
          message.success('登陆成功')
          let token = `${res.data.data.token_type} ${res.data.data.access_token}`
          sessionStorage.setItem('token', token)
          sessionStorage.setItem('refresh_token', res.data.data.refresh_token)
   
          this.props.seToken(token)
          let user = await getCurrentUserInfo()
          console.log(user)
          this.setState({ isSubmit: false })
        sessionStorage.setItem('user', JSON.stringify(res.data))
        this.props.setUserInfo(res.data)
        this.props.history.push('/home')
      }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
          this.props.history.push('/home')

      if (!err) {
          message.success('登陆成功')
          let token = `asdfadfjsdlkfjlkasdjf312312312312312312`
          sessionStorage.setItem('token', token)
          let user = {username: 'asdfad'}  
          this.props.seToken(token)
          this.setState({ isSubmit: false })
          sessionStorage.setItem('user', JSON.stringify(user))
          this.props.setUserInfo(user)
          this.props.history.push('/home')
        // this.login(values)
      }
    });
  }
    handleIsAuth () {
        this.setState({isAuth: !this.state.isAuth})
    }

    wechatHandleClick (thirdpart) {
        // this.$store.commit('SET_AUTH_TYPE', thirdpart)
        const appid = 'wx1b4c7610fc671845'
        // eslint-disable-next-line
        const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + 'https://www.baidu.com')
        const url = 'https://open.weixin.qq.com/connect/qrconnect?appid=' + appid + '&redirect_uri=' + redirect_uri + '&response_type=code&scope=snsapi_login#wechat_redirect'
        // window.open(url, thirdpart, 540, 540)
        window.location.href =url
    }
    tencentHandleClick (thirdpart) {
        // this.$store.commit('SET_AUTH_TYPE', thirdpart)
        // const client_id = 'xxxxx'
        // const redirect_uri = encodeURIComponent('xxx/redirect?redirect=' + window.location.origin + '/auth-redirect')
        // const url = 'https://graph.qq.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirect_uri
        // openWindow(url, thirdpart, 540, 540)
    }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { isAuth } = this.state
    let formItem = null
    if (!isAuth) {
        formItem = (
            <div>
                <FormItem style={{ marginBottom: '6px' }}>
                    {getFieldDecorator('username', {
                        rules: validateForm.username
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="username" />
                    )}
                </FormItem>
                <FormItem style={{ marginBottom: '6px' }}>
                    {getFieldDecorator('password', {
                        rules: validateForm.password
                    })(
                        <Input.Password prefix={< Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="Password" />
                    )}
                </FormItem>
                <Form.Item style={{ marginBottom: '6px' }}>
                    <Row gutter={8}>
                        <Col span={14}>
                            {getFieldDecorator('imageCode', {
                                rules: validateForm.imageCode
                            })(<Input prefix={< Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={6} placeholder="imageCode" />)}
                        </Col>
                        <Col span={10}>
                            <div className="captcha-wrap" onClick={() => this.getCaptcha({ responseType: 'arraybuffer' })}><img src={this.state.captcha} width="100%" height="100%" alt="" /></div>
                        </Col>
                    </Row>
                </Form.Item>
            </div>
        ) 
    }else {
        formItem = (
            <div>
                <FormItem style={{ marginBottom: '6px' }}>
                    {getFieldDecorator('phone', {
                        rules: validateForm.phone
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={11} placeholder="Phone" />
                    )}
                </FormItem>
                <Form.Item style={{ marginBottom: '6px' }}>
                    <Row gutter={8}>
                        <Col span={14}>
                            {getFieldDecorator('captcha', {
                                rules: validateForm.captcha
                            })(<Input prefix={< Icon type="compass" style={{ color: 'rgba(0,0,0,.25)' }} />} maxLength={6} placeholder="captcha" />)}
                        </Col>
                        <Col span={6}>
                            <Button>获取验证码</Button>
                        </Col>
                    </Row>
                </Form.Item>
            </div>
        ) 
    }
    return (
      <section className='login'>
          <div className="login-wrap">
              <h3 className="login-title mb15">后台管理系统</h3>
            <Form onSubmit={this.handleSubmit} className="login-form">

            {formItem}

            <div style={{display:'flex', justifyContent:'space-between'}}>
                    <FormItem style={{ marginBottom: '0' }}>  <Link className="login-form-forgot" to="">忘记密码</Link></FormItem>
            </div>
                    <Button type="primary" loading={this.state.isSubmit} htmlType="submit" className="login-form-button" style={{width: '100%'}}>
                    登录
                </Button>
            </Form>
            <h3 className="login-auth mt15" onClick={this.handleIsAuth.bind(this)}>免密登陆</h3>
            <Divider className="mt15 mb15" />
            <h3 className="login-auth">第三方登陆</h3>
            <div className="auth-wrap mt15">
                    <span className="auth-type" style={{ marginRight: '10px' }} onClick={() => { this.wechatHandleClick('wechat')}}>
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
