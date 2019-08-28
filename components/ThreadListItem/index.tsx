import React from "react";
import styles from "./style";
import clsx from "clsx";

import Link from "next/link";
import { NextRouter, withRouter } from "next/dist/client/router";

import { WithStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";

import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { ForumType, IThreadListImageItem, IForumItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

interface Props extends WithStyles, IThreadListImageItem {
    type: ForumType;
    router: NextRouter;

    canAdmin: boolean;
    isAdmin: boolean;
    onChange: (tid: string, checked: boolean) => void;
    showForumName?: boolean;
    forum: Array<IForumItem>;
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

    renderImage = () => {
        const {
            type,
            classes,
            user: { uid },
            tid,
            image: picture
        } = this.props;

        if (type === "blog") {
            return <></>;
        } else if (type === "normal") {
            const userAvatar = FETCH_AVATAR(uid);
            return (
                <div className={classes["thread-avatar"]}>
                    <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                        <Avatar src={userAvatar} width={48} />
                    </Link>
                </div>
            );
        } else if (type === "image") {
            const showPicture = picture || FETCH_AVATAR(uid);

            return (
                <div className={clsx(classes["thread-pic"], classes["second-info-margin"])}>
                    <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)} passHref>
                        <Avatar src={showPicture} width={48} />
                    </Link>
                </div>
            );
        }
    };
    renderForumName = () => {
        const { fid, forum } = this.props;
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
            subject,
            createDate,
            diamond,
            isTop,
            isClosed,
            tid,
            user: { username, uid },
            canAdmin,
            isAdmin,
            showForumName
        } = this.props;
        const { checked } = this.state;

        return (
            <div className={classes["thread-list-item-container"]}>
                {this.renderImage()}
                <div>
                    <Typography variant="h6" component="h6" className={clsx(classes["thread-list-item-title"], classes["thread-icon-container"])}>
                        {canAdmin && isAdmin && <Checkbox checked={checked} onChange={this.handleCheckStateChange} value="checkedA" />}
                        {diamond > 0 && <GradeIcon className={classes["thread-icon"]} />}
                        {isTop && <ArrowUpwardIcon className={classes["thread-icon"]} />}
                        {isClosed && <LockIcon className={classes["thread-icon"]} />}
                        <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)}>
                            <a>{subject}</a>
                        </Link>
                    </Typography>
                    <Typography variant="body1" className={classes["second-info"]}>
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)}>
                            <span className={clsx(classes["author-username"], classes["second-info-margin"])}>{username}</span>
                        </Link>
                        <span className={classes["second-info-margin"]}>{new Date(createDate).toLocaleString()}</span>
                        {!!showForumName && this.renderForumName()}
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(ThreadListItem));
