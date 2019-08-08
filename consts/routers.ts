export const USER_PROFILE_RAW = `/profile/[uid]`;
export const THREAD_INFO_RAW = `/thread/[tid]/[page]`;
export const FORUM_LIST_RAW = `/forum/[page]`;

export const USER_PROFILE = (uid: string) => `/profile/${uid}`;
export const THREAD_INFO = (tid: string, page: string = "1") => `/thread/${tid}/${page}`;
export const FORUM_LIST = (page: string = "1") => `/forum/${page}`;
