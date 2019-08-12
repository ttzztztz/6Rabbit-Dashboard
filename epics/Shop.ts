import { Epic } from "./index";
import { ofType } from "redux-observable";
import { from } from "rxjs";
import { mergeMap, map } from "rxjs/operators";
import axios from "axios";

import { GET_SHOP_LIST_START, IGetShopListStart, getShopListOK } from "../actions/async";
import { IThreadListItem } from "../typings";
import { FETCH_SHOP_LIST } from "../consts/backend";

const fetchShopList: Epic<IGetShopListStart> = action$ =>
    action$.pipe(
        ofType(GET_SHOP_LIST_START),
        mergeMap(action =>
            from(axios({ url: FETCH_SHOP_LIST(action.page), method: "GET" })).pipe(
                map(({ data: { message } }) => {
                    const list: Array<IThreadListItem> = message.list as Array<IThreadListItem>;
                    const total = message.forum.threads;

                    return getShopListOK(list, total);
                })
            )
        )
    );

export default [fetchShopList];