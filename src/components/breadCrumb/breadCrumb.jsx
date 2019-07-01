import React from 'react'
import {Link} from 'react-router-dom'
import { Breadcrumb, Icon, Button } from 'antd'
import './breadCrumb.scss'

const BreadCrumb = (dat) => {
  let bread = null
    if (dat) {
    bread = (
      <Breadcrumb className='bread-item'>
        {
          dat.list.map((item, index) => {
             return (<Breadcrumb.Item href={item.url} key={index}>
             {/* <Icon type={item.icon ? item.icon:null} /> */}
             {item.menuName}
             </Breadcrumb.Item>)
          })
        }
      </Breadcrumb>
    )
  }
  return (
    <section className='bread-crumb'>
      {bread}
    {dat.btn && <Button type="primary" ><Link to={dat.btn.addUrl}><Icon type={dat.btn.icon} />{dat.btn.btnName}</Link></Button>}
    </section>
  )
}

export default BreadCrumb;
