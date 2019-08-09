import * as actions from "../actions";
import { IForumItem } from "../typings";

export interface BasicStore {
    title: string;
    loading: boolean;
    isLogin: boolean;
    snackbars: actions.IEnqueueSnackbar["notification"][];
    forum: Array<IForumItem>;
}

type Action = actions.ILoginOK | actions.ILogoutOK | actions.IToggleProgress | actions.IEnqueueSnackbar | actions.IRemoveSnackbar | actions.IChangeForum;

const initState: BasicStore = {
    title: "酷兔网",
    loading: false,
    isLogin: false,
    snackbars: [],
    forum: []
};

export const basicReducer = function(state = initState, action: Action): BasicStore {
    switch (action.type) {
        case actions.TOGGLE_PROGRESS:
            return { ...state, loading: action.on };
        case actions.LOGIN_OK:
            return { ...state, isLogin: true };
        case actions.LOGOUT_OK:
            return { ...state, isLogin: false };
        case actions.ENQUEUE_SNACKBAR:
            return { ...state, snackbars: [...state.snackbars, { ...action.notification }] };
        case actions.REMOVE_SNACKBAR:
            return { ...state, snackbars: state.snackbars.filter(snackbar => snackbar.key !== action.key) };
        case actions.CHANGE_FORUM:
            return { ...state, forum: action.payload };
    }
    return state;
};
