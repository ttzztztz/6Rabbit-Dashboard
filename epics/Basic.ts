import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { of } from "rxjs";

import { INIT_START, checkTokenStart, getForumListStart } from "../actions/async";
import { Epic } from "./index";

const init: Epic = action$ =>
    action$.pipe(
        ofType(INIT_START),
        mergeMap(() => of(checkTokenStart(), getForumListStart()))
    );

export default [init];
