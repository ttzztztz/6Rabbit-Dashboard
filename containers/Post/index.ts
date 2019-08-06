import { connect } from "react-redux";
import { Dispatch } from "redux";

import PostView from "../../view/Post";
import { StoreState } from "../../reducers";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView);
