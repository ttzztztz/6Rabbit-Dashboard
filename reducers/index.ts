import { combineReducers } from "redux";

import { UserStore, userReducer } from "./user";
import { BasicStore, basicReducer } from "./basic";

export interface StoreState {
    basic: BasicStore;
    user: UserStore;
}
export const reducer = combineReducers({
    basic: basicReducer,
    user: userReducer
});
