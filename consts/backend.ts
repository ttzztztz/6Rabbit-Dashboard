export const BACKEND_ROOT = "http://localhost:8000";

export const FETCH_FORUM_LIST = (page: string) => `${BACKEND_ROOT}/thread/list/2/${page}`;
export const FETCH_SHOP_LIST = (page: string) => `${BACKEND_ROOT}/thread/list/3/${page}`;
export const FETCH_AVATAR = (uid: string) => `${BACKEND_ROOT}/file/avatar/${uid}`;
export const FETCH_THREAD = (tid: string, page: string) => `${BACKEND_ROOT}/thread/${tid}/${page}`;
export const FETCH_TOKEN = `${BACKEND_ROOT}/user/token`;
export const FETCH_FORUM = `${BACKEND_ROOT}/forum/list`;
export const FETCH_MY_INFO = `${BACKEND_ROOT}/user/info/my`;
export const FETCH_NOTIFICATION_LIST = (page: string) => `${BACKEND_ROOT}/notification/all/${page}`;

export const OPTIONS_NOTIFICATION_ALL = `${BACKEND_ROOT}/notification/all`;
export const OPTIONS_NOTIFICATION_ITEM = (nid: string) => `${BACKEND_ROOT}/notification/item/${nid}`;

export const POST_REPLY_THREAD = (tid: string) => `${BACKEND_ROOT}/thread/reply/${tid}`;
export const POST_THREAD_CREATE = `${BACKEND_ROOT}/thread/create`;

export const PUT_REPLY_EDIT = (pid: string) => `${BACKEND_ROOT}/post/${pid}`;
export const PUT_THREAD_EDIT = (tid: string) => `${BACKEND_ROOT}/thread/${tid}`;
export const PUT_UPDATE_PASSWORD = `${BACKEND_ROOT}/user/info/password`;

export const POST_LOGIN = `${BACKEND_ROOT}/user/login`;
export const POST_REGISTER = `${BACKEND_ROOT}/user/register`;
