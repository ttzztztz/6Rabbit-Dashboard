import { OptionsObject } from "notistack";

export const CHANGE_TITLE = "CHANGE_TITLE";
export type CHANGE_TITLE = typeof CHANGE_TITLE;
export interface IChangeTitle {
    type: CHANGE_TITLE;
    title: string;
}
export const changeTitle = (title: string): IChangeTitle => {
    return {
        type: CHANGE_TITLE,
        title: title
    };
};

export const START_LOADING = "START_LOADING";
export type START_LOADING = typeof START_LOADING;
export interface IStartLoading {
    type: START_LOADING;
}
export const startLoading = (): IStartLoading => {
    return {
        type: START_LOADING
    };
};

export const STOP_LOADING = "STOP_LOADING";
export type STOP_LOADING = typeof STOP_LOADING;
export interface IStopLoading {
    type: STOP_LOADING;
}
export const stopLoading = (): IStopLoading => {
    return {
        type: STOP_LOADING
    };
};

export const LOGIN_OK = "LOGIN_OK";
export type LOGIN_OK = typeof LOGIN_OK;
export interface ILoginOK {
    type: LOGIN_OK;
}
export const loginOK = (): ILoginOK => {
    return {
        type: LOGIN_OK
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
}
export const changeUserInfo = (username: string, avatar: string, isAdmin: boolean): IChangeUserInfo => {
    return {
        type: CHANGE_USER_INFO,
        username,
        avatar,
        isAdmin
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
