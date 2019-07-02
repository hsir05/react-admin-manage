import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import './setting.scss'
import { Button, message} from 'antd';
import BlockColor from '../../components/blockColor/blockColor.jsx'

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

    changeTheme = (val) => { // 改变主题样式
        less.modifyVars(
            {
                '@primary-color': val,
                '@link-color': val,
                '@btn-primary-bg': val,
            }
            )
            .then(() => { })
            .catch(error => {
                message.error(`Failed to update theme`);
            });
    }

  render() {
    return (
      <section >
        <BreadCrumb   {...this.state.data} />
            <div className='setting'>
                <Button type="primary" onClick={() => { this.changeTheme() } }>Primary</Button>
                <h3>主题设置</h3>
                <BlockColor
                    list={[
                        {
                            key: '#f5222d',
                            title: '薄暮',
                        },
                        {
                            key: '#fa541c',
                            title: '火山',
                        },
                        {
                            key: '#faad14',
                            title: '日暮',
                        },
                        {
                            key: '#13c2c2',
                            title: '明青',
                        },
                        {
                            key: '#52c412',
                            title: '极光青',
                        },
                        {
                            key: '#1890ff',
                            title: '拂晓蓝（默认）',
                        },
                        {
                            key: '#2f54eb',
                            title: '极客蓝',
                        },
                        {
                            key: '#722ed1',
                            title: '酱紫',
                        },
                    ]}
                    onChange={this.changeTheme}
                />
        </div>
      </section>
    )
  }
}

export default About;
