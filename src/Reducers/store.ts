import { createStore, applyMiddleware, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { StoreState, reducer } from "./index";
import { epics } from "../Epics";
import { History, createBrowserHistory } from "history";

export const history: History = createBrowserHistory();
const epicMiddleware = createEpicMiddleware();

const store: Store<StoreState> = createStore(reducer(history), applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);

export default store;
