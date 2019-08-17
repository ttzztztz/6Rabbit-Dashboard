import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap, startWith, catchError } from "rxjs/operators";

import {
    NOTIFICATION_DELETE_ALL_START,
    NOTIFICATION_CHANGE_PAGE_START,
    NOTIFICATION_READ_ONE_START,
    INotificationReadOneStart,
    INotificationChangePageStart,
    INotificationDeleteAllStart,
    INotificationReadAllStart,
    NOTIFICATION_READ_ALL_START,
    notificationChangePageStart,
    INotificationDeleteOneStart,
    NOTIFICATION_DELETE_ONE_START,
    INotificationStaticFetchStart,
    NOTIFICATION_STATIC_FETCH_START,
    notificationStaticFetchStart
} from "../actions/async";
import FrontendRequestObservable from "../model/FrontendRequestObservable";
import { OPTIONS_NOTIFICATION_ALL, FETCH_NOTIFICATION_LIST, OPTIONS_NOTIFICATION_ITEM } from "../consts/backend";
import {
    enqueueSnackbar,
    changeNotificationPage,
    changeNotification,
    deleteOneNotification,
    readOneNotification,
    changeNotificationStatics,
    toggleProgress
} from "../actions";
import { Epic, errHandler } from "./index";

const fetchStatic: Epic<INotificationStaticFetchStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_STATIC_FETCH_START),
        mergeMap(() =>
            FrontendRequestObservable({ url: OPTIONS_NOTIFICATION_ALL, method: "GET" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        const { total, unread } = message;
                        return of(toggleProgress(), changeNotificationStatics(total, unread));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const changePage: Epic<INotificationChangePageStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_CHANGE_PAGE_START),
        mergeMap(({ page }) =>
            FrontendRequestObservable({ url: FETCH_NOTIFICATION_LIST(page), method: "GET" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(toggleProgress(), changeNotificationPage(Number.parseInt(page)), changeNotification(message));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const deleteAll: Epic<INotificationDeleteAllStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_DELETE_ALL_START),
        mergeMap(() =>
            FrontendRequestObservable({ url: OPTIONS_NOTIFICATION_ALL, method: "DELETE" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(
                            enqueueSnackbar("清空通知成功！", { variant: "success" }),
                            toggleProgress(),
                            notificationChangePageStart("1"),
                            notificationStaticFetchStart()
                        );
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const readAll: Epic<INotificationReadAllStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_READ_ALL_START),
        mergeMap(() =>
            FrontendRequestObservable({ url: OPTIONS_NOTIFICATION_ALL, method: "POST" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(
                            enqueueSnackbar("已读全部通知成功！", { variant: "success" }),
                            toggleProgress(),
                            notificationChangePageStart("1"),
                            notificationStaticFetchStart()
                        );
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const readOne: Epic<INotificationReadOneStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_READ_ONE_START),
        mergeMap(({ nid }) =>
            FrontendRequestObservable({ url: OPTIONS_NOTIFICATION_ITEM(nid), method: "POST" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(readOneNotification(nid), toggleProgress(), notificationStaticFetchStart());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const deleteOne: Epic<INotificationDeleteOneStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_DELETE_ONE_START),
        mergeMap(({ nid }) =>
            FrontendRequestObservable({ url: OPTIONS_NOTIFICATION_ITEM(nid), method: "DELETE" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(toggleProgress(), deleteOneNotification(nid), notificationStaticFetchStart());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

export default [fetchStatic, changePage, readAll, deleteAll, readOne, deleteOne];
