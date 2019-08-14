import { combineReducers } from "redux";

import { UserStore, userReducer } from "./user";
import { BasicStore, basicReducer } from "./basic";
import { NotificationStore, notificationReducer } from "./notification";
import { OAuthStore, oauthReducer } from "./oauth";

export interface StoreState {
    basic: BasicStore;
    user: UserStore;
    notification: NotificationStore;
    oauth: OAuthStore;
}
export const reducer = combineReducers({
    basic: basicReducer,
    user: userReducer,
    notification: notificationReducer,
    oauth: oauthReducer
});
