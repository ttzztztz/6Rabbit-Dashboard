import {
    IThreadListItem,
    ILoginResponse,
    IRegisterForm,
    IUpdatePasswordForm,
    IUpdateProfileForm,
    IOtherUser,
    IPostListItem,
    IThreadItemResponse,
    IOAuthActionPayload,
    IForumItem
} from "../typings";
import { NextRouter } from "next/dist/client/router";

export const GET_THREAD_LIST_START = "GET_THREAD_LIST_START";
export type GET_THREAD_LIST_START = typeof GET_THREAD_LIST_START;
export interface IGetThreadListStart {
    type: GET_THREAD_LIST_START;
    fid: string;
    page: string;
}
export const getThreadListStart = (fid: string, page: string): IGetThreadListStart => ({
    type: GET_THREAD_LIST_START,
    fid,
    page
});

export const GET_THREAD_LIST_OK = "GET_THREAD_LIST_OK";
export type GET_THREAD_LIST_OK = typeof GET_THREAD_LIST_OK;
export interface IGetThreadListOK {
    type: GET_THREAD_LIST_OK;
    payload: { list: Array<IThreadListItem>; total: number };
}
export const getThreadListOK = (list: Array<IThreadListItem>, total: number): IGetThreadListOK => ({
    type: GET_THREAD_LIST_OK,
    payload: { list, total }
});

export const GET_POST_INFO_START = "GET_POST_INFO_START";
export type GET_POST_INFO_START = typeof GET_POST_INFO_START;
export interface IGetPostInfoStart {
    type: GET_POST_INFO_START;
    pid: string;
}
export const getPostInfoStart = (pid: string): IGetPostInfoStart => ({
    type: GET_POST_INFO_START,
    pid
});

export const GET_POST_INFO_OK = "GET_POST_INFO_OK";
export type GET_POST_INFO_OK = typeof GET_POST_INFO_OK;
export interface IGetPostInfoOK {
    type: GET_POST_INFO_OK;
    payload: IPostListItem;
}
export const getPostInfoOK = (payload: IPostListItem): IGetPostInfoOK => ({
    type: GET_POST_INFO_OK,
    payload
});

export const GET_THREAD_INFO_START = "GET_THREAD_INFO_START";
export type GET_THREAD_INFO_START = typeof GET_THREAD_INFO_START;
export interface IGetThreadInfoStart {
    type: GET_THREAD_INFO_START;
    tid: string;
    page: string;
}
export const getThreadInfoStart = (tid: string, page: string): IGetThreadInfoStart => ({
    type: GET_THREAD_INFO_START,
    tid,
    page
});

export const GET_THREAD_INFO_OK = "GET_THREAD_INFO_OK";
export type GET_THREAD_INFO_OK = typeof GET_THREAD_INFO_OK;
export interface IGetThreadInfoOK {
    type: GET_THREAD_INFO_OK;
    payload: IThreadItemResponse;
}
export const getThreadInfoOK = (payload: IThreadItemResponse): IGetThreadInfoOK => ({
    type: GET_THREAD_INFO_OK,
    payload
});

export const LOGIN_START = "LOGIN_START";
export type LOGIN_START = typeof LOGIN_START;
export interface ILoginStart {
    type: LOGIN_START;
    username: string;
    password: string;
}
export const loginStart = (username: string, password: string): ILoginStart => ({
    type: LOGIN_START,
    username,
    password
});

export const LOGIN_OK = "LOGIN_OK";
export type LOGIN_OK = typeof LOGIN_OK;
export interface ILoginOK {
    type: LOGIN_OK;
    payload: ILoginResponse;
}
export const loginOK = (payload: ILoginResponse): ILoginOK => ({
    type: LOGIN_OK,
    payload
});

export type IRegisterStartPayload = IRegisterForm & { password_repeat: string };
export const REGISTER_START = "REGISTER_START";
export type REGISTER_START = typeof REGISTER_START;
export interface IRegisterStart {
    type: REGISTER_START;
    payload: IRegisterStartPayload;
}
export const registerStart = (payload: IRegisterStartPayload): IRegisterStart => ({
    type: REGISTER_START,
    payload
});

export const REGISTER_OK = "REGISTER_OK";
export type REGISTER_OK = typeof REGISTER_OK;
export interface IRegisterOK {
    type: REGISTER_OK;
    uid: string;
}
export const registerOK = (uid: string): IRegisterOK => ({
    type: REGISTER_OK,
    uid
});

export const CHECK_TOKEN_START = "CHECK_TOKEN_START";
export type CHECK_TOKEN_START = typeof CHECK_TOKEN_START;
export interface ICheckTokenStart {
    type: CHECK_TOKEN_START;
}
export const checkTokenStart = (): ICheckTokenStart => ({
    type: CHECK_TOKEN_START
});

export const CHECK_TOKEN_OK = "CHECK_TOKEN_OK";
export type CHECK_TOKEN_OK = typeof CHECK_TOKEN_OK;
export interface ICheckTokenOK {
    type: CHECK_TOKEN_OK;
}
export const checkTokenOK = (): ICheckTokenOK => ({
    type: CHECK_TOKEN_OK
});

export const GET_FORUM_LIST_START = "GET_FORUM_LIST_START";
export type GET_FORUM_LIST_START = typeof GET_FORUM_LIST_START;
export interface IGetForumListStart {
    type: GET_FORUM_LIST_START;
}
export const getForumListStart = (): IGetForumListStart => ({
    type: GET_FORUM_LIST_START
});

export const GET_FORUM_INFO_START = "GET_FORUM_INFO_START";
export type GET_FORUM_INFO_START = typeof GET_FORUM_INFO_START;
export interface IGetForumInfoStart {
    type: GET_FORUM_INFO_START;
    fid: string;
}
export const getForumInfoStart = (fid: string): IGetForumInfoStart => ({
    type: GET_FORUM_INFO_START,
    fid
});

export const GET_FORUM_OK = "GET_FORUM_OK";
export type GET_FORUM_OK = typeof GET_FORUM_OK;
export interface IGetForumOK {
    type: GET_FORUM_OK;
    payload: IForumItem;
}
export const getForumOK = (payload: IForumItem): IGetForumOK => ({
    type: GET_FORUM_OK,
    payload
});

export const INIT_START = "INIT_START";
export type INIT_START = typeof INIT_START;
export interface IInitStart {
    type: INIT_START;
}
export const initStart = (): IInitStart => ({
    type: INIT_START
});

export const USER_UPDATE_PROFILE_START = "USER_UPDATE_PROFILE_START";
export type USER_UPDATE_PROFILE_START = typeof USER_UPDATE_PROFILE_START;
export interface IUserUpdateProfileStart {
    type: USER_UPDATE_PROFILE_START;
    payload: IUpdateProfileForm;
}
export const userUpdateProfileStart = (payload: IUpdateProfileForm): IUserUpdateProfileStart => ({
    type: USER_UPDATE_PROFILE_START,
    payload
});

export const USER_UPDATE_PASSWORD_START = "USER_UPDATE_PASSWORD_START";
export type USER_UPDATE_PASSWORD_START = typeof USER_UPDATE_PASSWORD_START;
export interface IUserUpdatePasswordStart {
    type: USER_UPDATE_PASSWORD_START;
    payload: IUpdatePasswordForm;
}
export const userUpdatePasswordStart = (payload: IUpdatePasswordForm): IUserUpdatePasswordStart => ({
    type: USER_UPDATE_PASSWORD_START,
    payload
});

export const NOTIFICATION_READ_ALL_START = "NOTIFICATION_READ_ALL_START";
export type NOTIFICATION_READ_ALL_START = typeof NOTIFICATION_READ_ALL_START;
export interface INotificationReadAllStart {
    type: NOTIFICATION_READ_ALL_START;
}
export const notificationReadAllStart = (): INotificationReadAllStart => ({
    type: NOTIFICATION_READ_ALL_START
});

export const NOTIFICATION_DELETE_ALL_START = "NOTIFICATION_DELETE_ALL_START";
export type NOTIFICATION_DELETE_ALL_START = typeof NOTIFICATION_DELETE_ALL_START;
export interface INotificationDeleteAllStart {
    type: NOTIFICATION_DELETE_ALL_START;
}
export const notificationDeleteAllStart = (): INotificationDeleteAllStart => ({
    type: NOTIFICATION_DELETE_ALL_START
});

export const NOTIFICATION_DELETE_ONE_START = "NOTIFICATION_DELETE_ONE_START";
export type NOTIFICATION_DELETE_ONE_START = typeof NOTIFICATION_DELETE_ONE_START;
export interface INotificationDeleteOneStart {
    type: NOTIFICATION_DELETE_ONE_START;
    nid: string;
}
export const notificationDeleteOneStart = (nid: string): INotificationDeleteOneStart => ({
    type: NOTIFICATION_DELETE_ONE_START,
    nid
});

export const NOTIFICATION_READ_ONE_START = "NOTIFICATION_READ_ONE_START";
export type NOTIFICATION_READ_ONE_START = typeof NOTIFICATION_READ_ONE_START;
export interface INotificationReadOneStart {
    type: NOTIFICATION_READ_ONE_START;
    nid: string;
}
export const notificationReadOneStart = (nid: string): INotificationReadOneStart => ({
    type: NOTIFICATION_READ_ONE_START,
    nid
});

export const NOTIFICATION_CHANGE_PAGE_START = "NOTIFICATION_CHANGE_PAGE_START";
export type NOTIFICATION_CHANGE_PAGE_START = typeof NOTIFICATION_CHANGE_PAGE_START;
export interface INotificationChangePageStart {
    type: NOTIFICATION_CHANGE_PAGE_START;
    page: string;
}
export const notificationChangePageStart = (page: string): INotificationChangePageStart => ({
    type: NOTIFICATION_CHANGE_PAGE_START,
    page
});

export const GET_USER_PROFILE_START = "GET_USER_PROFILE_START";
export type GET_USER_PROFILE_START = typeof GET_USER_PROFILE_START;
export interface IGetUserProfileStart {
    type: GET_USER_PROFILE_START;
    uid: string;
}
export const getUserProfileStart = (uid: string): IGetUserProfileStart => ({
    type: GET_USER_PROFILE_START,
    uid
});

export const GET_USER_PROFILE_OK = "GET_USER_PROFILE_OK";
export type GET_USER_PROFILE_OK = typeof GET_USER_PROFILE_OK;
export interface IGetUserProfileOK {
    type: GET_USER_PROFILE_OK;
    payload: IOtherUser;
}
export const getUserProfileOK = (payload: IOtherUser): IGetUserProfileOK => ({
    type: GET_USER_PROFILE_OK,
    payload
});

export const DELETE_THREAD_START = "DELETE_THREAD_START";
export type DELETE_THREAD_START = typeof DELETE_THREAD_START;
export interface IDeleteThreadStart {
    type: DELETE_THREAD_START;
    payload: Array<string>;
}
export const deleteThreadStart = (payload: Array<string>): IDeleteThreadStart => ({
    type: DELETE_THREAD_START,
    payload
});

export const SET_CLOSE_THREAD_START = "SET_CLOSE_THREAD_START";
export type SET_CLOSE_THREAD_START = typeof SET_CLOSE_THREAD_START;
export interface ISetCloseThreadStart {
    type: SET_CLOSE_THREAD_START;
    payload: { tid: Array<string>; close: number };
}
export const setCloseThreadStart = (tid: Array<string>, close: number): ISetCloseThreadStart => ({
    type: SET_CLOSE_THREAD_START,
    payload: { tid, close }
});

export const SET_DIAMOND_THREAD_START = "SET_DIAMOND_THREAD_START";
export type SET_DIAMOND_THREAD_START = typeof SET_DIAMOND_THREAD_START;
export interface ISetDiamondThreadStart {
    type: SET_DIAMOND_THREAD_START;
    payload: { tid: Array<string>; diamond: number };
}
export const setDiamondThreadStart = (tid: Array<string>, diamond: number): ISetDiamondThreadStart => ({
    type: SET_DIAMOND_THREAD_START,
    payload: { tid, diamond }
});

export const SET_TOP_THREAD_START = "SET_TOP_THREAD_START";
export type SET_TOP_THREAD_START = typeof SET_TOP_THREAD_START;
export interface ISetTopThreadStart {
    type: SET_TOP_THREAD_START;
    payload: { tid: Array<string>; top: number };
}
export const setTopThreadStart = (tid: Array<string>, top: number): ISetTopThreadStart => ({
    type: SET_TOP_THREAD_START,
    payload: { tid, top }
});

export const DELETE_POST_START = "DELETE_POST_START";
export type DELETE_POST_START = typeof DELETE_POST_START;
export interface IDeletePostStart {
    type: DELETE_POST_START;
    pid: string;
}
export const deletePostStart = (pid: string): IDeletePostStart => ({
    type: DELETE_POST_START,
    pid
});

export const USER_LOG_OUT_START = "USER_LOG_OUT_START";
export type USER_LOG_OUT_START = typeof USER_LOG_OUT_START;
export interface IUserLogoutStart {
    type: USER_LOG_OUT_START;
}
export const userLogoutStart = (): IUserLogoutStart => ({
    type: USER_LOG_OUT_START
});

export const NOTIFICATION_STATIC_FETCH_START = "NOTIFICATION_STATIC_FETCH_START";
export type NOTIFICATION_STATIC_FETCH_START = typeof NOTIFICATION_STATIC_FETCH_START;
export interface INotificationStaticFetchStart {
    type: NOTIFICATION_STATIC_FETCH_START;
}
export const notificationStaticFetchStart = (): INotificationStaticFetchStart => ({
    type: NOTIFICATION_STATIC_FETCH_START
});

export const OAUTH_FETCH_INFO_START = "OAUTH_FETCH_INFO_START";
export type OAUTH_FETCH_INFO_START = typeof OAUTH_FETCH_INFO_START;
export interface IOAuthFetchInfoStart {
    type: OAUTH_FETCH_INFO_START;
    platform: string;
    code: string;
}
export const oauthFetchInfoStart = (platform: string, code: string): IOAuthFetchInfoStart => ({
    type: OAUTH_FETCH_INFO_START,
    platform,
    code
});

export const LOGIN_RESPONSE_PROCESS_START = "LOGIN_RESPONSE_PROCESS_START";
export type LOGIN_RESPONSE_PROCESS_START = typeof LOGIN_RESPONSE_PROCESS_START;
export interface ILoginResponseProcessStart {
    type: LOGIN_RESPONSE_PROCESS_START;
    payload: ILoginResponse;
}
export const loginResponseProcessStart = (payload: ILoginResponse): ILoginResponseProcessStart => ({
    type: LOGIN_RESPONSE_PROCESS_START,
    payload
});

export const OAUTH_LOGIN_START = "OAUTH_LOGIN_START";
export type OAUTH_LOGIN_START = typeof OAUTH_LOGIN_START;
export interface IOAuthLoginStart {
    type: OAUTH_LOGIN_START;
    router: NextRouter;
    payload: IOAuthActionPayload;
}
export const oauthLoginStart = (router: NextRouter, payload: IOAuthActionPayload): IOAuthLoginStart => ({
    type: OAUTH_LOGIN_START,
    payload,
    router
});

export const OAUTH_BIND_USER_START = "OAUTH_BIND_USER_START";
export type OAUTH_BIND_USER_START = typeof OAUTH_BIND_USER_START;
export interface IOAuthBindUserStart {
    type: OAUTH_BIND_USER_START;
    router: NextRouter;
    payload: IOAuthActionPayload;
}
export const oauthBindUserStart = (router: NextRouter, payload: IOAuthActionPayload): IOAuthBindUserStart => ({
    type: OAUTH_BIND_USER_START,
    payload,
    router
});

export const OAUTH_CLEAR_TOKEN_START = "OAUTH_CLEAR_TOKEN_START";
export type OAUTH_CLEAR_TOKEN_START = typeof OAUTH_CLEAR_TOKEN_START;
export interface IOAuthClearTokenStart {
    type: OAUTH_CLEAR_TOKEN_START;
    platform: string;
    code: string;
}
export const oauthClearTokenStart = (platform: string, code: string): IOAuthClearTokenStart => ({
    type: OAUTH_CLEAR_TOKEN_START,
    platform,
    code
});
