import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import AvatarBoard from "../../components/AvatarBoard";
import SettingsComponent from "../../containers/Settings";
import CreditsComponent from "../../containers/Credits";
import NotificationsComponent from "../../containers/Notifications";
import ProfileThreadListComponent from "../../containers/ProfileThreadList";
import { TITLE_PREFIX } from "../../consts";
import { USER_LOGIN, USER_NOTIFICATION_CENTER, USER_CREDITS } from "../../consts/routers";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";
import { IExtendedNextPageContext } from "../../typings";

interface Props extends WithStyles {
    username: string;
    uid: string;
    avatar: string;
    isLogin: boolean;

    router: NextRouter;
    defaultActiveTab: ActiveTab;
}

enum ActiveTab {
    Settings,
    Credits,
    Threads,
    Notification
}

class User extends React.PureComponent<Props> {
    static async getInitialProps({ query }: IExtendedNextPageContext) {
        const state = query["state"] as string | undefined;
        if (state) {
            if (state === "credits") {
                return { defaultActiveTab: ActiveTab.Credits };
            } else if (state === "notification") {
                return { defaultActiveTab: ActiveTab.Notification };
            }
        }
        return { defaultActiveTab: ActiveTab.Settings };
    }
    state = {
        activeTab: this.props.defaultActiveTab
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

        const handleRouteChangeStart = (url: string) => {
            if (url === USER_NOTIFICATION_CENTER) {
                this.setState({
                    activeTab: ActiveTab.Notification
                });
            } else if (url === USER_CREDITS) {
                this.setState({
                    activeTab: ActiveTab.Credits
                });
            }
        };
        router.events.on("routeChangeStart", handleRouteChangeStart);
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
                        <Tab label="积分" />
                        <Tab label="帖子" />
                        <Tab label="通知" />
                    </Tabs>
                    <div className={classes["user-infos-content-container"]}>
                        {activeTab === ActiveTab.Settings && <SettingsComponent />}
                        {activeTab === ActiveTab.Credits && <CreditsComponent />}
                        {activeTab === ActiveTab.Threads && <ProfileThreadListComponent prefix="我的" showPurchased={true} uid={uid} />}
                        {activeTab === ActiveTab.Notification && <NotificationsComponent />}
                    </div>
                </Paper>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(User));
