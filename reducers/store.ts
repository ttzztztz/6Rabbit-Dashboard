import { createStore, applyMiddleware, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { epics } from "../epics";

import { reducer, StoreState } from "./index";

const epicMiddleware = createEpicMiddleware();

const store: Store<StoreState> = createStore(reducer, applyMiddleware(epicMiddleware));
epicMiddleware.run(epics);

export default store;
