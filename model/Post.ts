import FrontendRequest from "./FrontendRequest";

import { POST_REPLY_THREAD, POST_THREAD_CREATE, OPTIONS_THREAD, OPTIONS_POST } from "../consts/backend";
import { IGeneralResponse, IThreadAttachForm } from "../typings";

export const requestReply = async (tid: string, message: string, quotepid: string) => {
    const { data } = await FrontendRequest({ url: POST_REPLY_THREAD(tid), data: { message, quotepid }, method: "POST" }).toPromise();
    return data as IGeneralResponse;
};

export const requestCreateThread = async (
    fid: string,
    subject: string,
    message: string,
    attachList: Array<IThreadAttachForm>,
    creditsType: number,
    credits: number
) => {
    const { data } = await FrontendRequest({
        url: POST_THREAD_CREATE,
        data: { fid, subject, message, attach: attachList, creditsType, credits },
        method: "POST"
    }).toPromise();
    return data as IGeneralResponse;
};

export const requestEditThread = async (
    tid: string,
    fid: string,
    subject: string,
    message: string,
    attachList: Array<IThreadAttachForm>,
    creditsType: number,
    credits: number
) => {
    const { data } = await FrontendRequest({
        url: OPTIONS_THREAD(tid),
        data: { fid, subject, message, attach: attachList, creditsType, credits },
        method: "PUT"
    }).toPromise();
    return data as IGeneralResponse;
};

export const requestEditReply = async (pid: string, message: string) => {
    const { data } = await FrontendRequest({ url: OPTIONS_POST(pid), data: { message }, method: "PUT" }).toPromise();
    return data as IGeneralResponse;
};
