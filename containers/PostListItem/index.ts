import { connect } from "react-redux";
import { Dispatch } from "redux";

import PostListItemComponent from "../../components/PostListItem";
import { StoreState } from "../../reducers";

import { deletePostStart } from "../../actions/async";

const mapStateToProps = ({
    user: {
        uid,
        usergroup: { isAdmin }
    },
    basic: { isLogin }
}: StoreState) => ({ uid, isAdmin, isLogin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deletePost: (pid: string) => dispatch(deletePostStart(pid))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostListItemComponent);
