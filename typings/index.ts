import { OptionsObject } from "notistack";
import { NextPageContext } from "next";
import { Store } from "redux";

export interface IThreadListItem {
    tid: string;
    title: string;
    username: string;
    time: Date;
    userAvatar: string;
}
export interface IPostListItem {
    pid: string;
    username: string;
    time: Date;
    userAvatar: string;
    content: string;
}
export interface INotificationItem {
    nid: string;
    username: string;
    userAvatar: string;
    content: string;
    isRead: boolean;
    time: Date;
}
export enum PostPageType {
    CREATE_THREAD,
    CREATE_POST,
    EDIT_THREAD,
    EDIT_POST
}
export interface ISnackbarItem {
    key: number;
    message: string;
    options?: OptionsObject;
}
export interface IExtendedNextPageContext extends NextPageContext {
    isServer: boolean;
    store: Store;
}
