import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import DefaultAvatar from "../../Styles/avatar.png";
import AvatarBoard from "../../Components/AvatarBoard";

import CreditsComponent from "./Credits";
import SettingsComponent from "./Settings";
import NotificationsComponent from "./Notifications";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

interface Props extends WithStyles {}

class Profile extends React.Component<Props> {
    state = {
        activeTab: 0
    };
    handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };
    render() {
        const { classes } = this.props;
        const { activeTab } = this.state;
        return (
            <>
                <AvatarBoard src={DefaultAvatar} username="hzytql" />
                <Paper className={classes["user-infos-container"]}>
                    <Tabs
                        value={activeTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="积分" />
                        <Tab label="帖子" />
                        <Tab label="回帖" />
                        <Tab label="通知" />
                        <Tab label="设置" />
                    </Tabs>
                    {activeTab === 0 && <CreditsComponent />}
                    {activeTab === 1 && <CreditsComponent />}
                    {activeTab === 2 && <CreditsComponent />}
                    {activeTab === 3 && <NotificationsComponent />}
                    {activeTab === 4 && <SettingsComponent />}
                </Paper>
            </>
        );
    }
}

export default withStyles(styles)(Profile);
