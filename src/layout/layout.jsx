import React, { Component } from 'react'
import { Layout, Avatar, Icon } from 'antd'
import { Link, Redirect} from 'react-router-dom'
import SlideBar from './slidBar.jsx'
import { menuIsRoutes, removeSession } from '../util/util.js'
import './layout.scss'

const { Header, Content } = Layout

// 顶部导航
class HeadBar extends React.Component {
    logout () {
        removeSession()
    } 
  render () {
    return (
      <Header className='headerTop'>
        <div className="avator-wrop">
          <Avatar className='avator' icon="user" />

          <ul className="user-fun">
              <Link to='/editpwd' style={{color:'white'}}>
                <li> <Icon type="logout" /> &nbsp;修改密码 </li>
              </Link>
              <Link to='/login' style={{color:'white'}}>
                        <li onClick={this.logout.bind(this)}> <Icon type="poweroff" /> &nbsp;退出 </li>
              </Link> 
          </ul>
        </div>
      </Header>
    )
  }
}

class LayOuts extends Component {

  render() {
      let currentPath = this.props.location.pathname
      if (currentPath === '/') {
          return <Redirect to="/login" />
      }
      let { isRedirect, keys } = menuIsRoutes(currentPath, this.props.menu)
      if (!isRedirect){
          return <Redirect to="/404" />
      }
    return (
        <Layout style={{height:'100%'}}>
            <SlideBar style={{ width: '100%' }} menu={this.props.menu} keys={keys}/>
          <Layout>
            <HeadBar  />
                <Content style={{ background: '#fff', paddingLeft: '10px', paddingRight: '10px',height:'calc(100% - 100px)', overflowY: 'hidden'}}>
              {this.props.children}
              {/* <Footer style={{background:'#e9e9e9'}}>Footer</Footer> */}
            </Content>
          </Layout>
       </Layout>
    )
  }
}

export default LayOuts;
