import { connect } from "react-redux";
import { Dispatch } from "redux";

import PageFrame from "../../components/PageFrame";
import { StoreState } from "../../reducers";
import { initStart, userLogoutStart } from "../../actions/async";
import { OptionsObject } from "notistack";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = ({
    basic: { title, loading, isLogin },
    user: {
        username,
        avatar,
        uid,
        usergroup: { isAdmin }
    },
    notification: { unread }
}: StoreState) => ({
    title,
    loading,
    isLogin,
    username,
    avatar,
    uid,
    unread,
    isAdmin
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    init: () => dispatch(initStart()),
    logout: () => dispatch(userLogoutStart()),
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageFrame);
