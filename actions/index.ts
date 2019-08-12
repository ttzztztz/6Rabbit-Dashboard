import { OptionsObject } from "notistack";
import { ILoginResponse, IForumItem, INotificationListResponse } from "../typings";
import { FETCH_AVATAR } from "../consts/backend";

export const USER_LOGIN_OK = "USER_LOGIN_OK";
export type USER_LOGIN_OK = typeof USER_LOGIN_OK;
export interface IUserLoginOK {
    type: USER_LOGIN_OK;
    uid: string;
}
export const userLoginOK = (uid: string): IUserLoginOK => {
    return {
        type: USER_LOGIN_OK,
        uid
    };
};

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
    username: string;
    avatar: string;
    isAdmin: boolean;
    uid: string;
}
export const changeUserInfo = ({ username, isAdmin, uid }: ILoginResponse): IChangeUserInfo => {
    return {
        type: CHANGE_USER_INFO,
        username,
        avatar: FETCH_AVATAR(uid),
        isAdmin,
        uid
    };
};

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
export function enqueueSnackbar(message: string, options?: OptionsObject): IEnqueueSnackbar {
    return {
        type: ENQUEUE_SNACKBAR,
        notification: {
            key: new Date().getTime() + Math.random(),
            message,
            options
        }
    };
}

export const REMOVE_SNACKBAR = "REMOVE_SNACKBAR";
export type REMOVE_SNACKBAR = typeof REMOVE_SNACKBAR;
export interface IRemoveSnackbar {
    type: REMOVE_SNACKBAR;
    key: number;
}
export function removeSnackbar(key: number): IRemoveSnackbar {
    return {
        type: REMOVE_SNACKBAR,
        key
    };
}

export const TOGGLE_PROGRESS = "TOGGLE_PROGRESS";
export type TOGGLE_PROGRESS = typeof TOGGLE_PROGRESS;
export interface IToggleProgress {
    type: TOGGLE_PROGRESS;
    on: boolean;
}
export function toggleProgress(on: boolean = false): IToggleProgress {
    return {
        type: TOGGLE_PROGRESS,
        on
    };
}

export const CHANGE_FORUM = "CHANGE_FORUM";
export type CHANGE_FORUM = typeof CHANGE_FORUM;
export interface IChangeForum {
    type: CHANGE_FORUM;
    payload: Array<IForumItem>;
}
export function changeForum(newForum: Array<IForumItem>): IChangeForum {
    return {
        type: CHANGE_FORUM,
        payload: newForum
    };
}

export const CHANGE_NOTIFICATION_PAGE = "CHANGE_NOTIFICATION_PAGE";
export type CHANGE_NOTIFICATION_PAGE = typeof CHANGE_NOTIFICATION_PAGE;
export interface IChangeNotificationPage {
    type: CHANGE_NOTIFICATION_PAGE;
    page: number;
}
export function changeNotificationPage(newPage: number): IChangeNotificationPage {
    return {
        type: CHANGE_NOTIFICATION_PAGE,
        page: newPage
    };
}

export const CHANGE_NOTIFICATION = "CHANGE_NOTIFICATION";
export type CHANGE_NOTIFICATION = typeof CHANGE_NOTIFICATION;
export interface IChangeNotification {
    type: CHANGE_NOTIFICATION;
    payload: INotificationListResponse;
}
export function changeNotification(payload: INotificationListResponse): IChangeNotification {
    return {
        type: CHANGE_NOTIFICATION,
        payload
    };
}

export const DELETE_ONE_NOTIFICATION = "DELETE_ONE_NOTIFICATION";
export type DELETE_ONE_NOTIFICATION = typeof DELETE_ONE_NOTIFICATION;
export interface IDeleteOneNotification {
    type: DELETE_ONE_NOTIFICATION;
    nid: string;
}
export function deleteOneNotification(nid: string): IDeleteOneNotification {
    return {
        type: DELETE_ONE_NOTIFICATION,
        nid
    };
}

export const READ_ONE_NOTIFICATION = "READ_ONE_NOTIFICATION";
export type READ_ONE_NOTIFICATION = typeof READ_ONE_NOTIFICATION;
export interface IReadOneNotification {
    type: READ_ONE_NOTIFICATION;
    nid: string;
}
export function readOneNotification(nid: string): IReadOneNotification {
    return {
        type: READ_ONE_NOTIFICATION,
        nid
    };
}
