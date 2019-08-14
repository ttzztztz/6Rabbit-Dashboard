import "braft-editor/dist/output.css";

import React from "react";
import styles from "./style";
import clsx from "clsx";
import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Fab from "@material-ui/core/Fab";

import MessageIcon from "@material-ui/icons/Message";
import LockIcon from "@material-ui/icons/Lock";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import GradeIcon from "@material-ui/icons/Grade";

import { of, Subject } from "rxjs";
import { StateObservable, ActionsObservable } from "redux-observable";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";
import Link from "next/link";

import FrontendRequest from "../../model/FrontendRequest";
import Avatar from "../../components/Avatar";
import PostListItem from "../../containers/PostListItem";
import PaginationComponent from "../../components/Pagination";
import ThreadAdminPanel from "../../containers/ThreadAdminPanel";
import { THREAD_INFO, THREAD_INFO_RAW, USER_PROFILE_RAW, USER_PROFILE } from "../../consts/routers";
import { TITLE_SUFFIX } from "../../consts";
import { IPostListItem, IExtendedNextPageContext, IThreadListItem, IThreadAttach } from "../../typings";
import { IGetThreadInfoStart, getThreadInfoStart } from "../../actions/async";
import { Epics } from "../../epics";
import { FETCH_THREAD, FETCH_AVATAR } from "../../consts/backend";
import { requestReply } from "../../model/Post";

interface Props extends WithStyles {
    router: NextRouter;

    tid: string;
    isAdmin: boolean;
    thread: IThreadListItem;
    firstPost: IPostListItem;
    needBuy: boolean;
    attachList: Array<IThreadAttach>;
    uid: string;

    defaultPage: number;
    defaultRes: Array<IPostListItem>;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class Thread extends React.Component<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const tid = query["tid"] as string;
        const page = query["page"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const { payload } = await Epics(of(getThreadInfoStart(tid, page)) as ActionsObservable<IGetThreadInfoStart>, state$, {}).toPromise();

        return { defaultPage: page, tid, ...payload, defaultRes: payload.postList };
    }

    state = {
        reply: "",
        quotepid: "0",

        postList: [] as Array<IPostListItem>,
        page: this.props.defaultPage
    };

    handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            reply: e.target.value
        });
    };

    onPageChange = async (page: number) => {
        const { router } = this.props;

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
        } = await FrontendRequest({ url: FETCH_THREAD(tid, page.toString()) }).toPromise();
        this.patchPostList(message.postList);
    };

    patchPostList = (postList: Array<IPostListItem>) => {
        this.setState({
            postList: postList
        });
    };

    handleReply = async () => {
        const { tid, enqueueSnackbar } = this.props;
        const { reply, quotepid, page } = this.state;

        const { code, message } = await requestReply(tid, reply, quotepid);
        if (code === 200) {
            enqueueSnackbar("回帖成功！", { variant: "success" });
            this.onPageChange(page);
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };

    componentDidMount() {
        const { defaultRes } = this.props;
        this.patchPostList(defaultRes);
    }

    render() {
        const { classes, thread, firstPost, isAdmin, uid } = this.props;
        const { postList, reply, page } = this.state;
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
                        <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                            <Avatar src={FETCH_AVATAR(uid)} width={48} />
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
                            <Link href={USER_PROFILE_RAW} as={USER_PROFILE(uid)} passHref>
                                <span className={classes["author-username"]}>{thread.user.username}</span>
                            </Link>
                            <span>{new Date(thread.createDate).toLocaleString()}</span>
                        </Typography>
                    </div>
                </Paper>
                <Paper className={classes.paperRoot}>
                    <div id="content-container" className="braft-output-content" dangerouslySetInnerHTML={{ __html: firstPost.message }} />
                    {(isAdmin || uid === thread.user.uid) && (
                        <>
                            <ThreadAdminPanel target={[thread.tid]} />
                        </>
                    )}
                </Paper>
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
                        <Fab variant="extended" size="medium" color="primary" aria-label="add" className={classes.button} onClick={this.handleReply}>
                            <MessageIcon className={classes["reply-icon"]} />
                            回复
                        </Fab>
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Thread));
