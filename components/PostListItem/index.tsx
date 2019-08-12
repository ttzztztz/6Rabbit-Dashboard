import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";
import { IPostListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

import Link from "next/link";
import { USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";

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
                    <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                        <Avatar src={userAvatar} width={32} />
                    </Link>
                </div>
                <div>
                    <div className={classes["post-list-item-info"]}>
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                            <span className={classes["author-username"]}>{username}</span>
                        </Link>
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </div>
                    <div className={classes["content-container"]} dangerouslySetInnerHTML={{ __html: message }} />
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PostListItem);
