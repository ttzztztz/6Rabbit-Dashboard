import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap } from "rxjs/operators";
import { ILoginStart, LOGIN_START, IRegisterStart, REGISTER_START, ICheckTokenStart, CHECK_TOKEN_START, checkTokenOK } from "../actions/async";
import { POST_LOGIN, POST_REGISTER, FETCH_TOKEN } from "../consts/backend";
import { of } from "rxjs";
import { enqueueSnackbar, loginOK, changeUserInfo } from "../actions";
import FrontendRequest from "../model/FrontendRequest";
import passwordMD5 from "../model/PasswordMD5";

const login: Epic<ILoginStart> = action$ =>
    action$.pipe(
        ofType(LOGIN_START),
        mergeMap(({ username, password }) =>
            FrontendRequest({
                url: POST_LOGIN,
                method: "POST",
                data: {
                    username,
                    password: passwordMD5(password)
                }
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code == 200) {
                        localStorage.setItem("token", message.token);
                        return of(enqueueSnackbar("登陆成功！", { variant: "success" }), loginOK(message.uid), changeUserInfo({ ...message }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const register: Epic<IRegisterStart> = action$ =>
    action$.pipe(
        ofType(REGISTER_START),
        mergeMap(({ payload, payload: { password, password_repeat } }) => {
            if (password !== password_repeat) {
                return of(enqueueSnackbar("两次密码不一致！", { variant: "error" }));
            } else {
                return FrontendRequest({
                    url: POST_REGISTER,
                    method: "POST",
                    data: { ...payload, password: passwordMD5(password), password_repeat: passwordMD5(password_repeat) }
                }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code == 200) {
                            return of(enqueueSnackbar("注册成功！", { variant: "success" }));
                        } else {
                            return of(enqueueSnackbar(message, { variant: "error" }));
                        }
                    })
                );
            }
        })
    );

const checkToken: Epic<ICheckTokenStart> = action$ =>
    action$.pipe(
        ofType(CHECK_TOKEN_START),
        mergeMap(() => {
            const token = localStorage.getItem("token") || "";
            if (token) {
                return FrontendRequest({ url: FETCH_TOKEN, method: "GET" }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code == 200) {
                            localStorage.setItem("token", message.token);
                            return of(enqueueSnackbar("登陆成功！", { variant: "success" }), loginOK(message.uid), changeUserInfo({ ...message }));
                        } else {
                            localStorage.removeItem("token");
                            return of(enqueueSnackbar(message, { variant: "error" }));
                        }
                    })
                );
            } else {
                localStorage.removeItem("token");
                return of(checkTokenOK());
            }
        })
    );

export default [login, register, checkToken];
