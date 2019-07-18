import { connect } from "react-redux";
import { Dispatch } from "redux";
import { RouteComponentProps, withRouter } from "react-router";

import ThreadListItem from "../../Components/ThreadListItem";
import { StoreState } from "../../Reducers";

const mapStateToProps = (_: StoreState, ownProps: RouteComponentProps) => ({
    ...ownProps
});

const mapDispatchToProps = (_: Dispatch) => ({});

export default withRouter(
    connect(
        mapStateToProps,
        mapDispatchToProps
    )(ThreadListItem)
);
