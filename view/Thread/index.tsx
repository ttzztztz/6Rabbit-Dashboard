import React from "react";
import styles from "./style";
import clsx from "clsx";
import { OptionsObject } from "notistack";
import { of, Subject } from "rxjs";
import { Dispatch } from "redux";
import { StateObservable, ActionsObservable } from "redux-observable";

import { WithStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import SnackbarContent from "@material-ui/core/SnackbarContent";

import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import MessageIcon from "@material-ui/icons/Message";
import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";

import Avatar from "../../components/Avatar";
import PostListItem from "../../containers/PostListItem";
import PaginationComponent from "../../components/Pagination";
import ThreadAdminPanel from "../../containers/ThreadAdminPanel";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE, THREAD_REPLY_RAW, THREAD_REPLY } from "../../consts/routers";
import { TITLE_SUFFIX } from "../../consts";
import { IPostListItem, IExtendedNextPageContext, IThreadAttach, IForumItem, IThreadItem } from "../../typings";
import { IGetThreadInfoStart, getThreadInfoStart } from "../../actions/async";
import { Epics } from "../../epics";
import { FETCH_THREAD, FETCH_AVATAR, MATCH_PICTURE_ATTACH_REGEXP } from "../../consts/backend";
import { requestReply } from "../../model/Post";
import FrontendRequestPromise from "../../model/FrontendRequestPromise";
import Vaptcha from "../../components/Vaptcha";
import AttachList from "../../containers/AttachList";

interface Props extends WithStyles {
    router: NextRouter;

    tid: string;
    isAdmin: boolean;

    thread: IThreadItem;
    firstPost: IPostListItem;
    defaultAttachList: Array<IThreadAttach>;

    uid: string;
    isLogin: boolean;

    defaultPage: number;
    defaultPostList: Array<IPostListItem>;

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

        return { defaultPage: Number.parseInt(page), tid, ...payload, defaultAttachList: payload.attachList, defaultPostList: payload.postList };
    }

    componentDidMount() {
        const { defaultPostList, defaultAttachList } = this.props;
        this.patchPostList(defaultPostList);

        const imgListAid = Array.from(document.querySelectorAll("#content-container img"))
            .map(item => (item.getAttribute("src") || "").match(MATCH_PICTURE_ATTACH_REGEXP))
            .filter(item => !!item)
            .map(item => item![1]);

        const realAttachList = defaultAttachList.filter(item => !imgListAid.includes(item.aid));
        this.setState({
            attachList: realAttachList
        });
    }

    state = {
        reply: "",
        quotepid: "0",
        quoteAuthorName: "",

        postList: [] as Array<IPostListItem>,
        attachList: [] as Array<IThreadAttach>,
        page: this.props.defaultPage,

        activePostBtn: true,
        timestamp: new Date().getTime(),
        token: ""
    };

    handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            reply: e.target.value
        });
    };
    handleQuote = (pid: string, quoteAuthorName: string) => {
        this.setState({
            quotepid: pid,
            quoteAuthorName
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
    handleCancelQuote = () => {
        this.setState({
            quotepid: "0"
        });
    };
    handleAdvancedReply = () => {
        const { router, tid } = this.props;
        const { quotepid } = this.state;

        const url = THREAD_REPLY_RAW;
        const asUrl = THREAD_REPLY(tid);

        if (quotepid !== "0") {
            router.push(url + "?quotepid=" + quotepid, asUrl + "?quotepid=" + quotepid);
        } else {
            router.push(url, asUrl);
        }
    };
    handleReply = async () => {
        const { tid, enqueueSnackbar, dispatch } = this.props;
        const { reply, quotepid, page, token } = this.state;
        this.setState({
            activePostBtn: false
        });

        try {
            const { code, message } = await requestReply(tid, reply, [], quotepid, token, dispatch);
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

    renderUndoQuote = () => {
        return (
            <Button color="secondary" size="small" onClick={this.handleCancelQuote}>
                撤销
            </Button>
        );
    };

    renderReplyComponent = () => {
        const {
            isLogin,
            isAdmin,
            thread: { isClosed },
            classes
        } = this.props;
        const { reply, timestamp, activePostBtn, quotepid, quoteAuthorName } = this.state;

        const quoteNoticeMessage = `您正在引用 ${quoteAuthorName} 的回帖。`;

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
                    {quotepid !== "0" && (
                        <div>
                            <SnackbarContent
                                className={clsx(classes.snackbar, classes["snackbar-success"])}
                                message={quoteNoticeMessage}
                                action={this.renderUndoQuote()}
                            />
                        </div>
                    )}
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
                        <ButtonGroup variant="contained" color="primary" className={classes.button}>
                            <Button onClick={this.handleReply} disabled={!activePostBtn} className={classes["reply-btn"]}>
                                <MessageIcon className={classes["icon"]} />
                                回复
                            </Button>
                            <Button color="primary" size="small" className={classes["advanced-reply-btn"]} onClick={this.handleAdvancedReply}>
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
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
        const { classes, isAdmin, uid, thread, firstPost } = this.props;
        const { postList, page, quotepid, attachList } = this.state;

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
                {attachList.length > 0 && <AttachList attachList={attachList} authorUid={thread.user.uid} />}
                {postList.length > 0 && (
                    <Paper className={classes.paperRoot}>
                        <Typography variant="body2" className={classes.strong}>
                            回复列表
                        </Typography>
                        <div className={classes["post-list-container"]}>
                            <Table className={classes["post-list-table"]}>
                                <TableBody>
                                    {postList.map(item => (
                                        <TableRow key={item.pid}>
                                            <TableCell component="th" scope="row">
                                                <PostListItem
                                                    {...item}
                                                    quotePost={this.handleQuote}
                                                    activePid={quotepid}
                                                    cancelQuote={this.handleCancelQuote}
                                                />
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
