import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import ThreadView from "../../View/Thread";
import { StoreState } from "../../Reducers";
import { changeTitle } from "../../Actions";

const mapStateToProps = (_: StoreState, ownProps: RouteComponentProps) => ({
    ...ownProps
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTitle: (title: string) => dispatch(changeTitle(title))
});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ThreadView)
);