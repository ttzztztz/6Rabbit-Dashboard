import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { GET_FORUM_LIST_START, GET_FORUM_LIST_OK, IGetForumListStart } from "../actions/async";
import { request } from "universal-rxjs-ajax";
import { FETCH_FORUM_LIST, FETCH_AVATAR } from "../consts/backend";
import { IThreadListItem } from "../typings";

const fetchForumList: Epic<IGetForumListStart> = action$ =>
    action$.pipe(
        ofType(GET_FORUM_LIST_START),
        mergeMap(action =>
            request({ url: FETCH_FORUM_LIST(action.page) }).pipe(
                map(res => {
                    const list: Array<IThreadListItem> = res.response.message.list as Array<IThreadListItem>;
                    const total = res.response.message.forum.threads;

                    return {
                        type: GET_FORUM_LIST_OK,
                        payload: {
                            list,
                            total
                        }
                    };
                })
            )
        )
    );

export default [fetchForumList];
