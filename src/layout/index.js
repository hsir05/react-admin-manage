import { connect } from 'react-redux'
import Layout from './layout.jsx'

const mapStateToProps = (state) => {
    return {
        menu: state.menu
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {}
}
export default connect(mapStateToProps, mapDispatchToProps)(Layout);
