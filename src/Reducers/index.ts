import { combineReducers } from "redux";
import { BasicStore, basicReducer } from "./basic";
import { connectRouter, RouterState } from "connected-react-router";
import { History } from "history";

export interface StoreState {
    router: RouterState;
    basic: BasicStore;
}
export const reducer = (history: History) =>
    combineReducers({
        basic: basicReducer,
        router: connectRouter(history)
    });
