export const CHANGE_TITLE = "CHANGE_TITLE";
export type CHANGE_TITLE = typeof CHANGE_TITLE;
export interface IChangeTitle {
    type: CHANGE_TITLE;
    title: string;
}
export const changeTitle = function(title: string): IChangeTitle {
    return {
        type: CHANGE_TITLE,
        title: title
    };
};
