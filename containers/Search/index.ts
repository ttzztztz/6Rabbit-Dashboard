import { connect } from "react-redux";
import { Dispatch } from "redux";

import SearchView from "../../view/Search";
import { StoreState } from "../../reducers";
import { OptionsObject } from "notistack";
import { enqueueSnackbar } from "../../actions";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchView);
