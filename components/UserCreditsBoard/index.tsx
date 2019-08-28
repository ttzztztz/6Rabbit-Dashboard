import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Avatar from "@material-ui/core/Avatar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import RoomIcon from "@material-ui/icons/Room";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

import { IMyUserMiniInfo } from "../../typings";

interface Props extends WithStyles, IMyUserMiniInfo {
    autoFetchInfo?: boolean;

    getUserCreditsAndUsergroupStart: () => void;
}

class UserCreditsBoard extends React.PureComponent<Props> {
    componentDidMount() {
        const { autoFetchInfo, getUserCreditsAndUsergroupStart } = this.props;
        if (autoFetchInfo) {
            getUserCreditsAndUsergroupStart();
        }
    }
    render() {
        const {
            classes,
            usergroup: { name: groupName },
            credits,
            golds,
            rmbs
        } = this.props;

        return (
            <List className={classes["list-root"]}>
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <RoomIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="用户组" secondary={groupName} />
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
                    <ListItemText primary="人民币" secondary={(rmbs / 100.0).toFixed(2)} />
                </ListItem>
            </List>
        );
    }
}

export default withStyles(styles)(UserCreditsBoard);
