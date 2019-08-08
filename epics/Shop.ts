import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { GET_SHOP_LIST_START, GET_SHOP_LIST_OK, IGetShopListStart } from "../actions/async";
import { request } from "universal-rxjs-ajax";

const fetchShopList: Epic<IGetShopListStart> = action$ =>
    action$.pipe(
        ofType(GET_SHOP_LIST_START),
        mergeMap(() =>
            request({ url: "xxx" }).pipe(
                map(response => {
                    return {
                        type: GET_SHOP_LIST_OK,
                        payload: []
                    };
                })
            )
        )
    );

export default [fetchShopList];
