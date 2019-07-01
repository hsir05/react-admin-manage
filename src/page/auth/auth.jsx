import React from 'react'
import BreadCrumb from '../../components/breadCrumb/breadCrumb.jsx'
import './auth.scss'

class Auth extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {
                list: [{ url: '/', menuName: '首页', icon: '' }, { url: '', menuName: '角色管理', icon: '' },  { url: '', menuName: '角色授权', icon: '' }],
                btn: { addUrl: '/', btnName: '返回', icon: 'left' }
            }
        }
    }

    render () {
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

export default Auth;
