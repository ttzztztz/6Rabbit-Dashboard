import { Epic, errHandler } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map, startWith, catchError } from "rxjs/operators";
import { of, from } from "rxjs";
import axios from "axios";

import {
    POST_LOGIN,
    POST_REGISTER,
    FETCH_TOKEN,
    FETCH_MY_INFO,
    PUT_UPDATE_PASSWORD,
    FETCH_USER_INFO_PROFILE,
    FETCH_OAUTH_INFO,
    FETCH_OAUTH_BIND,
    DELETE_OAUTH_TOKEN,
    FETCH_OAUTH_LOGIN
} from "../consts/backend";
import {
    ILoginStart,
    LOGIN_START,
    IRegisterStart,
    REGISTER_START,
    ICheckTokenStart,
    CHECK_TOKEN_START,
    checkTokenOK,
    IUserUpdateProfileStart,
    USER_UPDATE_PROFILE_START,
    IUserUpdatePasswordStart,
    USER_UPDATE_PASSWORD_START,
    IGetUserProfileStart,
    GET_USER_PROFILE_START,
    getUserProfileOK,
    IUserLogoutStart,
    USER_LOG_OUT_START,
    notificationStaticFetchStart,
    IOAuthFetchInfoStart,
    OAUTH_FETCH_INFO_START,
    ILoginResponseProcessStart,
    LOGIN_RESPONSE_PROCESS_START,
    loginResponseProcessStart,
    IOAuthLoginStart,
    OAUTH_LOGIN_START,
    IOAuthBindUserStart,
    OAUTH_BIND_USER_START,
    OAUTH_CLEAR_TOKEN_START,
    IOAuthClearTokenStart
} from "../actions/async";
import { enqueueSnackbar, userLoginOK, changeUserInfo, userLogoutOK, setOAuthInfo, clearOAuthStore, toggleProgress } from "../actions";
import FrontendRequestObservable from "../model/FrontendRequestObservable";
import passwordMD5 from "../model/PasswordMD5";
import { USER_CENTER } from "../consts/routers";
import { IOAuthInfoResponse } from "../typings";

const login: Epic<ILoginStart> = action$ =>
    action$.pipe(
        ofType(LOGIN_START),
        mergeMap(({ username, password }) =>
            FrontendRequestObservable({
                url: POST_LOGIN,
                method: "POST",
                data: {
                    username,
                    password: passwordMD5(password)
                }
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(loginResponseProcessStart(message));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const loginResponseProcess: Epic<ILoginResponseProcessStart> = action$ =>
    action$.pipe(
        ofType(LOGIN_RESPONSE_PROCESS_START),
        mergeMap(({ payload: message }) => {
            localStorage.setItem("token", message.token);
            return of(
                enqueueSnackbar("登陆成功！", { variant: "success" }),
                userLoginOK(message.uid),
                changeUserInfo({ ...message }),
                notificationStaticFetchStart(),
                toggleProgress()
            );
        })
    );

const logout: Epic<IUserLogoutStart> = action$ =>
    action$.pipe(
        ofType(USER_LOG_OUT_START),
        mergeMap(() => {
            localStorage.removeItem("token");
            return of(userLogoutOK());
        })
    );

const register: Epic<IRegisterStart> = action$ =>
    action$.pipe(
        ofType(REGISTER_START),
        mergeMap(({ payload, payload: { password, password_repeat } }) => {
            if (password !== password_repeat) {
                return of(enqueueSnackbar("两次密码不一致！", { variant: "error" }));
            } else {
                return FrontendRequestObservable({
                    url: POST_REGISTER,
                    method: "POST",
                    data: { ...payload, password: passwordMD5(password), password_repeat: passwordMD5(password_repeat) }
                }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code === 200) {
                            return of(enqueueSnackbar("注册成功！", { variant: "success" }), toggleProgress());
                        } else {
                            return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                        }
                    }),
                    startWith(toggleProgress(true)),
                    catchError(err => errHandler(err))
                );
            }
        }),
        catchError(err => errHandler(err))
    );

const checkToken: Epic<ICheckTokenStart> = action$ =>
    action$.pipe(
        ofType(CHECK_TOKEN_START),
        mergeMap(() => {
            const token = localStorage.getItem("token") || "";
            if (token) {
                return FrontendRequestObservable({ url: FETCH_TOKEN, method: "GET" }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code === 200) {
                            return of(loginResponseProcessStart(message), toggleProgress());
                        } else {
                            localStorage.removeItem("token");
                            return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                        }
                    }),
                    startWith(toggleProgress(true)),
                    catchError(err => errHandler(err))
                );
            } else {
                localStorage.removeItem("token");
                return of(checkTokenOK());
            }
        }),
        catchError(err => errHandler(err))
    );

const updateProfile: Epic<IUserUpdateProfileStart> = action$ =>
    action$.pipe(
        ofType(USER_UPDATE_PROFILE_START),
        mergeMap(({ payload }) =>
            FrontendRequestObservable({ url: FETCH_MY_INFO, method: "PUT", data: payload }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("修改资料成功！", { variant: "success" }), toggleProgress());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const updatePassword: Epic<IUserUpdatePasswordStart> = action$ =>
    action$.pipe(
        ofType(USER_UPDATE_PASSWORD_START),
        mergeMap(({ payload: { oldPassword, newPassword, newPasswordRepeat } }) => {
            if (newPasswordRepeat !== newPassword) {
                return of(enqueueSnackbar("两次新密码输入的不一致！", { variant: "error" }), toggleProgress());
            } else {
                return FrontendRequestObservable({
                    url: PUT_UPDATE_PASSWORD,
                    method: "PUT",
                    data: {
                        oldPassword: passwordMD5(oldPassword),
                        newPassword: passwordMD5(newPassword)
                    }
                }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code === 200) {
                            return of(enqueueSnackbar("修改密码成功！", { variant: "success" }), toggleProgress());
                        } else {
                            return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                        }
                    }),
                    startWith(toggleProgress(true)),
                    catchError(err => errHandler(err))
                );
            }
        }),
        catchError(err => errHandler(err))
    );

const getUserProfile: Epic<IGetUserProfileStart> = action$ =>
    action$.pipe(
        ofType(GET_USER_PROFILE_START),
        mergeMap(({ uid }) => from(axios({ url: FETCH_USER_INFO_PROFILE(uid), method: "GET" })).pipe(map(({ data: { message } }) => getUserProfileOK(message))))
    );

const oauthFetchInfo: Epic<IOAuthFetchInfoStart> = action$ =>
    action$.pipe(
        ofType(OAUTH_FETCH_INFO_START),
        mergeMap(({ platform, code }) =>
            FrontendRequestObservable({
                url: FETCH_OAUTH_INFO(platform, code),
                method: "GET"
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        const {
                            userInfo: { username, avatarURL },
                            active
                        } = message as IOAuthInfoResponse;
                        return of(setOAuthInfo(username, avatarURL, active), toggleProgress());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const oauthLogin: Epic<IOAuthLoginStart> = action$ =>
    action$.pipe(
        ofType(OAUTH_LOGIN_START),
        mergeMap(({ payload: { platform, code }, router }) =>
            FrontendRequestObservable({
                url: FETCH_OAUTH_LOGIN(platform, code),
                method: "GET"
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        router.push(USER_CENTER, USER_CENTER);
                        return of(clearOAuthStore(), loginResponseProcessStart(message), toggleProgress());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const oauthBindUser: Epic<IOAuthBindUserStart> = action$ =>
    action$.pipe(
        ofType(OAUTH_BIND_USER_START),
        mergeMap(({ payload: { platform, code }, router }) =>
            FrontendRequestObservable({
                url: FETCH_OAUTH_BIND(platform, code),
                method: "GET"
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        router.push(USER_CENTER, USER_CENTER);
                        return of(clearOAuthStore(), enqueueSnackbar("绑定成功！", { variant: "success" }), toggleProgress());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

const oauthClearToken: Epic<IOAuthClearTokenStart> = action$ =>
    action$.pipe(
        ofType(OAUTH_CLEAR_TOKEN_START),
        mergeMap(({ platform, code }) =>
            FrontendRequestObservable({
                url: DELETE_OAUTH_TOKEN(platform, code),
                method: "DELETE"
            }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(clearOAuthStore(), toggleProgress());
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }), toggleProgress());
                    }
                }),
                startWith(toggleProgress(true)),
                catchError(err => errHandler(err))
            )
        ),
        catchError(err => errHandler(err))
    );

export default [
    login,
    loginResponseProcess,
    oauthLogin,
    oauthBindUser,
    oauthFetchInfo,
    oauthClearToken,
    checkToken,
    logout,
    register,
    updateProfile,
    updatePassword,
    getUserProfile
];
