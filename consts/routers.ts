export const USER_PROFILE = (uid: string) => `/profile?uid=${uid}`;
export const THREAD_INFO = (tid: string, page: string = "1") => `/thread?tid=${tid}&page=${page}`;
