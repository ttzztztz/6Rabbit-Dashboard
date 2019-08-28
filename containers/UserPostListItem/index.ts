import { connect } from "react-redux";
import { Dispatch } from "redux";

import UserPostListItemComponent from "../../components/UserPostListItem";
import { StoreState } from "../../reducers";

const mapStateToProps = ({ basic: { forum } }: StoreState) => ({ forum });

const mapDispatchToProps = (_: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserPostListItemComponent);
