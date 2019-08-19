import * as actions from "../actions";
import { IGroup } from "../typings";

export interface UserStore {
    username: string;
    avatar: string;
    uid: string;
    usergroup: IGroup;
    credits: number;
    golds: number;
    rmbs: number;
}

type Action = actions.IChangeUserInfo | actions.IUserLogoutOK | actions.IChangeUserCreditsAndGroup;

const initState: UserStore = {
    username: "6Rabbit",
    avatar: "/static/avatar.png",
    uid: "-1",
    usergroup: {
        gid: "1",
        name: "",
        isAdmin: false,
        canPost: true,
        canLogin: true
    },
    credits: 0,
    golds: 0,
    rmbs: 0
};

export const userReducer = function(state = initState, action: Action): UserStore {
    switch (action.type) {
        case actions.CHANGE_USER_INFO:
        case actions.CHANGE_USER_CREDITS_AND_GROUP:
            return {
                ...state,
                ...action.payload
            };
        case actions.USER_LOG_OUT_OK:
            return {
                ...state,
                ...initState
            };
    }
    return state;
};
