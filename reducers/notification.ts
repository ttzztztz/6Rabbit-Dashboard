import * as actions from "../actions";
import { INotificationItem } from "../typings";

export interface NotificationStore {
    unread: number;
    total: number;
    page: number;
    list: Array<INotificationItem>;
}

const initState: NotificationStore = {
    unread: 0,
    total: 0,
    page: 1,
    list: []
};

type Action =
    | actions.IChangeNotification
    | actions.IChangeNotificationPage
    | actions.IDeleteOneNotification
    | actions.IReadOneNotification
    | actions.IUserLogoutOK
    | actions.IChangeNotificationStatics;

export const notificationReducer = function(state = initState, action: Action): NotificationStore {
    switch (action.type) {
        case actions.CHANGE_NOTIFICATION:
            return { ...state, ...action.payload.count, list: action.payload.list };
        case actions.CHANGE_NOTIFICATION_PAGE:
            return { ...state, page: action.page };
        case actions.DELETE_ONE_NOTIFICATION:
            return { ...state, list: state.list.filter(item => item.nid !== action.nid) };
        case actions.READ_ONE_NOTIFICATION:
            return { ...state, list: state.list.map(item => (item.nid === action.nid ? { ...item, isRead: true } : item)) };
        case actions.USER_LOG_OUT_OK:
            return { ...state, list: [], total: 0, page: 1, unread: 0 };
        case actions.CHANGE_NOTIFICATION_STATICS:
            return {
                ...state,
                total: action.total,
                unread: action.unread
            };
    }
    return state;
};
