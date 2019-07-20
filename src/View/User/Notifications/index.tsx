import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";

interface Props extends WithStyles {}

class Notifications extends React.Component<Props> {
    render() {
        const { classes } = this.props;

        return (
            <div className={classes["notification-center-container"]}>
                <Typography variant="h5" className={classes["title"]}>
                    通知中心
                </Typography>
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
