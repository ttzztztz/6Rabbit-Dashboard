import { connect } from "react-redux";
import { Dispatch } from "redux";

import ForumView from "../../view/Forum";
import { StoreState } from "../../reducers";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (_dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ForumView);
