import { Epic } from "./index";

import { ofType } from "redux-observable";
import { from, of } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import axios from "axios";

import {
    GET_THREAD_LIST_START,
    IGetThreadListStart,
    GET_FORUM_LIST_START,
    IGetForumListStart,
    getThreadListOK,
    IGetForumInfoStart,
    GET_FORUM_INFO_START,
    getForumOK
} from "../actions/async";
import { FETCH_THREAD_LIST, FETCH_FORUM_LIST, FETCH_FORUM_INFO } from "../consts/backend";
import { IThreadListItem, IForumItem } from "../typings";
import FrontendRequest from "../model/FrontendRequest";
import { enqueueSnackbar, changeForum } from "../actions";

const fetchThreadList: Epic<IGetThreadListStart> = action$ =>
    action$.pipe(
        ofType(GET_THREAD_LIST_START),
        mergeMap(({ fid, page }) =>
            from(axios({ url: FETCH_THREAD_LIST(fid, page), method: "GET" })).pipe(
                map(({ data: { message } }) => {
                    const list: Array<IThreadListItem> = message.list as Array<IThreadListItem>;
                    const forum: IForumItem = message.forum;

                    return getThreadListOK(list, forum);
                })
            )
        )
    );

const fetchForumInfo: Epic<IGetForumInfoStart> = action$ =>
    action$.pipe(
        ofType(GET_FORUM_INFO_START),
        mergeMap(({ fid }) =>
            from(axios({ url: FETCH_FORUM_INFO(fid), method: "GET" })).pipe(
                map(({ data: { message } }) => {
                    return getForumOK(message);
                })
            )
        )
    );

const fetchForumList: Epic<IGetForumListStart> = action$ =>
    action$.pipe(
        ofType(GET_FORUM_LIST_START),
        mergeMap(() =>
            FrontendRequest({ url: FETCH_FORUM_LIST, method: "GET" }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(changeForum(message));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

export default [fetchThreadList, fetchForumList, fetchForumInfo];
