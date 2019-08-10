import { connect } from "react-redux";
import { Dispatch } from "redux";

import NotificationsView from "../../view/User/Notifications";
import { StoreState } from "../../reducers";
import {
    notificationReadAllStart,
    notificationDeleteAllStart,
    notificationDeleteOneStart,
    notificationReadOneStart,
    notificationChangePageStart
} from "../../actions/async";

const mapStateToProps = ({ notification }: StoreState) => ({
    ...notification
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    notificationReadAllStart: () => dispatch(notificationReadAllStart()),
    notificationDeleteAllStart: () => dispatch(notificationDeleteAllStart()),
    notificationDeleteOneStart: (nid: string) => dispatch(notificationDeleteOneStart(nid)),
    notificationReadOneStart: (nid: string) => dispatch(notificationReadOneStart(nid)),
    notificationChangePageStart: (page: string) => dispatch(notificationChangePageStart(page))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(NotificationsView);
