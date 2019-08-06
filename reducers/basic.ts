import * as actions from "../actions";
import { TITLE_PREFIX } from "../consts";

export interface BasicStore {
    title: string;
    loading: boolean;
    isLogin: boolean;
    snackbars: actions.IEnqueueSnackbar["notification"][];
}

type Action =
    | actions.IChangeTitle
    | actions.ILoginOK
    | actions.ILogoutOK
    | actions.IStartLoading
    | actions.IStopLoading
    | actions.IEnqueueSnackbar
    | actions.IRemoveSnackbar;

const initState: BasicStore = {
    title: "酷兔网",
    loading: false,
    isLogin: false,
    snackbars: []
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
        case actions.ENQUEUE_SNACKBAR:
            return { ...state, snackbars: [...state.snackbars, { ...action.notification }] };
        case actions.REMOVE_SNACKBAR:
            return { ...state, snackbars: state.snackbars.filter(snackbar => snackbar.key !== action.key) };
    }
    return state;
};
