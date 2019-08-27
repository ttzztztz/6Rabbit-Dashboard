import { POST_REPLY_THREAD, POST_THREAD_CREATE, OPTIONS_THREAD, OPTIONS_POST } from "../consts/backend";
import { IGeneralResponse, IThreadAttachForm } from "../typings";
import FrontendRequestPromise from "./FrontendRequestPromise";
import { Dispatch } from "redux";

export const requestReply = async (tid: string, message: string, quotepid: string, token: string, dispatch: Dispatch) => {
    const { data } = await FrontendRequestPromise({ url: POST_REPLY_THREAD(tid), data: { message, quotepid, token }, method: "POST" }, dispatch);
    return data as IGeneralResponse;
};

export const requestCreateThread = async (
    fid: string,
    subject: string,
    message: string,
    attachList: Array<IThreadAttachForm>,
    token: string,
    dispatch: Dispatch
) => {
    const { data } = await FrontendRequestPromise(
        {
            url: POST_THREAD_CREATE,
            data: { fid, subject, message, attach: attachList, token },
            method: "POST"
        },
        dispatch
    );
    return data as IGeneralResponse;
};

export const requestEditThread = async (
    tid: string,
    fid: string,
    subject: string,
    message: string,
    attachList: Array<IThreadAttachForm>,
    token: string,
    dispatch: Dispatch
) => {
    const { data } = await FrontendRequestPromise(
        {
            url: OPTIONS_THREAD(tid),
            data: { fid, subject, message, attach: attachList, token },
            method: "PUT"
        },
        dispatch
    );
    return data as IGeneralResponse;
};

export const requestEditReply = async (pid: string, message: string, token: string, dispatch: Dispatch) => {
    const { data } = await FrontendRequestPromise({ url: OPTIONS_POST(pid), data: { message, token }, method: "PUT" }, dispatch);
    return data as IGeneralResponse;
};
