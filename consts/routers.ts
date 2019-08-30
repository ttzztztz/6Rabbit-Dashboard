export const USER_LOGIN = `/user/login`;
export const USER_REGISTER = `/user/login?state=register`;
export const USER_CENTER = `/user`;
export const USER_NOTIFICATION_CENTER = `/user?state=notification`;
export const USER_CREDITS = `/user?state=credits`;
export const HOMEPAGE = `/`;
export const ADMIN = `/admin`;

export const USER_PROFILE_RAW = `/profile/[uid]`;
export const THREAD_INFO_RAW = `/thread/[tid]/[page]`;
export const THREAD_UPDATE_RAW = `/thread/update/[tid]`;
export const THREAD_LIST_RAW = `/forum/[fid]/[page]`;
export const POST_UPDATE_RAW = `/post/update/[pid]`;
export const SEARCH_RAW = `/search/[keywords]/[page]`;
export const THREAD_REPLY_RAW = `/thread/reply/[tid]`;

export const THREAD_CREATE = `/thread/create`;
export const USER_PROFILE = (uid: string) => `/profile/${uid}`;
export const THREAD_INFO = (tid: string, page: string = "1") => `/thread/${tid}/${page}`;
export const THREAD_LIST = (fid: string, page: string = "1") => `/forum/${fid}/${page}`;
export const THREAD_UPDATE = (tid: string) => `/thread/update/${tid}`;
export const THREAD_REPLY = (tid: string) => `/thread/reply/${tid}`;
export const POST_UPDATE = (pid: string) => `/post/update/${pid}`;
export const SEARCH = (keywords: string, page: string) => `/search/${keywords}/${page}`;
