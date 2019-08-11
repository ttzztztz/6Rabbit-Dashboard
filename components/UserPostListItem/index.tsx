import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { IUserPostItem } from "../../typings";

import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { FETCH_AVATAR } from "../../consts/backend";

interface Props extends WithStyles, IUserPostItem {
    showAvatar: boolean;
}

class UserPostListItem extends React.Component<Props> {
    render() {
        const {
            classes,
            thread: {
                subject,
                tid,
                user: { username, uid }
            },
            createDate,
            showAvatar,
            message
        } = this.props;
        const userAvatar = FETCH_AVATAR(uid);

        return (
            <div className={classes["thread-list-item-container"]}>
                {showAvatar && (
                    <div className={classes["thread-avatar"]}>
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                            <Avatar src={userAvatar} width={48} />
                        </Link>
                    </div>
                )}
                <div>
                    <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)} passHref>
                        <Typography variant="body1" component="a" className={classes["thread-list-item-title"]}>
                            {subject}
                        </Typography>
                    </Link>
                    <div className={classes["message-container"]}>
                        <div dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                    <Typography variant="body1" className={classes["second-info"]}>
                        {showAvatar && (
                            <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                                <span className={classes["author-username"]}>{username}</span>
                            </Link>
                        )}
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserPostListItem);
