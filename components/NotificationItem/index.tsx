import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";

import ClearIcon from "@material-ui/icons/Clear";

import Avatar from "../Avatar";
import { INotificationItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

interface Props extends WithStyles, INotificationItem {
    handleDelete: (nid: string) => void;
    handleRead: (nid: string) => void;
}

class NotificationItem extends React.PureComponent<Props> {
    render() {
        const { classes, nid, createDate, fromUser, content, isRead, handleDelete, handleRead } = this.props;

        return (
            <div className={classes["notification-item-container"]} data-nid={nid} onClick={() => handleRead(nid)}>
                <div className={classes["author-avatar"]}>
                    <Avatar src={FETCH_AVATAR(fromUser.uid)} width={32} />
                </div>
                <div className={classes["notification-clear"]} onClick={() => handleDelete(nid)}>
                    <ClearIcon className={classes["clear-icon"]} />
                    删除
                </div>
                <div>
                    <div className={classes["notification-item-info"]}>
                        <span className={classes["author-username"]}>{fromUser.username}</span>
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </div>
                    {isRead && <div className={classes["content-container"]}>{content}</div>}
                    {!isRead && (
                        <div className={clsx(classes["content-container"], classes["content-unread"])}>
                            <div className={classes["unread-circle"]} />
                            {content}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(NotificationItem);
