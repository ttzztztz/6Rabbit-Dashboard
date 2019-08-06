import { connect } from "react-redux";
import { Dispatch } from "redux";

import LoginView from "../../View/Login";
import { StoreState } from "../../reducers";
import { changeTitle } from "../../actions";

const mapStateToProps = ({ basic: { isLogin } }: StoreState) => ({
    isLogin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTitle: (title: string) => dispatch(changeTitle(title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginView);
