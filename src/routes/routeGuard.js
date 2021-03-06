import React from 'react'
import { withRouter, Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { menuIsRoutes } from '../utils/utils.js'

const mapStateToProps = state => (state)
const mapDispatchToProps = dispatch => ({ ...dispatch })

class RouteComp extends React.Component {
    componentWillMount () {
        let { history: { replace } } = this.props
        let currentPath = this.props.path
        
        !menuIsRoutes(currentPath, this.props.menu) && replace({ pathname: `/404` })
    }
    render () {
        return (
            <Route {...this.props} />
        )
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RouteComp))