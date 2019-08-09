import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";
import { IPostListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

interface Props extends WithStyles, IPostListItem {}

class PostListItem extends React.PureComponent<Props> {
    render() {
        const {
            classes,
            pid,
            createDate,
            message,
            user: { username, uid }
        } = this.props;
        const userAvatar = FETCH_AVATAR(uid);

        return (
            <div className={classes["post-list-item-container"]} data-pid={pid}>
                <div className={classes["post-avatar"]}>
                    <Avatar src={userAvatar} width={32} />
                </div>
                <div>
                    <div className={classes["post-list-item-info"]}>
                        <span className={classes["author-username"]}>{username}</span>
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </div>
                    <div className={classes["content-container"]} dangerouslySetInnerHTML={{ __html: message }} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PostListItem);
