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

export interface IUserPostItem {
    pid: string;
    thread: IThreadListItem;
    isFirst: boolean;
    message: string;
    createDate: Date;
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

export enum IPostPageType {
    CREATE_THREAD,
    CREATE_REPLY,
    EDIT_THREAD,
    EDIT_REPLY
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

export interface IReplyForm {
    quotepid: string;
    message: string;
}

export interface IForumItem {
    fid: string;
    name: string;
    description: string;
    threads: number;
    type: "blog" | "shop" | "normal";
}

export interface IGeneralResponse {
    code: number;
    message: any;
}

export interface IThreadAttachForm {
    aid: string;

    credits: number;
    creditsType: number;
}

export interface IUpdatePasswordForm {
    oldPassword: string;
    newPassword: string;
    newPasswordRepeat: string;
}

export interface IUpdateProfileForm {
    realname: string;
    gender: number;
    email: string;
    qq: string;
    mobile: string;
    wechat: string;
    signature: string;
}

export interface INotificationItem {
    nid: string;
    fromUser: IOtherUser;
    toUser: IOtherUser;
    content: string;
    isRead: boolean;
    createDate: Date;
}

export interface INotificationListResponse {
    count: { total: number; unread: number };
    list: Array<INotificationItem>;
}
