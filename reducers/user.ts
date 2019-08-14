import * as actions from "../actions";

export interface UserStore {
    username: string;
    avatar: string;
    isAdmin: boolean;
    uid: string;
}

type Action = actions.IChangeUserInfo | actions.IUserLogoutOK;

const initState: UserStore = {
    username: "6Rabbit",
    avatar: "/static/avatar.png",
    isAdmin: false,
    uid: "-1"
};

export const userReducer = function(state = initState, action: Action): UserStore {
    switch (action.type) {
        case actions.CHANGE_USER_INFO:
            return {
                ...state,
                username: action.username,
                avatar: action.avatar,
                isAdmin: action.isAdmin,
                uid: action.uid
            };
        case actions.USER_LOG_OUT_OK:
            return {
                ...state,
                username: "",
                uid: "-1",
                avatar: "/static/avatar.png",
                isAdmin: false
            };
    }
    return state;
};
