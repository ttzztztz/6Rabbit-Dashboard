import { createStore, applyMiddleware, Store } from "redux";
import { createEpicMiddleware } from "redux-observable";
import { Epics } from "../epics";

import { reducer, StoreState } from "./index";

const initStore = () => {
    const epicMiddleware = createEpicMiddleware();
    const reduxMiddleware = applyMiddleware(epicMiddleware);

    const store: Store<StoreState> = createStore(reducer, reduxMiddleware);
    epicMiddleware.run(Epics);

    return store;
};

export default initStore;
