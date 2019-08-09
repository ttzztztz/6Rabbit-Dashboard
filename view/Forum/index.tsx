import React from "react";
import styles from "./style";

import { of, Subject } from "rxjs";
import { StateObservable, ActionsObservable } from "redux-observable";

import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../components/ThreadList";
import { IThreadListItem, IExtendedNextPageContext } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { FORUM_LIST_RAW, FORUM_LIST } from "../../consts/routers";
import { Epics } from "../../epics";
import { getForumListStart, IGetForumListStart } from "../../actions/async";

import { withRouter, NextRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;

    threadList: Array<IThreadListItem>;
    page: number;
    total: number;
}

class Forum extends React.PureComponent<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const page = query["page"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const {
            payload: { list, total }
        } = await Epics(of(getForumListStart(page)) as ActionsObservable<IGetForumListStart>, state$, {}).toPromise();

        return { threadList: list, page: Number.parseInt(page), total };
    }

    handlePageChange = (page: number) => {
        const url = FORUM_LIST_RAW;
        const as = FORUM_LIST(page.toString());
        this.props.router.push(url, as);
    };

    render() {
        const { threadList, page, total } = this.props;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}讨论</title>
                </Head>
                <ThreadListComponent threadList={threadList} total={total} page={page} onPageChange={this.handlePageChange} />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Forum));
