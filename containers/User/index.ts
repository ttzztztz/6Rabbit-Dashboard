import { connect } from "react-redux";
import { Dispatch } from "redux";

import UserView from "../../view/User";
import { StoreState } from "../../reducers";

const mapStateToProps = ({ user: { username, avatar, uid } }: StoreState) => ({
    username,
    uid,
    avatar
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserView);
