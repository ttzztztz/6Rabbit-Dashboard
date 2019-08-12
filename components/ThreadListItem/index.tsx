import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

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

    canAdmin: boolean;
    isAdmin: boolean;
    onChange: (tid: string, checked: boolean) => void;
}

class ThreadListItem extends React.Component<Props> {
    state = {
        checked: false
    };
    handleCheckStateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { onChange, tid } = this.props;
        this.setState({
            checked: event.target.checked
        });
        onChange(tid, event.target.checked);
    };
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
            user: { username, uid },
            canAdmin,
            isAdmin
        } = this.props;
        const { checked } = this.state;
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
                    <Typography variant="h6" component="h6" className={clsx(classes["thread-list-item-title"], classes["thread-icon-container"])}>
                        {canAdmin && isAdmin && <Checkbox checked={checked} onChange={this.handleCheckStateChange} value="checkedA" />}
                        {diamond > 0 && <GradeIcon className={classes["thread-icon"]} />}
                        {isTop && <ArrowUpwardIcon className={classes["thread-icon"]} />}
                        {isClosed && <LockIcon className={classes["thread-icon"]} />}
                        <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)} passHref>
                            <a>{subject}</a>
                        </Link>
                    </Typography>
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
