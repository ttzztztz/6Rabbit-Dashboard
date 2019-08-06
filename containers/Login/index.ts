import { connect } from "react-redux";
import { Dispatch } from "redux";

import LoginView from "../../view/Login";
import { StoreState } from "../../reducers";

const mapStateToProps = ({ basic: { isLogin } }: StoreState) => ({
    isLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
