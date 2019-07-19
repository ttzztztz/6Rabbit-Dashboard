import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import LoginView from "../../View/Login";
import { StoreState } from "../../Reducers";

const mapStateToProps = ({ basic: { isLogin } }: StoreState, ownProps: RouteComponentProps) => ({
    isLogin,
    ...ownProps
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginView)
);
