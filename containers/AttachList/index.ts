import { connect } from "react-redux";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import AttachListComponent from "../../components/AttachList";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = ({ user: { uid }, basic: { isLogin } }: StoreState) => ({ uid, isLogin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),

    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AttachListComponent);
