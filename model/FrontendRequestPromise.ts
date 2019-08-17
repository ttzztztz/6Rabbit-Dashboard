import axios, { AxiosRequestConfig } from "axios";
import { enqueueSnackbar, toggleProgress } from "../actions";
import { Dispatch } from "redux";

const FrontendRequestPromise = async (options: AxiosRequestConfig, dispatch?: Dispatch) => {
    try {
        console.log(1, dispatch);
        dispatch && dispatch(toggleProgress(true));

        const token: string = localStorage.getItem("token") || "";
        if (options.headers) {
            return await axios({
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: token
                }
            });
        } else {
            return await axios({
                ...options,
                headers: {
                    Authorization: token
                }
            });
        }
    } catch (err) {
        console.log(err);
        if (err) {
            dispatch && dispatch(enqueueSnackbar(err.toString(), { variant: "error" }));
        }
    } finally {
        dispatch && dispatch(toggleProgress());
    }
    return await Promise.reject();
};

export default FrontendRequestPromise;
