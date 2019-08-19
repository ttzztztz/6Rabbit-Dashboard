import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";

import Avatar from "../Avatar";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { IThreadListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";

import Link from "next/link";

interface Props extends WithStyles, IThreadListItem {
    canAdmin: boolean;
    isAdmin: boolean;
    onChange: (tid: string, checked: boolean) => void;
}

class ThreadListImageItem extends React.Component<Props> {
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
            <Card className={classes.card}>
                <div className={classes.details}>
                    <CardContent className={classes.content}>
                        <Typography component="h5" variant="h5">
                            Live From Space
                        </Typography>
                        <Typography variant="subtitle1" color="textSecondary">
                            Mac Miller
                        </Typography>
                    </CardContent>
                    <div className={classes.controls}>xxx</div>
                </div>
                <CardMedia className={classes.cover} image="/static/images/cards/live-from-space.jpg" title="Live from space album cover" />
            </Card>
        );
    }
}

export default withStyles(styles)(ThreadListImageItem);
