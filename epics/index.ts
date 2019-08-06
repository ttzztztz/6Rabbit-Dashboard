import {
    ActionsObservable,
    StateObservable,
    createEpicMiddleware,
    EpicMiddleware,
    combineEpics
} from "redux-observable";
import { Action, AnyAction } from "redux";
import { Observable } from "rxjs";
import { StoreState } from "../reducers";

const dependencies = {};
export type Dependencies = typeof dependencies;

export type Epic<T extends Action = Action> = (
    action$: ActionsObservable<T>,
    state$: StateObservable<StoreState>,
    dependencies: Dependencies
) => Observable<AnyAction>;

export const epicMiddleware: EpicMiddleware<Action, Action, StoreState> = createEpicMiddleware({
    dependencies
});

export const epics = combineEpics() as any;
