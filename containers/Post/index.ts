import { connect } from "react-redux";
import { Dispatch } from "redux";

import PostView from "../../view/Post";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";
import { OptionsObject } from "notistack";

const mapStateToProps = ({ basic: { forum }, user: { isAdmin } }: StoreState) => ({ forum, isAdmin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PostView);
