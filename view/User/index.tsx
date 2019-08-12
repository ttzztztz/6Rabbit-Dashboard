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

class User extends React.PureComponent<Props> {
    state = {
        activeTab: 0
    };
    handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };

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
                        {activeTab === 0 && <SettingsComponent />}
                        {activeTab === 1 && <ProfileThreadListComponent prefix="我的" showPurchased={true} uid={uid} />}
                        {activeTab === 2 && <NotificationsComponent />}
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(User));
