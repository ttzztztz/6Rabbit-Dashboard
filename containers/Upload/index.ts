import { connect } from "react-redux";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import UploadComponent from "../../components/Upload";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UploadComponent);
