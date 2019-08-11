import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import { ActionsObservable, StateObservable } from "redux-observable";
import { Subject, of } from "rxjs";

import Head from "next/head";
import { withRouter, NextRouter } from "next/dist/client/router";

import { IExtendedNextPageContext, IOtherUser } from "../../typings";
import { FETCH_AVATAR } from "../../consts/backend";
import { getUserProfileStart, IGetForumListStart, IGetUserProfileStart } from "../../actions/async";
import { Epics } from "../../epics";
import ProfileThreadListComponent from "../../containers/ProfileThreadList";
import AvatarBoard from "../../components/AvatarBoard";
import { TITLE_PREFIX } from "../../consts";

interface Props extends WithStyles {
    router: NextRouter;

    uid: string;
    info: IOtherUser;
}

class Profile extends React.PureComponent<Props> {
    static async getInitialProps({ query, store }: IExtendedNextPageContext) {
        const uid = query["uid"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const { payload } = await Epics(of(getUserProfileStart(uid)) as ActionsObservable<IGetUserProfileStart>, state$, {}).toPromise();
        return { uid, info: { ...payload } };
    }

    state = {
        activeTab: 0
    };

    handleTabChange = (_e: React.ChangeEvent<{}>, newValue: number) => {
        this.setState({
            activeTab: newValue
        });
    };

    render() {
        const {
            classes,
            uid,
            info: { username }
        } = this.props;
        const { activeTab } = this.state;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}资料</title>
                </Head>
                <AvatarBoard src={FETCH_AVATAR(uid)} username={username} />
                <Paper className={classes["user-infos-container"]}>
                    <Tabs value={activeTab} onChange={this.handleTabChange} indicatorColor="primary" textColor="primary" centered>
                        <Tab label="帖子" />
                    </Tabs>
                    {activeTab === 0 && <ProfileThreadListComponent prefix="Ta的" showPurchased={false} uid={uid} />}
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

export default withRouter(withStyles(styles)(Profile));
