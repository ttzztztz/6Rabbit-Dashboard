import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../../Components/Avatar";
import { THREAD_INFO } from "../../Consts/routers";

import Typography from "@material-ui/core/Typography";
import { RouteComponentProps } from "react-router";

interface Props extends WithStyles {
    tid: string;
    title: string;
    username: string;
    time: Date;
    userAvatar: string;
}

class ThreadListItem extends React.PureComponent<Props & RouteComponentProps> {
    handleTitleClick = () => {
        const { tid } = this.props;
        this.props.history.push(THREAD_INFO(tid));
    };
    render() {
        const { classes, title, username, time, userAvatar } = this.props;

        return (
            <div className={classes["thread-list-item-container"]}>
                <div className={classes["thread-avatar"]}>
                    <Avatar src={userAvatar} width={48} />
                </div>
                <div>
                    <Typography
                        variant="h5"
                        component="h3"
                        className={classes["thread-list-item-title"]}
                        onClick={this.handleTitleClick}
                    >
                        {title}
                    </Typography>
                    <Typography variant="body1" className={classes["second-info"]}>
                        <span className={classes["author-username"]}>{username}</span>
                        <span>{time.toLocaleString()}</span>
                    </Typography>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ThreadListItem);
