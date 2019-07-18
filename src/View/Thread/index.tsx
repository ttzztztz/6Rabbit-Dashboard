import React from "react";
import styles from "./style";
import clsx from "clsx";

import Avatar from "../../Components/Avatar";
import DefaultAvatar from "../../Styles/avatar.png";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

interface Props extends WithStyles {}

class Thread extends React.Component<Props> {
    state = {
        title: "这是一个标题",
        content: "这是内容",
        time: new Date()
    };
    render() {
        const { classes } = this.props;
        const { title, content, time } = this.state;
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
                        <Typography variant="body1">{time.toLocaleString()}</Typography>
                    </div>
                </Paper>
                <Paper className={classes.paperRoot}>
                    <Typography variant="body1">{content}</Typography>
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(Thread);
