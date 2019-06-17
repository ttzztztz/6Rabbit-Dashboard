import { combineReducers } from "redux";
import { BasicStore, basicReducer } from "./basic";

export interface StoreState {
    basic: BasicStore;
}
export const reducer = combineReducers({
    basic: basicReducer
});
