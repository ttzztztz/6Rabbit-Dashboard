import * as actions from "../Actions/basic";

export interface BasicStore {
    title: string;
    loading: boolean;
}

type Action = actions.IChangeTitle;

const initState: BasicStore = {
    title: "酷兔网",
    loading: false
};

export const basicReducer = function(state = initState, action: Action): BasicStore {
    switch (action.type) {
        case actions.CHANGE_TITLE:
            return { ...state, title: action.title };
    }
    return state;
};
