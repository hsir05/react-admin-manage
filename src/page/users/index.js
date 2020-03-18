import { connect } from 'react-redux'
import { setLoading } from '@/store/actions.js'
import Users from './users.jsx'

const mapStateToProps = (state) => {
    return {
        loading: state.loading
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        setLoading (data) {
            dispatch(setLoading(data))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Users);
