import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { ILoginStart, LOGIN_START } from "../actions/async";
import { FETCH_LOGIN } from "../consts/backend";
import { of } from "rxjs";
import { enqueueSnackbar, loginOK } from "../actions";
import FrontendRequest from "../model/FrontendRequest";
import passwordMD5 from "../model/PasswordMD5";

const login: Epic<ILoginStart> = action$ =>
    action$.pipe(
        ofType(LOGIN_START),
        mergeMap(({ username, password }) =>
            FrontendRequest({
                url: FETCH_LOGIN,
                method: "POST",
                data: {
                    username,
                    password: passwordMD5(password)
                }
            }).pipe(
                mergeMap(res => {
                    const {
                        data: { code, message }
                    } = res;
                    if (code == 200) {
                        return of(loginOK(message), enqueueSnackbar("登陆成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

export default [login];
