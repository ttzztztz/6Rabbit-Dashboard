import { IThreadListItem } from "../typings";

export const GET_FORUM_LIST_START = "GET_FORUM_LIST_START";
export type GET_FORUM_LIST_START = typeof GET_FORUM_LIST_START;
export interface IGetForumListStart {
    type: GET_FORUM_LIST_START;
    page: string;
}
export const getForumListStart = (page: string): IGetForumListStart => ({
    type: GET_FORUM_LIST_START,
    page
});

export const GET_FORUM_LIST_OK = "GET_FORUM_LIST_OK";
export type GET_FORUM_LIST_OK = typeof GET_FORUM_LIST_OK;
export interface IGetForumListOK {
    type: GET_FORUM_LIST_OK;
    payload: { list: Array<IThreadListItem>; total: number };
}
export const getForumListOK = (list: Array<IThreadListItem>, total: number): IGetForumListOK => ({
    type: GET_FORUM_LIST_OK,
    payload: { list, total }
});

export const GET_SHOP_LIST_START = "GET_SHOP_LIST_START";
export type GET_SHOP_LIST_START = typeof GET_SHOP_LIST_START;
export interface IGetShopListStart {
    type: GET_SHOP_LIST_START;
    page: string;
}
export const getShopListStart = (page: string): IGetShopListStart => ({
    type: GET_SHOP_LIST_START,
    page
});

export const GET_SHOP_LIST_OK = "GET_SHOP_LIST_OK";
export type GET_SHOP_LIST_OK = typeof GET_SHOP_LIST_OK;
export interface IGetShopListOK {
    type: GET_SHOP_LIST_OK;
    payload: { list: Array<IThreadListItem>; total: number };
}
export const getShopListOK = (list: Array<IThreadListItem>, total: number): IGetShopListOK => ({
    type: GET_SHOP_LIST_OK,
    payload: { list, total }
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
    payload: { list: Array<IThreadListItem>; total: number };
}
export const getThreadInfoOK = (list: Array<IThreadListItem>, total: number): IGetThreadInfoOK => ({
    type: GET_THREAD_INFO_OK,
    payload: { list, total }
});
