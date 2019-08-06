import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "../Avatar";

import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

interface Props extends WithStyles {
    src: string;
    username: string;
}

class AvatarBoard extends React.PureComponent<Props> {
    render() {
        const { classes, src, username } = this.props;

        return (
            <Paper
                className={classes["board-container"]}
                style={{
                    background: `url(${src})`,
                    backgroundRepeat: "none",
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <div className={classes["board-blur-container"]}>
                    <div className={classes["board-info-container"]}>
                        <Avatar src={src} />
                        <Typography className={classes["board-shadow"]}>{username}</Typography>
                    </div>
                </div>
            </Paper>
        );
    }
}

export default withStyles(styles)(AvatarBoard);
