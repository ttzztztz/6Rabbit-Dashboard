import React from "react";
import styles from "./style";
import { Dispatch } from "redux";

import { OptionsObject } from "notistack";
import BraftEditor from "braft-editor";

import { WithStyles, withStyles, Fab } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import MessageIcon from "@material-ui/icons/Message";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

import { IPostPageType, IForumItem, IGeneralResponse, IThreadAttach } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { requestCreateThread, requestEditReply, requestEditThread, requestReply } from "../../model/Post";
import FrontendRequestPromise from "../../model/FrontendRequestPromise";
import { FETCH_THREAD, FETCH_POST, FETCH_UNUSED_ATTACH, DELETE_ATTACH, FETCH_PICTURE_ATTACH } from "../../consts/backend";
import Upload from "../../containers/Upload";
import { THREAD_INFO, THREAD_INFO_RAW, THREAD_CREATE, THREAD_REPLY_RAW, THREAD_UPDATE_RAW, POST_UPDATE_RAW } from "../../consts/routers";
import Vaptcha from "../../components/Vaptcha";

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
    [THREAD_CREATE]: IPostPageType.CREATE_THREAD,
    [THREAD_REPLY_RAW]: IPostPageType.CREATE_REPLY,
    [THREAD_UPDATE_RAW]: IPostPageType.EDIT_THREAD,
    [POST_UPDATE_RAW]: IPostPageType.EDIT_REPLY
};

interface Props extends WithStyles {
    router: NextRouter;

    forum: Array<IForumItem>;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    isAdmin: boolean;

    dispatch: Dispatch;
}

class Post extends React.PureComponent<Props> {
    processAttachForRender = (attachList: Array<IThreadAttach>) => {
        attachList.forEach(item => {
            if (item.creditsType === 3) {
                item.credits = item.credits / 100.0;
            }
            return item;
        });
        return attachList;
    };
    processAttachForServer = (attachList: Array<IThreadAttach>) => {
        attachList.forEach(item => {
            if (item.creditsType === 3) {
                item.credits = item.credits * 100.0;
            }
            return item;
        });
        return attachList;
    };

    async componentDidMount() {
        const {
            router: { pathname, query },
            dispatch
        } = this.props;

        let message = "",
            fid = "2",
            subject = "";

        if (pathname === THREAD_CREATE) {
            const attach = this.processAttachForRender(await this.fetchUnusedAttach());
            this.setState({
                attach
            });
        } else if (pathname === THREAD_UPDATE_RAW) {
            const tid = query["tid"] as string;
            const [
                {
                    data: {
                        message: {
                            thread: {
                                subject: currentSubject,
                                forum: { fid: currentFid }
                            },
                            firstPost: { message: currentMessage },
                            attachList
                        }
                    }
                },
                attach
            ] = await Promise.all([
                FrontendRequestPromise(
                    {
                        url: FETCH_THREAD(tid, "1"),
                        method: "GET"
                    },
                    dispatch
                ),
                this.fetchUnusedAttach()
            ]);

            const newAttachList = this.processAttachForRender([...attach, ...(attachList as Array<IThreadAttach>)]);
            this.setState({
                attach: newAttachList
            });

            [subject, fid, message] = [currentSubject, currentFid, currentMessage];
        } else if (pathname === THREAD_REPLY_RAW) {
            const urlMessage = query["message"] as string;
            if (urlMessage && typeof urlMessage === "string" && urlMessage.length >= 1) {
                message = urlMessage;
            }
            const attach = await this.fetchUnusedAttach();
            this.setState({
                attach: this.processAttachForRender(attach)
            });
        } else if (pathname === POST_UPDATE_RAW) {
            const pid = query["pid"] as string;
            const [
                {
                    data: {
                        message: { message: currentMessage, attachList }
                    }
                },
                attach
            ] = await Promise.all([
                FrontendRequestPromise(
                    {
                        url: FETCH_POST(pid),
                        method: "GET"
                    },
                    dispatch
                ),
                this.fetchUnusedAttach()
            ]);

            console.log(attach, attachList);
            const newAttachList = this.processAttachForRender([...attach, ...(attachList as Array<IThreadAttach>)]);
            this.setState({
                attach: newAttachList
            });

            message = currentMessage;
        }

        this.setState({
            isPost: pathname === THREAD_REPLY_RAW || pathname === POST_UPDATE_RAW,
            message,
            fid,
            subject,
            editorState: BraftEditor.createEditorState(message)
        });
    }

    fetchUnusedAttach = async () => {
        const { dispatch } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequestPromise(
            {
                url: FETCH_UNUSED_ATTACH,
                method: "GET"
            },
            dispatch
        );

        if (code === 200) {
            return message as Array<IThreadAttach>;
        } else {
            const { enqueueSnackbar } = this.props;
            enqueueSnackbar(message, { variant: "error" });
        }

        return [];
    };

    state = {
        fid: "2",
        subject: "",
        message: "",
        attach: [] as Array<IThreadAttach>,
        editorState: BraftEditor.createEditorState("<div></div>"),
        isPost: false,

        timestamp: new Date().getTime(),
        activeButton: true,
        token: ""
    };

    handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            [key]: e.target.value
        });
    };
    handleContentChange = (editorState: any) => {
        this.setState({
            editorState,
            message: editorState.toHTML()
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
        const { dispatch, router } = this.props;
        const { fid, subject, message, attach, token } = this.state;
        try {
            const res = await requestCreateThread(fid, subject, message, this.processAttachForServer(attach), token, dispatch);
            const { code, message: responseMsg } = res;

            this.showSnackbar(res);
            if (code === 200) {
                const url = THREAD_INFO_RAW;
                const as = THREAD_INFO(responseMsg);
                router.push(url, as);
            }
        } finally {
            this.setState({
                timestamp: new Date().getTime()
            });
        }
    };
    editThread = async () => {
        const { router, dispatch } = this.props;
        const tid = router.query["tid"] as string;

        const { fid, subject, message, attach, token } = this.state;

        try {
            const res = await requestEditThread(tid, fid, subject, message, this.processAttachForServer(attach), token, dispatch);
            const { code } = res;

            this.showSnackbar(res);
            if (code === 200) {
                const url = THREAD_INFO_RAW;
                const as = THREAD_INFO(tid);
                router.push(url, as);
            }
        } finally {
            this.setState({
                timestamp: new Date().getTime()
            });
        }
    };
    createReply = async () => {
        const { router, dispatch } = this.props;
        const tid = router.query["tid"] as string;
        const quotepid = router.query["quotepid"] as string;
        const { message, token, attach } = this.state;
        try {
            const res = await requestReply(tid, message, this.processAttachForServer(attach), quotepid, token, dispatch);
            const { code } = res;

            this.showSnackbar(res);
            if (code === 200) {
                const url = THREAD_INFO_RAW;
                const as = THREAD_INFO(tid);
                router.push(url, as);
            }
        } finally {
            this.setState({
                timestamp: new Date().getTime()
            });
        }
    };
    editReply = async () => {
        const { router, dispatch } = this.props;
        const pid = router.query["pid"] as string;
        const { message, token, attach } = this.state;
        try {
            const res = await requestEditReply(pid, message, this.processAttachForServer(attach), token, dispatch);
            const { code, message: responseMsg } = res;

            this.showSnackbar(res);

            if (code === 200) {
                const url = THREAD_INFO_RAW;
                const as = THREAD_INFO(responseMsg);
                router.push(url, as);
            }
        } finally {
            this.setState({
                timestamp: new Date().getTime()
            });
        }
    };
    handleChangeToken = (token: string) => {
        this.setState({
            token
        });
    };
    handleSubmitClick = async () => {
        const { router } = this.props;
        this.setState({
            activeButton: false
        });

        try {
            switch (mapRouteToPageType[router.pathname]) {
                case IPostPageType.CREATE_THREAD:
                    await this.createThread();
                    break;
                case IPostPageType.EDIT_THREAD:
                    await this.editThread();
                    break;
                case IPostPageType.CREATE_REPLY:
                    await this.createReply();
                    break;
                case IPostPageType.EDIT_REPLY:
                    await this.editReply();
                    break;
            }
        } finally {
            this.setState({
                activeButton: true
            });
        }
    };
    renderEditor = () => {
        const { classes } = this.props;
        const { editorState } = this.state;
        const excludeControls: any = ["media", "clear"];

        return (
            <BraftEditor
                id="editor-with-code-highlighter"
                value={editorState}
                onChange={this.handleContentChange}
                className={classes["post-content"]}
                excludeControls={excludeControls}
            />
        );
    };
    renderAttach = () => {
        const handleRemove = async (item: IThreadAttach) => {
            const { dispatch } = this.props;

            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url: DELETE_ATTACH(item.aid),
                    method: "DELETE"
                },
                dispatch
            );
            if (code !== 200) {
                const { enqueueSnackbar } = this.props;
                enqueueSnackbar(message, { variant: "error" });
            }
        };
        const handleChange = (list: IThreadAttach[], _changedItem: IThreadAttach) => {
            this.setState({
                attach: list
            });
        };
        const handleInsertImage = (aid: string) => {
            const url = FETCH_PICTURE_ATTACH(aid);
            const insertHTML = `<img alt="${aid}_image" src="${url}"/><p></p>`;
            const { message } = this.state;

            this.setState({
                editorState: BraftEditor.createEditorState(message + insertHTML)
            });
        };

        const { attach } = this.state;
        const { classes } = this.props;
        return (
            <div className={classes["attach-container"]}>
                <Upload fileList={attach} onRemove={handleRemove} onChange={handleChange} onInsertImage={handleInsertImage} />
            </div>
        );
    };

    render() {
        const { classes, router, forum, isAdmin } = this.props;
        const { fid, subject: title, isPost, timestamp, activeButton } = this.state;
        const showTitle = mapPageTypeToTitle[mapRouteToPageType[router.pathname]];

        const renderForum = forum.filter(item => (!isAdmin && !item.adminPost) || isAdmin);
        return (
            <>
                <Head>
                    <title>
                        {TITLE_PREFIX}
                        {showTitle}
                    </title>
                    <link rel="stylesheet" href="/static/css/editor.css" />
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
                                {renderForum.map(item => (
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
                    <div className={classes["content-container"]}>{this.renderEditor()}</div>
                    {this.renderAttach()}
                    <div className={classes["btn-container"]}>
                        <Vaptcha onChangeToken={this.handleChangeToken} timestamp={timestamp} />
                        <Fab
                            variant="extended"
                            size="medium"
                            color="primary"
                            aria-label="add"
                            className={classes.button}
                            onClick={this.handleSubmitClick}
                            disabled={!activeButton}
                        >
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
