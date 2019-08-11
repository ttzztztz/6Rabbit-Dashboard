import { connect } from "react-redux";
import { Dispatch } from "redux";

import ProfileThreadListView from "../../components/ProfileThreadList";
import { StoreState } from "../../reducers";
import { enqueueSnackbar } from "../../actions";
import { OptionsObject } from "notistack";

const mapStateToProps = ({ basic: { forum } }: StoreState) => ({ forum });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileThreadListView);
