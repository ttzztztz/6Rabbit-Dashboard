import { ActionsObservable, StateObservable, createEpicMiddleware, EpicMiddleware, combineEpics } from "redux-observable";
import { Action, AnyAction } from "redux";
import { Observable, of } from "rxjs";
import { StoreState } from "../reducers";
import { VariantType } from "notistack";
import { enqueueSnackbar, toggleProgress } from "../actions";

import ForumEpics from "./Forum";
import ThreadEpics from "./Thread";
import UserEpics from "./User";
import BasicEpics from "./Basic";
import PostEpics from "./Post";
import NotificationEpics from "./Notification";

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

interface CustomError extends Error {
    message: string;
    type?: VariantType;
}

export const errHandler = ({ message, type }: CustomError, customAction?: AnyAction) =>
    customAction
        ? of(enqueueSnackbar(`ERROR: ${message}`, { variant: type || "error" }), toggleProgress(), customAction)
        : of(enqueueSnackbar(`ERROR: ${message}`, { variant: type || "error" }), toggleProgress());

export const Epics = combineEpics(...BasicEpics, ...ForumEpics, ...ThreadEpics, ...UserEpics, ...NotificationEpics, ...PostEpics);
