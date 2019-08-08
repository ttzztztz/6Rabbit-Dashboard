import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { GET_THREAD_INFO_START, GET_THREAD_INFO_OK, IGetThreadInfoStart } from "../actions/async";
import { request } from "universal-rxjs-ajax";
import { FETCH_THREAD } from "../consts/backend";

const fetchThreadInfo: Epic<IGetThreadInfoStart> = action$ =>
    action$.pipe(
        ofType(GET_THREAD_INFO_START),
        mergeMap(({ tid, page }) =>
            request({ url: FETCH_THREAD(tid, page) }).pipe(
                map(res => {
                    return {
                        type: GET_THREAD_INFO_OK,
                        payload: res.response
                    };
                })
            )
        )
    );

export default [fetchThreadInfo];
