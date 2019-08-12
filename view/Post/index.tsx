import React from "react";
import styles from "./style";
import { WithStyles, withStyles, Fab } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import MessageIcon from "@material-ui/icons/Message";

import { OptionsObject } from "notistack";
import { IPostPageType, IForumItem, IThreadAttachForm, IGeneralResponse, IExtendedNextPageContext } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { requestCreateThread, requestEditReply, requestEditThread, requestReply } from "../../model/Post";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";
import { StateObservable, ActionsObservable } from "redux-observable";
import { Subject, of } from "rxjs";
import { Epics } from "../../epics";
import { getThreadInfoStart, IGetThreadInfoStart, IGetThreadInfoOK, IGetPostInfoOK, getPostInfoStart, IGetPostInfoStart } from "../../actions/async";

interface IMapRouteToPageType {
    [key: string]: number;
}
interface IMapPageTypeToTitle {
    [key: number]: string;
}

const mapPageTypeToTitle: IMapPageTypeToTitle = {
    [IPostPageType.CREATE_THREAD]: "发表帖子",
    [IPostPageType.CREATE_REPLY]: "发表回帖",
    [IPostPageType.EDIT_THREAD]: "编辑帖子",
    [IPostPageType.EDIT_REPLY]: "编辑回帖"
};
const mapRouteToPageType: IMapRouteToPageType = {
    "/thread/create": IPostPageType.CREATE_THREAD,
    "/post/create/[tid]": IPostPageType.CREATE_REPLY,
    "/thread/update/[tid]": IPostPageType.EDIT_THREAD,
    "/post/update/[pid]": IPostPageType.EDIT_REPLY
};

interface Props extends WithStyles {
    router: NextRouter;

    forum: Array<IForumItem>;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    isPost: boolean;

    defaultMessage: string;
    defaultFid: string;
    defaultSubject: string;
}

class Post extends React.PureComponent<Props> {
    static async getInitialProps({ store, query, pathname }: IExtendedNextPageContext) {
        let message = "",
            fid = "2",
            subject = "";
        const state$ = new StateObservable(new Subject(), store.getState());

        if (pathname === "/thread/update/[tid]") {
            const tid = query["tid"] as string;
            const {
                payload: {
                    thread: {
                        subject: currentSubject,
                        forum: { fid: currentFid }
                    },
                    firstPost: { message: currentMessage }
                }
            }: IGetThreadInfoOK = await Epics(of(getThreadInfoStart(tid, "1")) as ActionsObservable<IGetThreadInfoStart>, state$, {}).toPromise();

            [subject, fid, message] = [currentSubject, currentFid, currentMessage];
        } else if (pathname === "/post/create/[tid]") {
            const urlMessage = query["message"] as string;
            if (urlMessage && typeof urlMessage === "string" && urlMessage.length >= 1) {
                message = urlMessage;
            }
        } else if (pathname === "/post/update/[pid]") {
            const pid = query["pid"] as string;
            const {
                payload: { message: currentMessage }
            }: IGetPostInfoOK = await Epics(of(getPostInfoStart(pid)) as ActionsObservable<IGetPostInfoStart>, state$, {}).toPromise();

            message = currentMessage;
        }

        return {
            isPost: pathname === "/post/create/[tid]" || pathname === "/post/update/[pid]",
            defaultMessage: message,
            defaultFid: fid,
            defaultSubject: subject
        };
    }

    state = {
        fid: this.props.defaultFid,
        subject: this.props.defaultSubject,
        message: this.props.defaultMessage,
        attach: [] as Array<IThreadAttachForm>
    };

    handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            [key]: e.target.value
        });
    };

    showSnackbar = ({ code, message }: IGeneralResponse) => {
        const { enqueueSnackbar, router } = this.props;
        const optTitle = mapPageTypeToTitle[mapRouteToPageType[router.pathname]];

        if (code === 200) {
            enqueueSnackbar(optTitle + "成功！", { variant: "success" });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };

    createThread = async () => {
        const { fid, subject, message, attach } = this.state;
        const res = await requestCreateThread(fid, subject, message, attach);
        const { code, message: responseMsg } = res;

        this.showSnackbar(res);
    };
    editThread = async () => {
        const { router } = this.props;
        const tid = router.query["tid"] as string;

        const { fid, subject, message, attach } = this.state;
        const res = await requestEditThread(tid, fid, subject, message, attach);
        const { code, message: responseMsg } = res;

        this.showSnackbar(res);
    };
    createReply = async () => {
        const { router } = this.props;
        const tid = router.query["tid"] as string;
        const quotepid = router.query["quotepid"] as string;
        const { message } = this.state;

        const res = await requestReply(tid, message, quotepid);
        const { code, message: responseMsg } = res;

        this.showSnackbar(res);
    };
    editReply = async () => {
        const { router } = this.props;
        const pid = router.query["pid"] as string;
        const { message } = this.state;

        const res = await requestEditReply(pid, message);
        const { code, message: responseMsg } = res;

        this.showSnackbar(res);
    };

    handleSubmitClick = () => {
        const { router } = this.props;
        switch (mapRouteToPageType[router.pathname]) {
            case IPostPageType.CREATE_THREAD:
                this.createThread();
                break;
            case IPostPageType.EDIT_THREAD:
                this.editThread();
                break;
            case IPostPageType.CREATE_REPLY:
                this.createReply();
                break;
            case IPostPageType.EDIT_REPLY:
                this.editReply();
                break;
        }
    };

    render() {
        const { classes, router, forum, isPost } = this.props;
        const { fid, subject: title, message: content } = this.state;
        const showTitle = mapPageTypeToTitle[mapRouteToPageType[router.pathname]];

        return (
            <>
                <Head>
                    <title>
                        {TITLE_PREFIX}
                        {showTitle}
                    </title>
                </Head>
                <Paper className={classes.root}>
                    <Typography variant="h5" component="h3" className={classes["title"]}>
                        {showTitle}
                    </Typography>
                    {!isPost && (
                        <div className={classes["title-container"]}>
                            <TextField
                                id="forum"
                                select
                                label="板块"
                                className={classes["post-forum"]}
                                value={fid}
                                onChange={this.handleChange("fid")}
                                SelectProps={{
                                    MenuProps: {
                                        className: classes.menu
                                    }
                                }}
                                margin="dense"
                                variant="outlined"
                            >
                                {forum.map(item => (
                                    <MenuItem key={item.fid} value={item.fid}>
                                        {item.name}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                id="title"
                                label="帖子标题"
                                className={classes["post-title"]}
                                value={title}
                                onChange={this.handleChange("subject")}
                                margin="dense"
                                variant="outlined"
                            />
                        </div>
                    )}
                    <div className={classes["content-container"]}>
                        <TextField
                            id="content"
                            label="帖子内容"
                            multiline
                            rows="25"
                            value={content}
                            onChange={this.handleChange("message")}
                            className={classes["post-content"]}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className={classes["attach-container"]} />
                    <div className={classes["btn-container"]}>
                        <Fab variant="extended" size="medium" color="primary" aria-label="add" className={classes.button} onClick={this.handleSubmitClick}>
                            <MessageIcon className={classes["btn-icon"]} />
                            {showTitle}
                        </Fab>
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Post));
