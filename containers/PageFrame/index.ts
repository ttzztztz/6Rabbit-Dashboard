import { connect } from "react-redux";
import { Dispatch } from "redux";

import PageFrame from "../../components/PageFrame";
import { StoreState } from "../../reducers";
import { initStart } from "../../actions/async";

const mapStateToProps = ({ basic: { title, loading, isLogin } }: StoreState) => ({
    title,
    loading,
    isLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    init: () => dispatch(initStart())
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageFrame);
