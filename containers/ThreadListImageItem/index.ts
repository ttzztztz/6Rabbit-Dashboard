import { connect } from "react-redux";
import { Dispatch } from "redux";

import ThreadListImageItemComponent from "../../components/ThreadListImageItem";
import { StoreState } from "../../reducers";

const mapStateToProps = ({
    user: {
        usergroup: { isAdmin }
    }
}: StoreState) => ({ isAdmin });

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadListImageItemComponent);
