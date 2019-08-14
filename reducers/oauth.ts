import * as actions from "../actions";

export interface OAuthStore {
    platform: string;
    code: string;
    username: string;
    avatar: string;
    active: boolean;
}

type Action = actions.IClearOAuthStore | actions.ISetOAuthStore | actions.ISetOAuthInfo;

const initState: OAuthStore = {
    platform: "",
    code: "",
    username: "",
    avatar: "/static/avatar.png",
    active: false
};

export const oauthReducer = function(state = initState, action: Action): OAuthStore {
    switch (action.type) {
        case actions.CLEAR_OAUTH_STORE:
            return {
                ...state,
                platform: "",
                code: "",
                username: "",
                avatar: "/static/avatar.png",
                active: false
            };
        case actions.SET_OAUTH_STORE:
            return {
                ...state,
                platform: action.platform,
                code: action.code
            };
        case actions.SET_OAUTH_INFO:
            return {
                ...state,
                username: action.username,
                avatar: action.avatar,
                active: action.active
            };
    }
    return state;
};
