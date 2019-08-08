import * as actions from "../actions";

export interface BasicStore {
    title: string;
    loading: boolean;
    isLogin: boolean;
    snackbars: actions.IEnqueueSnackbar["notification"][];
}

type Action =
    | actions.ILoginOK
    | actions.ILogoutOK
    | actions.IToggleProgress
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
    }
    return state;
};
