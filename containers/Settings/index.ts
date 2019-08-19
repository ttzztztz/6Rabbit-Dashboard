import { connect } from "react-redux";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import SettingsView from "../../view/User/Settings";
import { StoreState } from "../../reducers";
import { enqueueSnackbar, changeUserCreditsAndGroup } from "../../actions";
import { userUpdateProfileStart, userUpdatePasswordStart } from "../../actions/async";
import { IUpdateProfileForm, IUpdatePasswordForm, IMyUserInfoResponse } from "../../typings";

const mapStateToProps = ({ user: { uid } }: StoreState) => ({ uid });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),
    updateProfile: (payload: IUpdateProfileForm) => dispatch(userUpdateProfileStart(payload)),
    updatePassword: (payload: IUpdatePasswordForm) => dispatch(userUpdatePasswordStart(payload)),
    changeUserCreditsAndGroup: (payload: IMyUserInfoResponse) => dispatch(changeUserCreditsAndGroup(payload)),

    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SettingsView);
