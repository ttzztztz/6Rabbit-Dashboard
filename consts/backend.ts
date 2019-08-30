export const DEV_BACKEND = "http://localhost:8000";
export const CLIENT_BACKEND = process.env.BUILD === "prod" ? "https://www.6rabbit.com/api" : DEV_BACKEND;
export const SERVER_BACKEND = process.env.BUILD === "prod" ? "http://backend:8000" : DEV_BACKEND;
export const SUFFIX_BACKEND = process.env.BUILD === "prod" ? "/api" : DEV_BACKEND;

export const BACKEND_ROOT = () => (process.browser ? CLIENT_BACKEND : SERVER_BACKEND);

export const FETCH_THREAD_LIST = (fid: string, page: string) => `${BACKEND_ROOT()}/thread/list/${fid}/${page}`;
export const FETCH_AVATAR = (uid: string) => `${BACKEND_ROOT()}/file/avatar/${uid}`;
export const FETCH_THREAD = (tid: string, page: string) => `${BACKEND_ROOT()}/thread/${tid}/${page}`;
export const FETCH_POST = (pid: string) => `${BACKEND_ROOT()}/post/${pid}`;
export const FETCH_TOKEN = `${BACKEND_ROOT()}/user/token`;
export const FETCH_FORUM_LIST = `${BACKEND_ROOT()}/forum/list`;
export const FETCH_FORUM_INFO = (fid: string) => `${BACKEND_ROOT()}/forum/info/${fid}`;
export const FETCH_NOTIFICATION_LIST = (page: string) => `${BACKEND_ROOT()}/notification/all/${page}`;
export const FETCH_AGGREGATE_PURCHASED_LIST = (page: string) => `${BACKEND_ROOT()}/user/purchased/aggregate/${page}`;
export const FETCH_USER_THREAD_LIST = (uid: string, page: string) => `${BACKEND_ROOT()}/user/thread/${uid}/${page}`;
export const FETCH_USER_POST_LIST = (uid: string, page: string) => `${BACKEND_ROOT()}/user/post/${uid}/${page}`;
export const FETCH_OAUTH_REDIRECT = (platform: string) => `${BACKEND_ROOT()}/oauth/${platform}`;
export const FETCH_OAUTH_LIST = `${BACKEND_ROOT()}/oauth/list`;
export const FETCH_OAUTH_INFO = (platform: string, code: string) => `${BACKEND_ROOT()}/oauth/info/${platform}/${code}`;
export const FETCH_OAUTH_BIND = (platform: string, code: string) => `${BACKEND_ROOT()}/oauth/bind/${platform}/${code}`;
export const FETCH_OAUTH_LOGIN = (platform: string, code: string) => `${BACKEND_ROOT()}/oauth/login/${platform}/${code}`;
export const FETCH_UNUSED_ATTACH = `${BACKEND_ROOT()}/attach/unused`;
export const FETCH_PICTURE_ATTACH = (aid: string) => `${SUFFIX_BACKEND}/file/picture/${aid}`;
export const FETCH_ATTACH_PAY = (aid: string) => `${BACKEND_ROOT()}/attach/pay/${aid}`;
export const FETCH_ATTACH_INFO = (aid: string) => `${BACKEND_ROOT()}/attach/info/${aid}`;
export const FETCH_CREDITS_LOG = (page: string) => `${BACKEND_ROOT()}/user/credits/log/${page}`;
export const FETCH_USER_GROUP_LIST = `${BACKEND_ROOT()}/user/group/list`;

export const OPTIONS_DEPOSIT_ADMIN = `${BACKEND_ROOT()}/deposit/admin`;
export const OPTIONS_NOTIFICATION_ALL = `${BACKEND_ROOT()}/notification/all`;
export const OPTIONS_NOTIFICATION_ITEM = (nid: string) => `${BACKEND_ROOT()}/notification/item/${nid}`;
export const OPTIONS_THREAD = (tid: string) => `${BACKEND_ROOT()}/thread/${tid}`;
export const OPTIONS_POST = (pid: string) => `${BACKEND_ROOT()}/post/${pid}`;
export const OPTIONS_MY_INFO = `${BACKEND_ROOT()}/user/info/my`;
export const OPTIONS_USER_INFO_PROFILE = (uid: string) => `${BACKEND_ROOT()}/user/info/${uid}`;

export const POST_REPLY_THREAD = (tid: string) => `${BACKEND_ROOT()}/thread/reply/${tid}`;
export const POST_THREAD_CREATE = `${BACKEND_ROOT()}/thread/create`;
export const POST_LOGIN = `${BACKEND_ROOT()}/user/login`;
export const POST_REGISTER = `${BACKEND_ROOT()}/user/register`;
export const POST_THREAD_CLOSE = `${BACKEND_ROOT()}/thread/close`;
export const POST_THREAD_TOP = `${BACKEND_ROOT()}/thread/top`;
export const POST_THREAD_DIAMOND = `${BACKEND_ROOT()}/thread/diamond`;
export const POST_THREAD_SEARCH = (page: string) => `${BACKEND_ROOT()}/thread/search/${page}`;
export const POST_AVATAR_UPLOAD = `${BACKEND_ROOT()}/file/avatar`;
export const POST_FILE_UPLOAD = `${BACKEND_ROOT()}/file/upload`;
export const POST_FILE_DOWNLOAD = (aid: string) => `${BACKEND_ROOT()}/file/download/${aid}`;
export const POST_PAY = `${BACKEND_ROOT()}/deposit/pay`;
export const POST_ADMIN_USER_GROUP = `${BACKEND_ROOT()}/user/admin/group`;

export const PUT_UPDATE_PASSWORD = `${BACKEND_ROOT()}/user/info/password`;

export const DELETE_MANY_THREADS = `${BACKEND_ROOT()}/thread/batch`;
export const DELETE_OAUTH_TOKEN = (platform: string, code: string) => `${BACKEND_ROOT()}/oauth/${platform}/${code}`;
export const DELETE_OAUTH_BIND = (platform: string) => `${BACKEND_ROOT()}/oauth/${platform}`;
export const DELETE_ATTACH = (aid: string) => `${BACKEND_ROOT()}/attach/${aid}`;
