import "braft-editor/dist/index.css";
import React from "react";
import styles from "./style";

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
import FrontendRequest from "../../model/FrontendRequest";
import { FETCH_THREAD, FETCH_POST, FETCH_UNUSED_ATTACH, DELETE_ATTACH, FETCH_PICTURE_ATTACH } from "../../consts/backend";
import Upload from "../../containers/Upload";

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
    isAdmin: boolean;
}

class Post extends React.PureComponent<Props> {
    async componentDidMount() {
        const {
            router: { pathname, query }
        } = this.props;

        let message = "",
            fid = "2",
            subject = "";

        if (pathname === "/thread/create") {
            const attach = await this.fetchUnusedAttach();
            this.setState({
                attach
            });
        } else if (pathname === "/thread/update/[tid]") {
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
                FrontendRequest({
                    url: FETCH_THREAD(tid, "1"),
                    method: "GET"
                }).toPromise(),
                this.fetchUnusedAttach()
            ]);

            this.setState({
                attach: [...attach, ...attachList]
            });

            [subject, fid, message] = [currentSubject, currentFid, currentMessage];
        } else if (pathname === "/post/create/[tid]") {
            const urlMessage = query["message"] as string;
            if (urlMessage && typeof urlMessage === "string" && urlMessage.length >= 1) {
                message = urlMessage;
            }
        } else if (pathname === "/post/update/[pid]") {
            const pid = query["pid"] as string;
            const {
                data: {
                    message: { message: currentMessage }
                }
            } = await FrontendRequest({
                url: FETCH_POST(pid),
                method: "GET"
            }).toPromise();

            message = currentMessage;
        }

        this.setState({
            isPost: pathname === "/post/create/[tid]" || pathname === "/post/update/[pid]",
            message,
            fid,
            subject,
            editorState: BraftEditor.createEditorState(message)
        });
    }

    fetchUnusedAttach = async () => {
        const {
            data: { code, message }
        } = await FrontendRequest({
            url: FETCH_UNUSED_ATTACH,
            method: "GET"
        }).toPromise();

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
        editorState: BraftEditor.createEditorState("<p>Hello <b>World!</b></p>"),
        isPost: false
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
            const {
                data: { code, message }
            } = await FrontendRequest({
                url: DELETE_ATTACH(item.aid),
                method: "DELETE"
            }).toPromise();
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
        return <Upload fileList={attach} onRemove={handleRemove} onChange={handleChange} onInsertImage={handleInsertImage} />;
    };

    render() {
        const { classes, router, forum, isAdmin } = this.props;
        const { fid, subject: title, isPost } = this.state;
        const showTitle = mapPageTypeToTitle[mapRouteToPageType[router.pathname]];

        const renderForum = forum.filter(item => (!isAdmin && !item.adminPost) || isAdmin);
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
                    {!isPost && this.renderAttach()}
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
