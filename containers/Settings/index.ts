import { connect } from "react-redux";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import SettingsView from "../../view/User/Settings";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";
import { userUpdateProfileStart, userUpdatePasswordStart } from "../../actions/async";
import { IUpdateProfileForm, IUpdatePasswordForm } from "../../typings";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),
    updateProfile: (payload: IUpdateProfileForm) => dispatch(userUpdateProfileStart(payload)),
    updatePassword: (payload: IUpdatePasswordForm) => dispatch(userUpdatePasswordStart(payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);
