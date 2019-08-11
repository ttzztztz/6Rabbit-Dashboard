import { connect } from "react-redux";
import { Dispatch } from "redux";

import ThreadAdminPanelComponent from "../../components/ThreadAdminPanel";
import { StoreState } from "../../reducers";
import { deleteThreadStart, setCloseThreadStart, setDiamondThreadStart, setTopThreadStart } from "../../actions/async";

const mapStateToProps = ({ user: { isAdmin } }: StoreState) => ({ isAdmin });

const mapDispatchToProps = (dispatch: Dispatch) => ({
    deleteThreadStart: (list: Array<string>) => dispatch(deleteThreadStart(list)),
    setCloseThreadStart: (list: Array<string>) => dispatch(setCloseThreadStart(list)),
    setDiamondThreadStart: (list: Array<string>) => dispatch(setDiamondThreadStart(list)),
    setTopThreadStart: (list: Array<string>) => dispatch(setTopThreadStart(list))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThreadAdminPanelComponent);
