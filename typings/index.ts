import { OptionsObject } from "notistack";
import { NextPageContext } from "next";
import { Store } from "redux";

export interface IGroup {
    gid: string;
    name: string;
    isAdmin: boolean;
}

export interface IOtherUser {
    uid: string;
    username: string;
    signature: string;
    usergroup: IGroup;
}

export interface IThreadListItem {
    fid: string;
    tid: string;
    subject: string;
    posts: number;
    isTop: boolean;
    isClosed: boolean;
    digest: number;
    lastpid: string;
    firstpid: string;

    createDate: Date;
    replyDate: Date;
    creditsType: number;
    credits: number;

    lastUser: IOtherUser;
    user: IOtherUser;
}

export interface IThreadAttach {
    aid: string;
    fileSize: number;
    downloads: number;
    originalName: string;
    createDate: Date;
}

export interface IQuotePost {
    pid: string;
    user: IOtherUser;
    message: string;
    createDate: string;
}

export interface IPostListItem {
    pid: string;
    tid: string;
    user: IOtherUser;

    quote: IQuotePost;
    isFirst: boolean;
    message: string;
    createDate: Date;
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

export interface ILoginResponse {
    token: string;
    username: string;
    uid: string;
    isAdmin: boolean;
}

export interface IRegisterForm {
    username: string;
    password: string;
    email: string;
}
