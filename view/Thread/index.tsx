import React from "react";
import styles from "./style";
import clsx from "clsx";
import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import MessageIcon from "@material-ui/icons/Message";

import FrontendRequest from "../../model/FrontendRequest";
import Avatar from "../../components/Avatar";
import PostListItem from "../../components/PostListItem";
import PaginationComponent from "../../components/Pagination";
import { THREAD_INFO, THREAD_INFO_RAW } from "../../consts/routers";
import { TITLE_SUFFIX } from "../../consts";
import { IPostListItem, IExtendedNextPageContext, IThreadListItem, IThreadAttach } from "../../typings";
import { IGetThreadInfoStart, getThreadInfoStart } from "../../actions/async";
import { Epics } from "../../epics";
import { FETCH_THREAD, POST_REPLY_THREAD } from "../../consts/backend";

import { of, Subject } from "rxjs";
import { StateObservable, ActionsObservable } from "redux-observable";
import axios from "axios";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;
    tid: string;

    thread: IThreadListItem;
    firstPost: IPostListItem;
    needBuy: boolean;
    attachList: Array<IThreadAttach>;

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

        return { defaultPage: page, tid, ...payload.message, defaultRes: payload.message.postList };
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
        } = await axios({ url: FETCH_THREAD(tid, page.toString()) });
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

        const {
            data: { code, message }
        } = await FrontendRequest({ url: POST_REPLY_THREAD(tid), data: { message: reply, quotepid }, method: "POST" }).toPromise();

        if (code == 200) {
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
        const { classes, thread, firstPost } = this.props;
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
                        <Avatar src={"/static/avatar.png"} width={48} />
                    </div>
                    <div>
                        <Typography variant="h5" component="h3">
                            {thread.subject}
                        </Typography>
                        <Typography variant="body1" className={classes["second-info"]}>
                            <span className={classes["author-username"]}>{thread.user.username}</span>
                            <span>{new Date(thread.createDate).toLocaleString()}</span>
                        </Typography>
                    </div>
                </Paper>
                <Paper className={classes.paperRoot}>
                    <div id="content-container" dangerouslySetInnerHTML={{ __html: firstPost.message }} />
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
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleReply}>
                            <MessageIcon className={classes["reply-icon"]} />
                            回复
                        </Button>
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Thread));
