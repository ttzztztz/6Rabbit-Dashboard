import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import LoginView from "../../View/Login";
import { StoreState } from "../../Reducers";
import { changeTitle } from "../../Actions";

const mapStateToProps = ({ basic: { isLogin } }: StoreState, ownProps: RouteComponentProps) => ({
    isLogin,
    ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTitle: (title: string) => dispatch(changeTitle(title))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(LoginView)
);
