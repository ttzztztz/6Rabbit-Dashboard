import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import Link from "next/link";

import Avatar from "../Avatar";
import { IPostListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";
import { USER_PROFILE_RAW, USER_PROFILE, POST_UPDATE_RAW, POST_UPDATE } from "../../consts/routers";

interface Props extends WithStyles, IPostListItem {
    isAdmin: boolean;
    uid: string;

    deletePost: (pid: string) => void;
}

class PostListItem extends React.PureComponent<Props> {
    state = {
        deleteDialog: false
    };

    handleDialogClose = () => {
        this.setState({
            deleteDialog: false
        });
    };
    handleDialogOpen = () => {
        this.setState({
            deleteDialog: true
        });
    };
    handleDialogConfirm = () => {
        this.handleDialogClose();
        const { deletePost, pid } = this.props;
        deletePost(pid);
    };
    renderDialog = () => {
        const { deleteDialog } = this.state;

        return (
            <Dialog open={deleteDialog} onClose={this.handleDialogClose}>
                <DialogTitle>操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>你即将删除这个回帖，删除操作不可逆，你确定要这样做吗？</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleDialogClose} color="primary">
                        取消操作
                    </Button>
                    <Button onClick={this.handleDialogConfirm} color="primary" autoFocus>
                        确认删除
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    render() {
        const {
            classes,
            pid,
            createDate,
            message,
            user: { username, uid },
            isAdmin,
            uid: readerUid
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
                            <span className={classes["action-btn"]}>{username}</span>
                        </Link>
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </div>
                    <div className={clsx(classes["content-container"], "braft-output-content")} dangerouslySetInnerHTML={{ __html: message }} />
                    {(isAdmin || readerUid === uid) && (
                        <div className={classes["post-list-item-info"]}>
                            <Link href={POST_UPDATE_RAW} as={POST_UPDATE(pid)}>
                                <span className={classes["action-btn"]}>编辑</span>
                            </Link>
                            <span className={classes["action-btn"]} onClick={this.handleDialogOpen}>
                                删除
                            </span>
                            {this.renderDialog()}
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PostListItem);
