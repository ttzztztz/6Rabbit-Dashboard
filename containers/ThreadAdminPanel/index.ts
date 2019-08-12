import { connect } from "react-redux";
import { Dispatch } from "redux";

import ThreadAdminPanelComponent from "../../components/ThreadAdminPanel";
import { StoreState } from "../../reducers";
import { deleteThreadStart, setCloseThreadStart, setDiamondThreadStart, setTopThreadStart } from "../../actions/async";

const mapStateToProps = ({ user: { isAdmin } }: StoreState) => ({ isAdmin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteThreadStart: (list: Array<string>) => dispatch(deleteThreadStart(list)),
    setCloseThreadStart: (list: Array<string>, payload: number) => dispatch(setCloseThreadStart(list, payload)),
    setDiamondThreadStart: (list: Array<string>, payload: number) => dispatch(setDiamondThreadStart(list, payload)),
    setTopThreadStart: (list: Array<string>, payload: number) => dispatch(setTopThreadStart(list, payload))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadAdminPanelComponent);
