import FrontendRequest from "./FrontendRequest";

import { POST_REPLY_THREAD, POST_THREAD_CREATE, PUT_THREAD_EDIT, PUT_REPLY_EDIT } from "../consts/backend";
import { IGeneralResponse, IThreadAttachForm } from "../typings";

export const requestReply = async (tid: string, message: string, quotepid: string) => {
    const { data } = await FrontendRequest({ url: POST_REPLY_THREAD(tid), data: { message, quotepid }, method: "POST" }).toPromise();
    return data as IGeneralResponse;
};

export const requestCreateThread = async (fid: string, subject: string, message: string, attachList: Array<IThreadAttachForm>) => {
    const { data } = await FrontendRequest({ url: POST_THREAD_CREATE, data: { fid, subject, message, attach: attachList }, method: "POST" }).toPromise();
    return data as IGeneralResponse;
};

export const requestEditThread = async (tid: string, fid: string, subject: string, message: string, attachList: Array<IThreadAttachForm>) => {
    const { data } = await FrontendRequest({ url: PUT_THREAD_EDIT(tid), data: { fid, subject, message, attach: attachList }, method: "PUT" }).toPromise();
    return data as IGeneralResponse;
};

export const requestEditReply = async (pid: string, message: string) => {
    const { data } = await FrontendRequest({ url: PUT_REPLY_EDIT(pid), data: { message }, method: "PUT" }).toPromise();
    return data as IGeneralResponse;
};
