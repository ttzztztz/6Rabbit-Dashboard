import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import clsx from "clsx";

import Avatar from "../../Components/Avatar";
import { INotificationItem } from "../../Typings";

interface Props extends WithStyles, INotificationItem {}

class NotificationItem extends React.PureComponent<Props & RouteComponentProps> {
    render() {
        const { classes, nid, username, time, userAvatar, content, isRead } = this.props;

        return (
            <div className={classes["notification-item-container"]} data-nid={nid}>
                <div className={classes["author-avatar"]}>
                    <Avatar src={userAvatar} width={32} />
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
