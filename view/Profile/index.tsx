import React from "react";
import styles from "./style";

import ProfileThreadListComponent from "../../components/ProfileThreadList";
import ProfileDetailComponent from "./ProfileDetail";
import AvatarBoard from "../../components/AvatarBoard";
import { TITLE_PREFIX } from "../../consts";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import Head from "next/head";
import { withRouter, NextRouter } from "next/dist/client/router";

interface Props extends WithStyles {
    router: NextRouter;
}

class User extends React.PureComponent<Props> {
    state = {
        uid: "1",
        username: "22222",
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
                <Head>
                    <title>{TITLE_PREFIX}资料</title>
                </Head>
                <AvatarBoard src={"/static/avatar.png"} username="hzytql" />
                <Paper className={classes["user-infos-container"]}>
                    <Tabs
                        value={activeTab}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="资料" />
                        <Tab label="帖子" />
                    </Tabs>
                    {activeTab === 0 && <ProfileDetailComponent />}
                    {activeTab === 1 && <ProfileThreadListComponent prefix="Ta的" showPurchased={false} />}
                </Paper>
            </>
        );
    }
    componentDidMount() {
        const { router } = this.props;
        this.setState({
            uid: router.query["uid"] as string
        });
    }
}

export default withRouter(withStyles(styles)(User));
