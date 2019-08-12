import { Epic } from "./index";

import { ofType } from "redux-observable";
import { from } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import axios from "axios";

import { GET_BLOG_LIST_START, getBlogListOK, IGetBlogListStart } from "../actions/async";
import { FETCH_BLOG_LIST } from "../consts/backend";
import { IThreadListItem } from "../typings";

const fetchBlogList: Epic<IGetBlogListStart> = action$ =>
    action$.pipe(
        ofType(GET_BLOG_LIST_START),
        mergeMap(action =>
            from(axios({ url: FETCH_BLOG_LIST(action.page), method: "GET" })).pipe(
                map(({ data: { message } }) => {
                    const list: Array<IThreadListItem> = message.list as Array<IThreadListItem>;
                    const total = message.forum.threads;

                    return getBlogListOK(list, total);
                })
            )
        )
    );

export default [fetchBlogList];
