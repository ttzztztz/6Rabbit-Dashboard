import { OptionsObject } from "notistack";
import { NextPageContext } from "next";
import { Store } from "redux";

export interface IGroup {
    gid: string;
    name: string;
    isAdmin: boolean;
    canPost: boolean;
    canLogin: boolean;
}

export interface IOtherUser {
    uid: string;
    username: string;
    signature: string;
    usergroup: IGroup;
}

export interface IThreadAbstract {
    tid: string;
    subject: string;
    posts: number;
    isTop: boolean;
    isClosed: boolean;
    diamond: number;
    lastpid: string;
    firstpid: string;

    createDate: Date;
    replyDate: Date;
    creditsType: number;
    credits: number;

    lastUser: IOtherUser;
    user: IOtherUser;
}

export interface IThreadListItem extends IThreadAbstract {
    fid: string;
}

export interface IThreadListImageItem extends IThreadListItem {
    image?: string;
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
    creditsType: 0 | 1 | 2 | 3;
    credits: number;
    createDate: Date;

    needBuy?: boolean;
}

export const ICreditsTypeMapper = [
    {
        id: 0,
        text: "关闭",
        field: "none"
    },
    {
        id: 1,
        text: "经验",
        field: "credits"
    },
    {
        id: 2,
        text: "金币",
        field: "golds"
    },
    {
        id: 3,
        text: "人民币",
        field: "rmbs"
    }
];

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

export interface IMyUserMiniInfo {
    usergroup: IGroup;
    credits: number;
    golds: number;
    rmbs: number;
}

export interface ILoginResponse extends IMyUserMiniInfo {
    token: string;
    username: string;
    uid: string;
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

export type ForumType = "blog" | "image" | "normal";

export interface IForumItem {
    fid: string;
    name: string;
    description: string;
    threads: number;
    type: ForumType;
    adminPost: boolean;
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

export interface IThreadItem extends IThreadAbstract {
    forum: IForumItem;
}

export interface IThreadItemResponse {
    thread: IThreadItem;
    postList: Array<IPostListItem>;
    firstPost: IPostListItem;
    attachList: Array<IThreadAttach>;
}

export interface ISearchItem extends IUserPostItem {
    uid: string;
    username: string;
}

export interface ISearchResponse {
    count: number;
    list: Array<ISearchItem>;
}

export interface ILoginResponse {
    token: string;
    uid: string;
    username: string;
    isAdmin: boolean;
}

export interface IOAuthActionPayload {
    code: string;
    platform: string;
}

export interface IOAuthUserInfo {
    openid: string;
    username: string;
    avatarURL: string;
}

export interface IOAuthInfoResponse {
    userInfo: IOAuthUserInfo;
    active: boolean;
}

export interface IOAuth {
    oid: string;
    uid: string;
    platform: string;
    openid: string;
}

export const OAuthWebsites = ["Github", "QQ"];

export interface IUploadingItem {
    file: File;
    progress: number;
    tempId: string;
}

export interface IAttachPrefetchInfo {
    attach: IThreadAttach;
    needBuy: boolean;
}

export interface IMyUserInfoResponse {
    uid: string;
    usergroup: IGroup;
    username: string;
    gender: number;
    realname: string;
    email: string;
    mobile: string;
    qq: string;
    wechat: string;
    signature: string;
    credits: number;
    golds: number;
    rmbs: number;
}

export interface ICreditsLog {
    cid: string;
    user: IOtherUser;
    status: -1 | 0 | 1;
    type: string;
    description: string;
    creditsType: 0 | 1 | 2 | 3;
    credits: number;
    createDate: Date;
}

export interface IThreadImageItem {
    tid: string;
    picture: string;
}

export interface IThreadListNewResponse {
    total: number;
    list: Array<IThreadListItem>;
}
