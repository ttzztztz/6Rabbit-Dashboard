import React from "react";
import styles from "./style";
import clsx from "clsx";
import { OptionsObject } from "notistack";
import { of, Subject } from "rxjs";
import { Dispatch } from "redux";
import { StateObservable, ActionsObservable } from "redux-observable";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Fab from "@material-ui/core/Fab";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import MessageIcon from "@material-ui/icons/Message";
import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachmentIcon from "@material-ui/icons/Attachment";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";

import Avatar from "../../components/Avatar";
import PostListItem from "../../containers/PostListItem";
import PaginationComponent from "../../components/Pagination";
import ThreadAdminPanel from "../../containers/ThreadAdminPanel";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { TITLE_SUFFIX } from "../../consts";
import { IPostListItem, IExtendedNextPageContext, IThreadAttach, IAttachPrefetchInfo, IForumItem, IThreadItem } from "../../typings";
import { IGetThreadInfoStart, getThreadInfoStart } from "../../actions/async";
import { Epics } from "../../epics";
import { FETCH_THREAD, FETCH_AVATAR, POST_FILE_DOWNLOAD, FETCH_ATTACH_PAY, FETCH_ATTACH_INFO } from "../../consts/backend";
import { requestReply } from "../../model/Post";
import FrontendRequestPromise from "../../model/FrontendRequestPromise";
import Vaptcha from "../../components/Vaptcha";
import renderCredits from "../../model/RenderCredits";

interface Props extends WithStyles {
    router: NextRouter;

    tid: string;
    isAdmin: boolean;

    thread: IThreadItem;
    firstPost: IPostListItem;
    attachList: Array<IThreadAttach>;

    uid: string;
    isLogin: boolean;

    defaultPage: number;
    defaultRes: Array<IPostListItem>;

    forum: Array<IForumItem>;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    dispatch: Dispatch;
}

class Thread extends React.Component<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const tid = query["tid"] as string;
        const page = query["page"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const { payload } = await Epics(of(getThreadInfoStart(tid, page)) as ActionsObservable<IGetThreadInfoStart>, state$, {}).toPromise();

        return { defaultPage: Number.parseInt(page), tid, ...payload, defaultRes: payload.postList };
    }

    componentDidMount() {
        const { defaultRes } = this.props;
        this.patchPostList(defaultRes);
    }

    state = {
        reply: "",
        quotepid: "0",

        postList: [] as Array<IPostListItem>,
        page: this.props.defaultPage,

        attachExpanded: false as boolean | string,
        payDialog: {
            open: false,
            data: "1",
            title: "",
            creditsType: 0,
            credits: 0
        },

        activePostBtn: true,
        timestamp: new Date().getTime(),
        token: ""
    };

    handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            reply: e.target.value
        });
    };

    onPageChange = async (page: number) => {
        const { router, dispatch } = this.props;
        const tid = router.query["tid"] as string;
        const url = THREAD_INFO_RAW;
        const as = THREAD_INFO(tid, page.toString());
        router.push(url, as, {
            shallow: true
        });
        this.setState({
            page: page
        });

        const {
            data: { message }
        } = await FrontendRequestPromise({ url: FETCH_THREAD(tid, page.toString()) }, dispatch);
        this.patchPostList(message.postList);
    };

    patchPostList = (postList: Array<IPostListItem>) => {
        this.setState({
            postList: postList
        });
    };

    handleReply = async () => {
        const { tid, enqueueSnackbar, dispatch } = this.props;
        const { reply, quotepid, page, token } = this.state;
        this.setState({
            activePostBtn: false
        });
        try {
            const { code, message } = await requestReply(tid, reply, quotepid, token, dispatch);
            if (code === 200) {
                enqueueSnackbar("回帖成功！", { variant: "success" });
                this.onPageChange(page);
                this.setState({
                    reply: "",
                    quotepid: "0"
                });
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
        } finally {
            this.setState({
                activePostBtn: true,
                timestamp: new Date().getTime()
            });
        }
    };

    handleExpandPanel = (panel: string) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
        this.setState({
            attachExpanded: isExpanded ? panel : false
        });
    };

    handleDownload = (item: IThreadAttach) => async () => {
        const attachNeedBuyPrefetch = async (aid: string) => {
            const { enqueueSnackbar, dispatch } = this.props;
            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url: FETCH_ATTACH_INFO(aid),
                    method: "GET"
                },
                dispatch
            );

            if (code === 200) {
                const { needBuy, attach } = message as IAttachPrefetchInfo;
                if (needBuy) {
                    this.setState({
                        payDialog: {
                            open: true,
                            title: item.originalName,
                            data: attach.aid,
                            creditsType: attach.creditsType,
                            credits: attach.credits
                        }
                    });
                }
                return needBuy;
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
            return false;
        };

        const { isLogin, enqueueSnackbar, uid, thread } = this.props;
        const { aid } = item;
        const token = localStorage.getItem("token");
        if (!isLogin || !token) {
            enqueueSnackbar("请先登录！", { variant: "warning" });
            return;
        }

        if (item.credits === 0 || item.creditsType === 0 || uid === thread.user.uid || !(await attachNeedBuyPrefetch(aid))) {
            this.startDownload(item.aid);
        }
    };

    startDownload = (aid: string) => {
        const token = localStorage.getItem("token");
        const tempForm = document.createElement("form");
        tempForm.action = POST_FILE_DOWNLOAD(aid);
        tempForm.target = "_blank";
        tempForm.method = "POST";
        tempForm.style.display = "none";

        const tokenElement = document.createElement("textarea");
        tokenElement.name = "token";
        tokenElement.value = token!;
        tempForm.appendChild(tokenElement);

        document.body.appendChild(tempForm);
        tempForm.submit();
        tempForm.remove();
    };

    renderPayDialog = () => {
        const {
            payDialog: { open, data, creditsType, credits, title }
        } = this.state;

        const handleDialogClose = () => {
            this.setState({
                payDialog: {
                    ...this.state.payDialog,
                    open: false
                }
            });
        };
        const handleConirmBtnClick = async () => {
            handleDialogClose();

            const { enqueueSnackbar, dispatch } = this.props;
            const url = FETCH_ATTACH_PAY(data);

            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url,
                    method: "GET"
                },
                dispatch
            );

            if (code === 200) {
                enqueueSnackbar("购买成功！", { variant: "success" });
                this.startDownload(data);
            } else {
                enqueueSnackbar(message, { variant: "warning" });
            }
        };

        return (
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请您先购买附件：【{title}】，您需要支付{renderCredits(creditsType, credits)}。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConirmBtnClick} color="primary">
                        确认购买
                    </Button>
                    <Button onClick={handleDialogClose} color="primary">
                        取消购买
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    renderReplyComponent = () => {
        const {
            isLogin,
            isAdmin,
            thread: { isClosed },
            classes
        } = this.props;
        const { reply, timestamp, activePostBtn } = this.state;

        const handleChangeToken = (token: string) => {
            this.setState({
                token
            });
        };

        if (!isLogin || (isLogin && isClosed && !isAdmin)) {
            return <></>;
        } else {
            return (
                <Paper className={classes.paperRoot}>
                    <TextField
                        id="reply-content"
                        label="发表回复"
                        multiline
                        fullWidth
                        value={reply}
                        onChange={this.handleChangeReply}
                        margin="dense"
                        variant="outlined"
                    />
                    <div className={classes["reply-container"]}>
                        <Vaptcha onChangeToken={handleChangeToken} timestamp={timestamp} />
                        <Fab variant="extended" size="medium" color="primary" className={classes.button} onClick={this.handleReply} disabled={!activePostBtn}>
                            <MessageIcon className={classes["icon"]} />
                            回复
                        </Fab>
                    </div>
                </Paper>
            );
        }
    };

    renderForumName = () => {
        const {
            thread: {
                forum: { fid }
            },
            forum
        } = this.props;
        const result = forum.filter(item => item.fid === fid);
        if (result.length === 1) {
            return <span>{result[0].name}</span>;
        } else {
            return <></>;
        }
    };

    render() {
        const { classes, isAdmin, uid, thread, firstPost, attachList } = this.props;
        const { postList, page, attachExpanded } = this.state;

        return (
            <>
                <Head>
                    <title>
                        {thread.subject}
                        {TITLE_SUFFIX}
                    </title>
                </Head>
                <Paper className={clsx(classes.paperRoot, classes["title-bar"])}>
                    <div className={classes["thread-avatar"]}>
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(thread.user.uid)} passHref>
                            <Avatar src={FETCH_AVATAR(thread.user.uid)} width={48} />
                        </Link>
                    </div>
                    <div>
                        <Typography variant="h5" component="h3" className={classes["thread-icon-container"]}>
                            {thread.diamond > 0 && <GradeIcon className={classes["thread-icon"]} />}
                            {thread.isTop && <ArrowUpwardIcon className={classes["thread-icon"]} />}
                            {thread.isClosed && <LockIcon className={classes["thread-icon"]} />}
                            {thread.subject}
                        </Typography>
                        <Typography variant="body1" className={classes["second-info"]}>
                            <Link href={USER_PROFILE_RAW} as={USER_PROFILE(thread.user.uid)} passHref>
                                <span className={clsx(classes["author-username"], classes["second-info-margin"])}>{thread.user.username}</span>
                            </Link>
                            <span className={classes["second-info-margin"]}>{new Date(thread.createDate).toLocaleString()}</span>
                            {this.renderForumName()}
                        </Typography>
                    </div>
                </Paper>
                <Paper className={classes.paperRoot}>
                    <div id="content-container" className="braft-output-content" dangerouslySetInnerHTML={{ __html: firstPost.message }} />
                    {(isAdmin || uid === thread.user.uid) && <ThreadAdminPanel target={[thread.tid]} />}
                </Paper>
                {attachList.length > 0 && this.renderPayDialog()}
                {attachList.length > 0 && (
                    <div className={classes["attach-list-container"]}>
                        {attachList.map(item => (
                            <ExpansionPanel expanded={attachExpanded === item.aid} onChange={this.handleExpandPanel(item.aid)} key={item.aid}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1bh-content" id="panel1bh-header">
                                    <Typography className={classes.heading}>
                                        <AttachmentIcon className={classes["attach-icon"]} />
                                        {item.originalName}
                                    </Typography>
                                    <Typography className={classes.secondaryHeading}>{(item.fileSize / 1024).toFixed(2)} KB</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails className={classes["detail-container"]}>
                                    <div className={classes["charge-container"]}>
                                        下载次数：{item.downloads}
                                        <br />
                                        上传时间：{new Date(item.createDate).toLocaleString()}
                                    </div>
                                    <div className={classes["btn-container"]}>
                                        <Fab variant="extended" size="medium" color="primary" className={classes.button} onClick={this.handleDownload(item)}>
                                            <ArrowDownwardIcon className={classes["icon"]} />
                                            下载
                                        </Fab>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        ))}
                    </div>
                )}
                {postList.length > 0 && (
                    <Paper className={classes.paperRoot}>
                        <Typography variant="body2" className={classes.strong}>
                            回复列表
                        </Typography>
                        <div className={classes["post-list-container"]}>
                            <Table>
                                <TableBody>
                                    {postList.map(item => (
                                        <TableRow key={item.pid}>
                                            <TableCell component="th" scope="row">
                                                <PostListItem {...item} />
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <PaginationComponent total={thread.posts} page={page} onPageChange={this.onPageChange} />
                        </div>
                    </Paper>
                )}
                {this.renderReplyComponent()}
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Thread));
