import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { IThreadListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

import Link from "next/link";

interface Props extends WithStyles, IThreadListItem {
    showAvatar: boolean;
}

class ThreadListItem extends React.Component<Props> {
    render() {
        const {
            classes,
            subject,
            createDate,
            showAvatar,
            diamond,
            isTop,
            isClosed,
            tid,
            user: { username, uid }
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
                        <Typography variant="h6" component="h6" className={clsx(classes["thread-list-item-title"], classes["thread-icon-container"])}>
                            {diamond > 0 && <GradeIcon className={classes["thread-icon"]} />}
                            {isTop && <ArrowUpwardIcon className={classes["thread-icon"]} />}
                            {isClosed && <LockIcon className={classes["thread-icon"]} />}
                            {subject}
                        </Typography>
                    </Link>
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

export default withStyles(styles)(ThreadListItem);
