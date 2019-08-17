import { POST_REPLY_THREAD, POST_THREAD_CREATE, OPTIONS_THREAD, OPTIONS_POST } from "../consts/backend";
import { IGeneralResponse, IThreadAttachForm } from "../typings";
import FrontendRequestPromise from "./FrontendRequestPromise";
import { Dispatch } from "redux";

export const requestReply = async (tid: string, message: string, quotepid: string, dispatch: Dispatch) => {
    const { data } = await FrontendRequestPromise({ url: POST_REPLY_THREAD(tid), data: { message, quotepid }, method: "POST" }, dispatch);
    return data as IGeneralResponse;
};

export const requestCreateThread = async (fid: string, subject: string, message: string, attachList: Array<IThreadAttachForm>, dispatch: Dispatch) => {
    const { data } = await FrontendRequestPromise(
        {
            url: POST_THREAD_CREATE,
            data: { fid, subject, message, attach: attachList },
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
    dispatch: Dispatch
) => {
    const { data } = await FrontendRequestPromise(
        {
            url: OPTIONS_THREAD(tid),
            data: { fid, subject, message, attach: attachList },
            method: "PUT"
        },
        dispatch
    );
    return data as IGeneralResponse;
};

export const requestEditReply = async (pid: string, message: string, dispatch: Dispatch) => {
    const { data } = await FrontendRequestPromise({ url: OPTIONS_POST(pid), data: { message }, method: "PUT" }, dispatch);
    return data as IGeneralResponse;
};
