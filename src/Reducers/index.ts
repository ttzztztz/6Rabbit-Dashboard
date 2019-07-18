import { combineReducers } from "redux";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

import { UserStore, userReducer } from "./user";
import { BasicStore, basicReducer } from "./basic";

export interface StoreState {
    router: RouterState;
    basic: BasicStore;
    user: UserStore;
}
export const reducer = (history: History) =>
    combineReducers({
        basic: basicReducer,
        router: connectRouter(history),
        user: userReducer
    });
