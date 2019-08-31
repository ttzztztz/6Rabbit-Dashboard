import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Link from "next/link";

import Avatar from "../Avatar";
import { IPostListItem } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";
import { USER_PROFILE_RAW, USER_PROFILE, POST_UPDATE_RAW, POST_UPDATE } from "../../consts/routers";
import AttachList from "../../containers/AttachList";

interface Props extends WithStyles, IPostListItem {
    isAdmin: boolean;
    isLogin: boolean;
    uid: string;

    deletePost: (pid: string) => void;
    quotePost: (pid: string, quoteAuthorName: string) => void;
    cancelQuote: () => void;
    activePid: string;
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
    handleQuote = () => {
        const {
            cancelQuote,
            quotePost,
            pid,
            activePid,
            user: { username }
        } = this.props;
        if (activePid === pid) {
            cancelQuote();
        } else {
            quotePost(pid, username);
        }
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
            user: { username, uid, signature },
            isAdmin,
            uid: readerUid,
            attachList,
            activePid,
            quote,
            isLogin
        } = this.props;
        const userAvatar = FETCH_AVATAR(uid);

        return (
            <div className={classes["post-list-item-container"]} data-pid={pid}>
                <div className={classes["post-avatar"]}>
                    <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                        <Avatar src={userAvatar} width={32} />
                    </Link>
                </div>
                <div className={classes["post-content-container"]}>
                    <div className={classes["post-list-item-info"]}>
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                            <span className={classes["action-btn"]}>{username}</span>
                        </Link>
                        <span>{new Date(createDate).toLocaleString()}</span>
                    </div>
                    {quote && (
                        <ExpansionPanel className={classes["quote-container"]}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>引用 {quote.user.username} 的回复</Typography>
                                <Typography className={classes.secondaryHeading}>{new Date(quote.createDate).toLocaleString()}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <div className={clsx("content-container", "braft-output-content")} dangerouslySetInnerHTML={{ __html: quote.message }}></div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    )}
                    <div className={clsx("content-container", "braft-output-content")} dangerouslySetInnerHTML={{ __html: message }}></div>
                    {attachList.length > 0 && <AttachList attachList={attachList} authorUid={uid} />}
                    <div className={classes["post-list-item-info"]}>
                        {signature && <div className={classes["post-list-user-signature"]}>{signature}</div>}
                        {isLogin && (
                            <span className={classes["action-btn"]} onClick={this.handleQuote}>
                                {activePid !== pid ? "引用" : "取消引用"}
                            </span>
                        )}
                        {(isAdmin || readerUid === uid) && (
                            <>
                                <Link href={POST_UPDATE_RAW} as={POST_UPDATE(pid)}>
                                    <span className={classes["action-btn"]}>编辑</span>
                                </Link>
                                <span className={classes["action-btn"]} onClick={this.handleDialogOpen}>
                                    删除
                                </span>
                                {this.renderDialog()}
                            </>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(PostListItem);
