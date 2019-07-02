import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import './setting.scss'
import less from 'less';

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       data: {
         list: [{url:'/', menuName:'首页', icon:''}, {url:'', menuName:'系统设置', icon:''}],
       }
     }
  }

    changeTheme = (themeCss) => { // 改变主题样式
        less.modifyVars({
            '@primary-color': 'red'
        });
    }

  render() {
    return (
      <section >
        <BreadCrumb   {...this.state.data} />
        <div className='about'>
          234
          
        </div>
      </section>
    )
  }
}

export default About;
