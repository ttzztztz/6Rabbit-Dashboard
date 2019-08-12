import axios, { AxiosRequestConfig } from "axios";

import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";

import { Epic } from "./index";
import {
    GET_THREAD_INFO_START,
    IGetThreadInfoStart,
    getThreadInfoOK,
    IDeleteThreadStart,
    DELETE_THREAD_START,
    ISetCloseThreadStart,
    SET_CLOSE_THREAD_START,
    ISetTopThreadStart,
    SET_TOP_THREAD_START,
    ISetDiamondThreadStart,
    SET_DIAMOND_THREAD_START
} from "../actions/async";
import { FETCH_THREAD, DELETE_MANY_THREADS, OPTIONS_THREAD, POST_THREAD_CLOSE, POST_THREAD_TOP, POST_THREAD_DIAMOND } from "../consts/backend";
import FrontendRequest from "../model/FrontendRequest";
import { enqueueSnackbar } from "../actions";

const fetchThreadInfo: Epic<IGetThreadInfoStart> = action$ =>
    action$.pipe(
        ofType(GET_THREAD_INFO_START),
        mergeMap(({ tid, page }) => from(axios({ url: FETCH_THREAD(tid, page) })).pipe(map(({ data }) => getThreadInfoOK(data))))
    );

const deleteThread: Epic<IDeleteThreadStart> = action$ =>
    action$.pipe(
        ofType(DELETE_THREAD_START),
        mergeMap(({ payload }) => {
            const requestOptions: AxiosRequestConfig = {
                url: payload.length >= 2 ? DELETE_MANY_THREADS : OPTIONS_THREAD(payload[0]),
                method: "DELETE",
                data: payload
            };
            return FrontendRequest(requestOptions).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("删除成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            );
        })
    );

const setCloseThread: Epic<ISetCloseThreadStart> = action$ =>
    action$.pipe(
        ofType(SET_CLOSE_THREAD_START),
        mergeMap(({ payload }) =>
            FrontendRequest({
                url: POST_THREAD_CLOSE,
                method: "POST",
                data: payload
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("设置成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const setTopThread: Epic<ISetTopThreadStart> = action$ =>
    action$.pipe(
        ofType(SET_TOP_THREAD_START),
        mergeMap(({ payload }) =>
            FrontendRequest({
                url: POST_THREAD_TOP,
                method: "POST",
                data: payload
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("设置成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const setDiamondThread: Epic<ISetDiamondThreadStart> = action$ =>
    action$.pipe(
        ofType(SET_DIAMOND_THREAD_START),
        mergeMap(({ payload }) =>
            FrontendRequest({
                url: POST_THREAD_DIAMOND,
                method: "POST",
                data: payload
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("设置成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

export default [fetchThreadInfo, deleteThread, setCloseThread, setTopThread, setDiamondThread];
