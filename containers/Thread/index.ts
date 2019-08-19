import { connect } from "react-redux";
import { Dispatch } from "redux";

import ThreadView from "../../view/Thread";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";
import { OptionsObject } from "notistack";

const mapStateToProps = ({
    user: {
        usergroup: { isAdmin },
        uid
    },
    basic: { isLogin }
}: StoreState) => ({ isAdmin, uid, isLogin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadView);
