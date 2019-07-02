import React from 'react'
import {Link} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd'
import './slidBar.scss'

const { Sider } = Layout
const SubMenu = Menu.SubMenu;


class SlideBar extends React.Component {

  handleClick = (e) => {
    // console.log('click ', e);
  }

  render() {
    let menuList = null
    menuList = (
    /*eslint-disable*/
      this.props.menu.map(item => {
        if (item.children.length !== 0) {
          return (
            <SubMenu key={item.key} title={<span><Icon type={item.icon} /><span>{item.menu}</span></span>}>
            {
              item.children.map(val => {
               if (!val.hidden) {
                   return (
                       <Menu.Item key={val.key}><Link to={val.url}>{val.menu}</Link></Menu.Item>
                   )
               }
              })
            }
            </SubMenu>
          )
        } else if(!item.hidden){
          return (
            <Menu.Item key={item.key}><Link to={item.url}><Icon type="inbox" /><span>{item.menu}</span></Link>   </Menu.Item>
          )
        }
        
      })
    )
    return (
      <Sider style={{background:'white', borderRight:'1px solid #e5e5e5'}}>
        <div className='top-title'>后台管理 </div>
        <Menu
          onClick={this.handleClick}
          style={{ width: '100%', border: '0' }}
          defaultSelectedKeys={[this.props.keys]}
          defaultOpenKeys={['0']}
          mode="inline"
        >
          {menuList}
        </Menu>
      </Sider>
    )
  }
}

export default SlideBar;
