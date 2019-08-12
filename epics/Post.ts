import axios, { AxiosRequestConfig } from "axios";

import { from, of } from "rxjs";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";

import { Epic } from "./index";
import { GET_POST_INFO_START, IGetPostInfoStart, getPostInfoOK, IDeletePostStart, DELETE_POST_START } from "../actions/async";
import { FETCH_POST, OPTIONS_POST } from "../consts/backend";
import FrontendRequest from "../model/FrontendRequest";
import { enqueueSnackbar } from "../actions";

const fetchPostInfo: Epic<IGetPostInfoStart> = action$ =>
    action$.pipe(
        ofType(GET_POST_INFO_START),
        mergeMap(({ pid }) => from(axios({ url: FETCH_POST(pid) })).pipe(map(({ data: { message } }) => getPostInfoOK(message))))
    );

const deletePost: Epic<IDeletePostStart> = action$ =>
    action$.pipe(
        ofType(DELETE_POST_START),
        mergeMap(({ pid }) =>
            FrontendRequest({
                url: OPTIONS_POST(pid),
                method: "DELETE"
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("删除成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

export default [fetchPostInfo, deletePost];
