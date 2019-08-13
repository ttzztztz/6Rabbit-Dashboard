import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AvatarBoard from "../../components/AvatarBoard";
import SettingsComponent from "../../containers/Settings";
import NotificationsComponent from "../../containers/Notifications";
import ProfileThreadListComponent from "../../containers/ProfileThreadList";
import { TITLE_PREFIX } from "../../consts";
import { USER_LOGIN } from "../../consts/routers";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

interface Props extends WithStyles {
    username: string;
    uid: string;
    avatar: string;
    isLogin: boolean;

    router: NextRouter;
}

enum ActiveTab {
    Settings,
    Threads,
    Notification
}

class User extends React.PureComponent<Props> {
    state = {
        activeTab: ActiveTab.Settings
    };
    handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };

    componentDidMount() {
        const { router } = this.props;
        const state = router.query["state"] as string | undefined;
        if (state && state === "notification") {
            this.setState({
                activeTab: ActiveTab.Notification
            });
        }
    }

    componentDidUpdate() {
        const { isLogin, router } = this.props;
        if (!isLogin) {
            router.push(USER_LOGIN, USER_LOGIN);
        }
    }
    render() {
        const { classes, username, avatar, uid } = this.props;
        const { activeTab } = this.state;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}用户</title>
                </Head>
                <AvatarBoard src={avatar} username={username} />
                <Paper className={classes["user-infos-container"]}>
                    <Tabs value={activeTab} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="设置" />
                        <Tab label="帖子" />
                        <Tab label="通知" />
                    </Tabs>
                    <div className={classes["user-infos-content-container"]}>
                        {activeTab === ActiveTab.Settings && <SettingsComponent />}
                        {activeTab === ActiveTab.Threads && <ProfileThreadListComponent prefix="我的" showPurchased={true} uid={uid} />}
                        {activeTab === ActiveTab.Notification && <NotificationsComponent />}
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(User));
