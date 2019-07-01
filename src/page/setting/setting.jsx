import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import './setting.scss'

class About extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
       data: {
         list: [{url:'/', menuName:'首页', icon:''}, {url:'', menuName:'系统设置', icon:''}],
       }
     }
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
