import * as actions from "../Actions/basic";
import { TITLE_PREFIX } from "../Consts";

export interface BasicStore {
    title: string;
    loading: boolean;
    isLogin: boolean;
}

type Action =
    | actions.IChangeTitle
    | actions.ILoginOK
    | actions.ILogoutOK
    | actions.IStartLoading
    | actions.IStopLoading;

const initState: BasicStore = {
    title: "酷兔网",
    loading: false,
    isLogin: false
};

export const basicReducer = function(state = initState, action: Action): BasicStore {
    switch (action.type) {
        case actions.CHANGE_TITLE:
            document.title = TITLE_PREFIX + action.title;
            return { ...state, title: TITLE_PREFIX + action.title };
        case actions.START_LOADING:
            return { ...state, loading: true };
        case actions.STOP_LOADING:
            return { ...state, loading: false };
        case actions.LOGIN_OK:
            return { ...state, isLogin: true };
        case actions.LOGOUT_OK:
            return { ...state, isLogin: false };
    }
    return state;
};
