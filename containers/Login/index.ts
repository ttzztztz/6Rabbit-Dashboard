import { connect } from "react-redux";
import { Dispatch } from "redux";

import LoginView from "../../view/Login";
import { StoreState } from "../../reducers";
import { loginStart, IRegisterStartPayload, registerStart } from "../../actions/async";

const mapStateToProps = ({ basic: { isLogin } }: StoreState) => ({
    isLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    login: (username: string, password: string) => dispatch(loginStart(username, password)),
    register: (payload: IRegisterStartPayload) => dispatch(registerStart(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
