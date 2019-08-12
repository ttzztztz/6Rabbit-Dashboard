import { connect } from "react-redux";
import { Dispatch } from "redux";

import ThreadListComponent from "../../components/ThreadList";
import { StoreState } from "../../reducers";

const mapStateToProps = ({ user: { isAdmin } }: StoreState) => ({ isAdmin });

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadListComponent);
