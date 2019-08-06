import { connect } from "react-redux";
import { Dispatch } from "redux";

import UserView from "../../view/User";
import { StoreState } from "../../reducers";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserView);
