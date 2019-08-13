import { ofType } from "redux-observable";
import { of } from "rxjs";
import { mergeMap } from "rxjs/operators";

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
import FrontendRequest from "../model/FrontendRequest";
import { OPTIONS_NOTIFICATION_ALL, FETCH_NOTIFICATION_LIST, OPTIONS_NOTIFICATION_ITEM } from "../consts/backend";
import { enqueueSnackbar, changeNotificationPage, changeNotification, deleteOneNotification, readOneNotification, changeNotificationStatics } from "../actions";
import { Epic } from "./index";

const fetchStatic: Epic<INotificationStaticFetchStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_STATIC_FETCH_START),
        mergeMap(() =>
            FrontendRequest({ url: OPTIONS_NOTIFICATION_ALL, method: "GET" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        const { total, unread } = message;
                        return of(changeNotificationStatics(total, unread));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const changePage: Epic<INotificationChangePageStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_CHANGE_PAGE_START),
        mergeMap(({ page }) =>
            FrontendRequest({ url: FETCH_NOTIFICATION_LIST(page), method: "GET" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(changeNotificationPage(Number.parseInt(page)), changeNotification(message));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const deleteAll: Epic<INotificationDeleteAllStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_DELETE_ALL_START),
        mergeMap(() =>
            FrontendRequest({ url: OPTIONS_NOTIFICATION_ALL, method: "DELETE" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("清空通知成功！", { variant: "success" }), notificationChangePageStart("1"), notificationStaticFetchStart());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const readAll: Epic<INotificationReadAllStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_READ_ALL_START),
        mergeMap(() =>
            FrontendRequest({ url: OPTIONS_NOTIFICATION_ALL, method: "POST" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(
                            enqueueSnackbar("已读全部通知成功！", { variant: "success" }),
                            notificationChangePageStart("1"),
                            notificationStaticFetchStart()
                        );
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const readOne: Epic<INotificationReadOneStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_READ_ONE_START),
        mergeMap(({ nid }) =>
            FrontendRequest({ url: OPTIONS_NOTIFICATION_ITEM(nid), method: "POST" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(readOneNotification(nid), notificationStaticFetchStart());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const deleteOne: Epic<INotificationDeleteOneStart> = action$ =>
    action$.pipe(
        ofType(NOTIFICATION_DELETE_ONE_START),
        mergeMap(({ nid }) =>
            FrontendRequest({ url: OPTIONS_NOTIFICATION_ITEM(nid), method: "DELETE" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(deleteOneNotification(nid), notificationStaticFetchStart());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

export default [fetchStatic, changePage, readAll, deleteAll, readOne, deleteOne];
