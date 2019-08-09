import { OptionsObject } from "notistack";
import { ILoginResponse, IForumItem } from "../typings";
import { FETCH_AVATAR } from "../consts/backend";

export const LOGIN_OK = "LOGIN_OK";
export type LOGIN_OK = typeof LOGIN_OK;
export interface ILoginOK {
    type: LOGIN_OK;
    uid: string;
}
export const loginOK = (uid: string): ILoginOK => {
    return {
        type: LOGIN_OK,
        uid
    };
};

export const LOGOUT_OK = "LOGOUT_OK";
export type LOGOUT_OK = typeof LOGOUT_OK;
export interface ILogoutOK {
    type: LOGOUT_OK;
}
export const logoutOK = (): ILogoutOK => {
    return {
        type: LOGOUT_OK
    };
};

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
