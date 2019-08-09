export const BACKEND_ROOT = "http://localhost:8000";

export const FETCH_FORUM_LIST = (page: string) => `${BACKEND_ROOT}/thread/list/1/${page}`;
export const FETCH_SHOP_LIST = (page: string) => `${BACKEND_ROOT}/thread/list/2/${page}`;

export const FETCH_AVATAR = (uid: string) => `${BACKEND_ROOT}/file/avatar/${uid}`;
export const FETCH_THREAD = (tid: string, page: string) => `${BACKEND_ROOT}/thread/${tid}/${page}`;
export const FETCH_LOGIN = `${BACKEND_ROOT}/user/login`;
export const FETCH_REGISTER = `${BACKEND_ROOT}/user/register`;
