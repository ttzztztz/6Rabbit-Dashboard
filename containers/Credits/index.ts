import { connect } from "react-redux";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import CreditsView from "../../view/User/Credits";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = ({ user: { uid } }: StoreState) => ({ uid });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),

    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreditsView);
