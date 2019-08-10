import { combineReducers } from "redux";

import { UserStore, userReducer } from "./user";
import { BasicStore, basicReducer } from "./basic";
import { NotificationStore, notificationReducer } from "./notification";

export interface StoreState {
    basic: BasicStore;
    user: UserStore;
    notification: NotificationStore;
}
export const reducer = combineReducers({
    basic: basicReducer,
    user: userReducer,
    notification: notificationReducer
});
