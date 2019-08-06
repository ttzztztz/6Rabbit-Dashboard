import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";

import ClearIcon from "@material-ui/icons/Clear";

import Avatar from "../Avatar";
import { INotificationItem } from "../../typings";

interface Props extends WithStyles, INotificationItem {}

class NotificationItem extends React.PureComponent<Props> {
    render() {
        const { classes, nid, username, time, userAvatar, content, isRead } = this.props;

        return (
            <div className={classes["notification-item-container"]} data-nid={nid}>
                <div className={classes["author-avatar"]}>
                    <Avatar src={userAvatar} width={32} />
                </div>
                <div className={classes["notification-clear"]}>
                    <ClearIcon className={classes["clear-icon"]} />
                    删除
                </div>
                <div>
                    <div className={classes["notification-item-info"]}>
                        <span className={classes["author-username"]}>{username}</span>
                        <span>{time.toLocaleString()}</span>
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
