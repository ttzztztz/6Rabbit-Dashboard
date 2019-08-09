import axios, { AxiosRequestConfig } from "axios";
import { from } from "rxjs";

const FrontendRequest = (options: AxiosRequestConfig) => {
    const token: string = localStorage.getItem("token") || "";
    if (options.headers) {
        return from(
            axios({
                ...options,
                headers: {
                    ...options.headers,
                    Authorization: token
                }
            })
        );
    } else {
        return from(
            axios({
                ...options,
                headers: {
                    Authorization: token
                }
            })
        );
    }
};

export default FrontendRequest;
