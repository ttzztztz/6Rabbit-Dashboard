import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { GET_FORUM_LIST_START, GET_FORUM_LIST_OK, IGetForumListStart } from "../actions/async";
import { FETCH_FORUM_LIST } from "../consts/backend";
import { IThreadListItem } from "../typings";
import axios from "axios";
import { from } from "rxjs";

const fetchForumList: Epic<IGetForumListStart> = action$ =>
    action$.pipe(
        ofType(GET_FORUM_LIST_START),
        mergeMap(action =>
            from(axios({ url: FETCH_FORUM_LIST(action.page), method: "GET" })).pipe(
                map(({ data: { message } }) => {
                    const list: Array<IThreadListItem> = message.list as Array<IThreadListItem>;
                    const total = message.forum.threads;

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
