import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

import Avatar from "../../Components/Avatar";
import { IPostListItem } from "../../Typings";

interface Props extends WithStyles, IPostListItem {}

class PostListItem extends React.PureComponent<Props & RouteComponentProps> {
    render() {
        const { classes, pid, username, time, userAvatar, content } = this.props;

        return (
            <div className={classes["post-list-item-container"]} data-pid={pid}>
                <div className={classes["post-avatar"]}>
                    <Avatar src={userAvatar} width={32} />
                </div>
                <div>
                    <div className={classes["post-list-item-info"]}>
                        <span className={classes["author-username"]}>{username}</span>
                        <span>{time.toLocaleString()}</span>
                    </div>
                    <div className={classes["content-container"]} dangerouslySetInnerHTML={{ __html: content }} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PostListItem);
