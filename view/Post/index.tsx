import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import clsx from "clsx";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";

import { PostPageType, IForumItem } from "../../typings";
import { TITLE_PREFIX } from "../../consts";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

interface IMapRouteToPageType {
    [key: string]: number;
}
interface IMapPageTypeToTitle {
    [key: number]: string;
}

const mapPageTypeToTitle: IMapPageTypeToTitle = {
    [PostPageType.CREATE_THREAD]: "发表帖子",
    [PostPageType.CREATE_POST]: "发表回帖",
    [PostPageType.EDIT_THREAD]: "编辑帖子",
    [PostPageType.EDIT_POST]: "编辑回帖"
};
const mapRouteToPageType: IMapRouteToPageType = {
    "/thread/create": PostPageType.CREATE_THREAD,
    "/post/create": PostPageType.CREATE_POST,
    "/thread/update": PostPageType.EDIT_THREAD,
    "/post/update": PostPageType.EDIT_POST
};

interface Props extends WithStyles {
    router: NextRouter;

    forum: Array<IForumItem>;
}

class Post extends React.PureComponent<Props> {
    state = {
        fid: "2",
        title: "",
        content: ""
    };

    handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            [key]: e.target.value
        });
    };

    render() {
        const { classes, router, forum } = this.props;
        const { fid, title, content } = this.state;
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
                            onChange={this.handleChange("title")}
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
                            onChange={this.handleChange("content")}
                            className={clsx(classes.textField, classes["post-content"])}
                            margin="dense"
                            variant="outlined"
                        />
                    </div>
                    <div className={classes["attach-container"]} />
                    <div className={classes["btn-container"]}>
                        <Button variant="contained" color="primary" className={classes.button}>
                            {showTitle}
                        </Button>
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Post));
