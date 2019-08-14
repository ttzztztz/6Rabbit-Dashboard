export const USER_LOGIN = `/user/login`;
export const USER_REGISTER = `/user/login?state=register`;
export const USER_CENTER = `/user`;
export const USER_NOTIFICATION_CENTER = `/user?state=notification`;
export const HOMEPAGE = `/`;

export const USER_PROFILE_RAW = `/profile/[uid]`;
export const THREAD_INFO_RAW = `/thread/[tid]/[page]`;
export const THREAD_UPDATE_RAW = `/thread/update/[pid]`;
export const FORUM_LIST_RAW = `/forum/[page]`;
export const BLOG_LIST_RAW = `/blog/[page]`;
export const SHOP_LIST_RAW = `/shop/[page]`;
export const POST_UPDATE_RAW = `/post/update/[pid]`;
export const SEARCH_RAW = `/search/[keywords]/[page]`;

export const USER_PROFILE = (uid: string) => `/profile/${uid}`;
export const THREAD_INFO = (tid: string, page: string = "1") => `/thread/${tid}/${page}`;
export const FORUM_LIST = (page: string = "1") => `/forum/${page}`;
export const BLOG_LIST = (page: string = "1") => `/blog/${page}`;
export const SHOP_LIST = (page: string = "1") => `/shop/${page}`;
export const THREAD_UPDATE = (pid: string) => `/thread/update/${pid}`;
export const POST_UPDATE = (pid: string) => `/post/update/${pid}`;
export const SEARCH = (keywords: string, page: string) => `/search/${keywords}/${page}`;
