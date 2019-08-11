import { Epic } from ".";
import { ofType } from "redux-observable";
import { mergeMap, map } from "rxjs/operators";
import { of, from } from "rxjs";

import { POST_LOGIN, POST_REGISTER, FETCH_TOKEN, FETCH_MY_INFO, PUT_UPDATE_PASSWORD, FETCH_USER_INFO_PROFILE } from "../consts/backend";
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
    getUserProfileOK
} from "../actions/async";
import { enqueueSnackbar, loginOK, changeUserInfo, changeNotificationPage } from "../actions";
import FrontendRequest from "../model/FrontendRequest";
import passwordMD5 from "../model/PasswordMD5";
import axios from "axios";

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
                    if (code === 200) {
                        localStorage.setItem("token", message.token);
                        return of(
                            enqueueSnackbar("登陆成功！", { variant: "success" }),
                            loginOK(message.uid),
                            changeUserInfo({ ...message }),
                            changeNotificationPage(1)
                        );
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
                        if (code === 200) {
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
                        if (code === 200) {
                            localStorage.setItem("token", message.token);
                            return of(
                                enqueueSnackbar("登陆成功！", { variant: "success" }),
                                loginOK(message.uid),
                                changeUserInfo({ ...message }),
                                changeNotificationPage(1)
                            );
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

const updateProfile: Epic<IUserUpdateProfileStart> = action$ =>
    action$.pipe(
        ofType(USER_UPDATE_PROFILE_START),
        mergeMap(({ payload }) =>
            FrontendRequest({ url: FETCH_MY_INFO, method: "PUT", data: payload }).pipe(
                mergeMap(({ data: { code, message } }) => {
                    if (code === 200) {
                        return of(enqueueSnackbar("修改资料成功！", { variant: "success" }));
                    } else {
                        return of(enqueueSnackbar(message, { variant: "error" }));
                    }
                })
            )
        )
    );

const updatePassword: Epic<IUserUpdatePasswordStart> = action$ =>
    action$.pipe(
        ofType(USER_UPDATE_PASSWORD_START),
        mergeMap(({ payload }) => {
            const { oldPassword, newPassword, newPasswordRepeat } = payload;
            if (newPasswordRepeat !== newPassword) {
                return of(enqueueSnackbar("两次新密码输入的不一致！", { variant: "error" }));
            } else {
                return FrontendRequest({
                    url: PUT_UPDATE_PASSWORD,
                    method: "PUT",
                    data: {
                        oldPassword: passwordMD5(oldPassword),
                        newPassword: passwordMD5(newPassword)
                    }
                }).pipe(
                    mergeMap(({ data: { code, message } }) => {
                        if (code === 200) {
                            return of(enqueueSnackbar("修改密码成功！", { variant: "success" }));
                        } else {
                            return of(enqueueSnackbar(message, { variant: "error" }));
                        }
                    })
                );
            }
        })
    );

const getUserProfile: Epic<IGetUserProfileStart> = action$ =>
    action$.pipe(
        ofType(GET_USER_PROFILE_START),
        mergeMap(({ uid }) => from(axios({ url: FETCH_USER_INFO_PROFILE(uid), method: "GET" })).pipe(map(({ data: { message } }) => getUserProfileOK(message))))
    );

export default [login, register, checkToken, updateProfile, updatePassword, getUserProfile];
