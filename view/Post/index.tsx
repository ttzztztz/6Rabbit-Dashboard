import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { OptionsObject } from "notistack";
import { IPostPageType, IForumItem, IThreadAttachForm, IGeneralResponse } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { requestCreateThread, requestEditReply, requestEditThread, requestReply } from "../../model/Post";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

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
    "/post/create": IPostPageType.CREATE_REPLY,
    "/thread/update": IPostPageType.EDIT_THREAD,
    "/post/update": IPostPageType.EDIT_REPLY
};

interface Props extends WithStyles {
    router: NextRouter;

    forum: Array<IForumItem>;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class Post extends React.PureComponent<Props> {
    state = {
        fid: "2",
        subject: "",
        message: "",
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

        if (code == 200) {
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
        const { classes, router, forum } = this.props;
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
                    <div className={classes["title-container"]}>
                        <TextField
                            id="forum"
                            select
                            label="板块"
                            className={clsx(classes.textField, classes["post-forum"])}
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
                            className={clsx(classes.textField, classes["post-title"])}
                            value={title}
                            onChange={this.handleChange("subject")}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className={classes["content-container"]}>
                        <TextField
                            id="content"
                            label="帖子内容"
                            multiline
                            rows="25"
                            value={content}
                            onChange={this.handleChange("message")}
                            className={clsx(classes.textField, classes["post-content"])}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className={classes["attach-container"]} />
                    <div className={classes["btn-container"]}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitClick}>
                            {showTitle}
                        </Button>
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Post));
