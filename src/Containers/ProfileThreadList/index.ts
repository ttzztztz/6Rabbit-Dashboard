import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import ProfileThreadListComponent from "../../Components/ProfileThreadList";
import { StoreState } from "../../Reducers";
import { changeTitle } from "../../Actions";

const mapStateToProps = (_: StoreState, ownProps: RouteComponentProps) => ({
    ...ownProps
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ProfileThreadListComponent)
);
