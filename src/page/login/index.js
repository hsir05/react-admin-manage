import { connect } from 'react-redux'
import { setUserInfo, seToken } from '../../store/actions.js'
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
        },
        seToken (data) {
            dispatch(seToken(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
