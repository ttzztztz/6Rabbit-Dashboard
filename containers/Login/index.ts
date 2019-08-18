import { connect } from "react-redux";
import { Dispatch } from "redux";

import LoginView from "../../view/Login";
import { StoreState } from "../../reducers";
import { loginStart } from "../../actions/async";
import { OptionsObject } from "notistack";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = ({ basic: { isLogin } }: StoreState) => ({
    isLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (username: string, password: string) => dispatch(loginStart(username, password)),
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
