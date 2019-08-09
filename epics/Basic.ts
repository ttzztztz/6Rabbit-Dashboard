import { INIT_START, checkTokenStart, getForumStart } from "../actions/async";
import { Epic, ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { of } from "rxjs";

const init: Epic = action$ =>
    action$.pipe(
        ofType(INIT_START),
        mergeMap(() => of(checkTokenStart(), getForumStart()))
    );

export default [init];
