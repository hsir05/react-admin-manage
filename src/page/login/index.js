import { connect } from 'react-redux'
import { setUserInfo } from '../../store/actions.js'
import Login from './login.jsx'

const mapStateToProps = (state) => {
    return {
        userInfo: state.userInfo
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setUserInfo (data) {
            dispatch(setUserInfo(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
