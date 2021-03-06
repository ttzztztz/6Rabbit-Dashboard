import React from "react";
import styles from "./style";
import clsx from "clsx";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { IUserPostItem, IForumItem } from "../../typings";

import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import { FETCH_AVATAR } from "../../consts/backend";

interface Props extends WithStyles, IUserPostItem {
    showAvatar: boolean;

    forum: Array<IForumItem>;
}

class UserPostListItem extends React.Component<Props> {
    renderForumName = () => {
        const {
            thread: { fid },
            forum
        } = this.props;
        const result = forum.filter(item => item.fid === fid);
        if (result.length === 1) {
            return <span>{result[0].name}</span>;
        } else {
            return <></>;
        }
    };

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
                <div className={classes["thread-content"]}>
                    <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)} passHref>
                        <Typography variant="body1" component="a" className={classes["thread-list-item-title"]}>
                            {subject}
                        </Typography>
                    </Link>
                    <div className={clsx("content-container", classes["message-container"])}>
                        <div className="braft-output-content" dangerouslySetInnerHTML={{ __html: message }} />
                    </div>
                    <Typography variant="body1" className={classes["second-info"]}>
                        {showAvatar && (
                            <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                                <span className={clsx(classes["author-username"], classes["second-info-margin"])}>{username}</span>
                            </Link>
                        )}
                        <span className={classes["second-info-margin"]}>{new Date(createDate).toLocaleString()}</span>
                        {this.renderForumName()}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(UserPostListItem);
