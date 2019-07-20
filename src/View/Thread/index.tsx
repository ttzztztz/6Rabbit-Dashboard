import React from "react";
import styles from "./style";
import clsx from "clsx";
import { RouteComponentProps } from "react-router";
import { WithStyles, withStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import Avatar from "../../Components/Avatar";
import PostListItem from "../../Containers/PostListItem";
import DefaultAvatar from "../../Styles/avatar.png";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

const fakePostList = [
    {
        pid: "1",
        username: "hzytql",
        time: new Date(),
        userAvatar: DefaultAvatar,
        content: "hzytql!!!!!"
    },
    {
        pid: "2",
        username: "hzytql",
        time: new Date(),
        userAvatar: DefaultAvatar,
        content: "hzytql!!!!!"
    },
    {
        pid: "3",
        username: "hzytql",
        time: new Date(),
        userAvatar: DefaultAvatar,
        content: "hzytql!!!!!"
    }
];

class Thread extends React.Component<Props & RouteComponentProps> {
    state = {
        title: "这是一个标题",
        content: "这是内容",
        username: "hzytql",
        time: new Date(),
        postList: fakePostList,
        reply: ""
    };
    handleChangeReply = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({
            reply: e.target.value
        });
    };

    renderReplyComponent = () => {
        const { reply } = this.state;
        const { classes } = this.props;
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
                    <Button variant="contained" color="primary" className={classes.button}>
                        发表回复
                    </Button>
                </div>
            </Paper>
        );
    };

    render() {
        const { classes } = this.props;
        const { title, content, time, username, postList } = this.state;
        this.props.changeTitle(title);
        return (
            <>
                <Paper className={clsx(classes.paperRoot, classes["title-bar"])}>
                    <div className={classes["thread-avatar"]}>
                        <Avatar src={DefaultAvatar} width={48} />
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
                    <Typography variant="body1">{content}</Typography>
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
                    </div>
                </Paper>
                {this.renderReplyComponent()}
            </>
        );
    }
}

export default withStyles(styles)(Thread);
