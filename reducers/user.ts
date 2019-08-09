import * as actions from "../actions";

export interface UserStore {
    username: string;
    avatar: string;
    isAdmin: boolean;
    uid: string;
}

type Action = actions.IChangeUserInfo;

const initState: UserStore = {
    username: "6Rabbit",
    avatar: "https://www.6rabbit.com/api/user/avatar",
    isAdmin: false,
    uid: ""
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
    }
    return state;
};
