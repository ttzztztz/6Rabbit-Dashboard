import { OptionsObject } from "notistack";
import { ILoginResponse, IForumItem, INotificationListResponse, IGroup, IMyUserInfoResponse, IMyUserMiniInfo } from "../typings";
import { FETCH_AVATAR } from "../consts/backend";

export const USER_LOGIN_OK = "USER_LOGIN_OK";
export type USER_LOGIN_OK = typeof USER_LOGIN_OK;
export interface IUserLoginOK {
    type: USER_LOGIN_OK;
    uid: string;
}
export const userLoginOK = (uid: string): IUserLoginOK => ({
    type: USER_LOGIN_OK,
    uid
});

export const USER_LOG_OUT_OK = "USER_LOG_OUT_OK";
export type USER_LOG_OUT_OK = typeof USER_LOG_OUT_OK;
export interface IUserLogoutOK {
    type: USER_LOG_OUT_OK;
}
export const userLogoutOK = (): IUserLogoutOK => ({
    type: USER_LOG_OUT_OK
});

export const CHANGE_USER_INFO = "CHANGE_USER_INFO";
export type CHANGE_USER_INFO = typeof CHANGE_USER_INFO;
export interface IChangeUserInfo {
    type: CHANGE_USER_INFO;
    payload: ILoginResponse & { avatar: string };
}
export const changeUserInfo = (payload: ILoginResponse): IChangeUserInfo => ({
    type: CHANGE_USER_INFO,
    payload: {
        ...payload,
        avatar: FETCH_AVATAR(payload.uid)
    }
});

export const CHANGE_USER_CREDITS_AND_GROUP = "CHANGE_USER_CREDITS_AND_GROUP";
export type CHANGE_USER_CREDITS_AND_GROUP = typeof CHANGE_USER_CREDITS_AND_GROUP;
export interface IChangeUserCreditsAndGroup {
    type: CHANGE_USER_CREDITS_AND_GROUP;
    payload: IMyUserMiniInfo;
}
export const changeUserCreditsAndGroup = (payload: IMyUserInfoResponse): IChangeUserCreditsAndGroup => ({
    type: CHANGE_USER_CREDITS_AND_GROUP,
    payload: {
        usergroup: payload.usergroup,
        credits: payload.credits,
        golds: payload.golds,
        rmbs: payload.rmbs
    }
});

export const ENQUEUE_SNACKBAR = "ENQUEUE_SNACKBAR";
export type ENQUEUE_SNACKBAR = typeof ENQUEUE_SNACKBAR;
export interface IEnqueueSnackbar {
    type: ENQUEUE_SNACKBAR;
    notification: {
        key: number;
        message: string;
        options?: OptionsObject;
    };
}
export const enqueueSnackbar = (message: string, options?: OptionsObject): IEnqueueSnackbar => ({
    type: ENQUEUE_SNACKBAR,
    notification: {
        key: new Date().getTime() + Math.random(),
        message,
        options
    }
});

export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
export type REMOVE_SNACKBAR = typeof REMOVE_SNACKBAR;
export interface IRemoveSnackbar {
    type: REMOVE_SNACKBAR;
    key: number;
}
export const removeSnackbar = (key: number): IRemoveSnackbar => ({
    type: REMOVE_SNACKBAR,
    key
});

export const TOGGLE_PROGRESS = "TOGGLE_PROGRESS";
export type TOGGLE_PROGRESS = typeof TOGGLE_PROGRESS;
export interface IToggleProgress {
    type: TOGGLE_PROGRESS;
    on: boolean;
}
export const toggleProgress = (on: boolean = false): IToggleProgress => ({
    type: TOGGLE_PROGRESS,
    on
});

export const CHANGE_FORUM = "CHANGE_FORUM";
export type CHANGE_FORUM = typeof CHANGE_FORUM;
export interface IChangeForum {
    type: CHANGE_FORUM;
    payload: Array<IForumItem>;
}
export const changeForum = (newForum: Array<IForumItem>): IChangeForum => ({
    type: CHANGE_FORUM,
    payload: newForum
});

export const CHANGE_NOTIFICATION_PAGE = "CHANGE_NOTIFICATION_PAGE";
export type CHANGE_NOTIFICATION_PAGE = typeof CHANGE_NOTIFICATION_PAGE;
export interface IChangeNotificationPage {
    type: CHANGE_NOTIFICATION_PAGE;
    page: number;
}
export const changeNotificationPage = (newPage: number): IChangeNotificationPage => ({
    type: CHANGE_NOTIFICATION_PAGE,
    page: newPage
});

export const CHANGE_NOTIFICATION = "CHANGE_NOTIFICATION";
export type CHANGE_NOTIFICATION = typeof CHANGE_NOTIFICATION;
export interface IChangeNotification {
    type: CHANGE_NOTIFICATION;
    payload: INotificationListResponse;
}
export const changeNotification = (payload: INotificationListResponse): IChangeNotification => ({
    type: CHANGE_NOTIFICATION,
    payload
});

export const DELETE_ONE_NOTIFICATION = "DELETE_ONE_NOTIFICATION";
export type DELETE_ONE_NOTIFICATION = typeof DELETE_ONE_NOTIFICATION;
export interface IDeleteOneNotification {
    type: DELETE_ONE_NOTIFICATION;
    nid: string;
}
export const deleteOneNotification = (nid: string): IDeleteOneNotification => ({
    type: DELETE_ONE_NOTIFICATION,
    nid
});

export const READ_ONE_NOTIFICATION = "READ_ONE_NOTIFICATION";
export type READ_ONE_NOTIFICATION = typeof READ_ONE_NOTIFICATION;
export interface IReadOneNotification {
    type: READ_ONE_NOTIFICATION;
    nid: string;
}
export const readOneNotification = (nid: string): IReadOneNotification => ({
    type: READ_ONE_NOTIFICATION,
    nid
});

export const CHANGE_NOTIFICATION_STATICS = "CHANGE_NOTIFICATION_STATICS";
export type CHANGE_NOTIFICATION_STATICS = typeof CHANGE_NOTIFICATION_STATICS;
export interface IChangeNotificationStatics {
    type: CHANGE_NOTIFICATION_STATICS;
    total: number;
    unread: number;
}
export const changeNotificationStatics = (total: number, unread: number): IChangeNotificationStatics => ({
    type: CHANGE_NOTIFICATION_STATICS,
    total,
    unread
});

export const CLEAR_OAUTH_STORE = "CLEAR_OAUTH_STORE";
export type CLEAR_OAUTH_STORE = typeof CLEAR_OAUTH_STORE;
export interface IClearOAuthStore {
    type: CLEAR_OAUTH_STORE;
}
export const clearOAuthStore = (): IClearOAuthStore => ({
    type: CLEAR_OAUTH_STORE
});

export const SET_OAUTH_STORE = "SET_OAUTH_STORE";
export type SET_OAUTH_STORE = typeof SET_OAUTH_STORE;
export interface ISetOAuthStore {
    type: SET_OAUTH_STORE;
    platform: string;
    code: string;
}
export const setOAuthStore = (platform: string, code: string): ISetOAuthStore => ({
    type: SET_OAUTH_STORE,
    platform,
    code
});

export const SET_OAUTH_INFO = "SET_OAUTH_INFO";
export type SET_OAUTH_INFO = typeof SET_OAUTH_INFO;
export interface ISetOAuthInfo {
    type: SET_OAUTH_INFO;
    username: string;
    avatar: string;
    active: boolean;
}
export const setOAuthInfo = (username: string, avatar: string, active: boolean): ISetOAuthInfo => ({
    type: SET_OAUTH_INFO,
    username,
    avatar,
    active
});
