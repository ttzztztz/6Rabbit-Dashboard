import * as actions from "../Actions/basic";

export interface UserStore {
    username: string;
    avatar: string;
}

type Action = actions.IChangeUserInfo;

const initState: UserStore = {
    username: "6Rabbit",
    avatar: "https://www.6rabbit.com/api/user/avatar"
};

export const userReducer = function(state = initState, action: Action): UserStore {
    switch (action.type) {
        case actions.CHANGE_USER_INFO:
            return { ...state, username: action.username, avatar: action.avatar };
    }
    return state;
};
