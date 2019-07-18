import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";

import RoomIcon from "@material-ui/icons/Room";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

interface Props extends WithStyles {}

class Credits extends React.Component<Props> {
    state = {
        group: "Lv1",
        credits: 12,
        golds: 24,
        rmbs: 12
    };
    render() {
        const { classes } = this.props;
        const { group, credits, golds, rmbs } = this.state;
        return (
            <List className={classes["list-root"]}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <RoomIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="用户组" secondary={group} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="经验" secondary={credits.toString()} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <BeachAccessIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="金币" secondary={golds.toString()} />
                </ListItem>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <AttachMoneyIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="人民币" secondary={rmbs.toFixed(2)} />
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(Credits);
