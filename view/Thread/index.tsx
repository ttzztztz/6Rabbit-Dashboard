import React from "react";
import styles from "./style";
import clsx from "clsx";

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

import Avatar from "../../components/Avatar";
import PostListItem from "../../components/PostListItem";
import PaginationComponent from "../../components/Pagination";
import { THREAD_INFO, THREAD_INFO_RAW } from "../../consts/routers";
import { TITLE_PREFIX } from "../../consts";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;
}

const fakePostList = [
    {
        pid: "1",
        username: "hzytql",
        time: new Date(),
        userAvatar: "/static/avatar.png",
        content: "hzytql!!!!!"
    },
    {
        pid: "2",
        username: "hzytql",
        time: new Date(),
        userAvatar: "/static/avatar.png",
        content: "hzytql!!!!!"
    },
    {
        pid: "3",
        username: "hzytql",
        time: new Date(),
        userAvatar: "/static/avatar.png",
        content: "hzytql!!!!!"
    }
];

class Thread extends React.Component<Props> {
    state = {
        title: "这是一个标题",
        content: "这是内容",
        username: "hzytql",
        time: new Date(),
        postList: fakePostList,
        reply: "",

        total: 30,
        page: 1
    };
    handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            reply: e.target.value
        });
    };
    onPageChange = (page: number) => {
        const { router } = this.props;

        const tid = router.query["tid"] as string;

        const url = THREAD_INFO_RAW;
        const as = THREAD_INFO(tid, page.toString());
        router.push(url, as);
        this.setState({
            page: page
        });
    };

    componentDidMount() {
        const { router } = this.props;

        this.setState({
            page: Number.parseInt(router.query["page"] as string)
        });
    }

    render() {
        const { classes } = this.props;
        const { title, content, time, username, postList, reply, total, page } = this.state;
        return (
            <>
                <Head>
                    <title>
                        {TITLE_PREFIX}
                        {title}
                    </title>
                </Head>
                <Paper className={clsx(classes.paperRoot, classes["title-bar"])}>
                    <div className={classes["thread-avatar"]}>
                        <Avatar src={"/static/avatar.png"} width={48} />
                    </div>
                    <div>
                        <Typography variant="h5" component="h3">
                            {title}
                        </Typography>
                        <Typography variant="body1" className={classes["second-info"]}>
                            <span className={classes["author-username"]}>{username}</span>
                            <span>{time.toLocaleString()}</span>
                        </Typography>
                    </div>
                </Paper>
                <Paper className={classes.paperRoot}>
                    <div id="content-container" dangerouslySetInnerHTML={{ __html: content }} />
                </Paper>
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
                        <PaginationComponent total={total} page={page} onPageChange={this.onPageChange} />
                    </div>
                </Paper>
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
                        <Button variant="contained" color="primary" className={classes.button}>
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
