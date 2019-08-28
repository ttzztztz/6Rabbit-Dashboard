import { connect } from "react-redux";
import { Dispatch } from "redux";

import DepositView from "../../../view/Admin/Deposit";
import { StoreState } from "../../../reducers";
import { OptionsObject } from "notistack";
import { enqueueSnackbar } from "../../../actions";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),

    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(DepositView);
