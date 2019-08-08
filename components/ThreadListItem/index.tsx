import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW } from "../../consts/routers";
import { IThreadListItem } from "../../typings";

import Typography from "@material-ui/core/Typography";
import Link from "next/link";

interface Props extends WithStyles, IThreadListItem {
    showAvatar: boolean;
}

class ThreadListItem extends React.PureComponent<Props> {
    render() {
        const { classes, title, username, time, userAvatar, showAvatar, tid } = this.props;

        return (
            <div className={classes["thread-list-item-container"]}>
                {showAvatar && (
                    <div className={classes["thread-avatar"]}>
                        <Avatar src={userAvatar} width={48} />
                    </div>
                )}
                <div>
                    <Link href={THREAD_INFO_RAW} as={THREAD_INFO(tid)} passHref>
                        <Typography variant="h6" component="h6" className={classes["thread-list-item-title"]}>
                            {title}
                        </Typography>
                    </Link>

                    <Typography variant="body1" className={classes["second-info"]}>
                        {showAvatar && <span className={classes["author-username"]}>{username}</span>}
                        <span>{time.toLocaleString()}</span>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ThreadListItem);
