export interface IThreadListItem {
    tid: string;
    title: string;
    username: string;
    time: Date;
    userAvatar: string;
}

export interface IPostListItem {
    pid: string;
    username: string;
    time: Date;
    userAvatar: string;
    content: string;
}

export interface INotificationItem {
    nid: string;
    username: string;
    userAvatar: string;
    content: string;
    isRead: boolean;
    time: Date;
}
