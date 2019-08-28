import React from "react";
import styles from "./style";
import { StateObservable, ActionsObservable } from "redux-observable";
import { Subject, of } from "rxjs";

import { WithStyles, withStyles } from "@material-ui/core";

import Head from "next/head";
import { NextRouter, withRouter } from "next/dist/client/router";

import ThreadListComponent from "../../containers/ThreadList";
import { IThreadListItem, IExtendedNextPageContext } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { Epics } from "../../epics";
import { getThreadListStart, IGetThreadListStart } from "../../actions/async";

interface Props extends WithStyles {
    router: NextRouter;

    threadList: Array<IThreadListItem>;
    page: number;
    total: number;
}

class Homepage extends React.PureComponent<Props> {
    static async getInitialProps({ store }: IExtendedNextPageContext) {
        const state$ = new StateObservable(new Subject(), store.getState());
        const {
            payload: { list, total }
        } = await Epics(of(getThreadListStart("new", "1")) as ActionsObservable<IGetThreadListStart>, state$, {}).toPromise();
        return { threadList: list, page: 1, total };
    }

    render() {
        const { threadList, page, total } = this.props;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}首页</title>
                </Head>
                <ThreadListComponent threadList={threadList} total={total} page={page} type="normal" canAdmin={true} showForumName={true} />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Homepage));
