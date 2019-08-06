import { OptionsObject } from "notistack";

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
