import React from "react";
import styles from "./style";

import { of, Subject } from "rxjs";
import { StateObservable, ActionsObservable } from "redux-observable";

import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../containers/ThreadList";
import { IThreadListItem, IExtendedNextPageContext, IForumItem } from "../../typings";
import { TITLE_PREFIX } from "../../consts";
import { THREAD_LIST, THREAD_LIST_RAW } from "../../consts/routers";
import { Epics } from "../../epics";
import { getThreadListStart, IGetThreadListStart } from "../../actions/async";

import { withRouter, NextRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;

    threadList: Array<IThreadListItem>;
    page: number;
    total: number;
    fid: string;
    forum: IForumItem;
}

class Forum extends React.PureComponent<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const page = query["page"] as string;
        const fid = query["fid"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const {
            payload: { list, forum }
        } = await Epics(of(getThreadListStart(fid, page)) as ActionsObservable<IGetThreadListStart>, state$, {}).toPromise();

        return { threadList: list, page: Number.parseInt(page), total: forum.threads, fid, forum };
    }

    handlePageChange = (page: number) => {
        const { fid } = this.props;
        const url = THREAD_LIST_RAW;
        const as = THREAD_LIST(fid, page.toString());
        this.props.router.push(url, as);
    };

    render() {
        const { threadList, page, total, forum } = this.props;

        return (
            <>
                <Head>
                    <title>
                        {TITLE_PREFIX}
                        {forum.name}
                    </title>
                </Head>
                <ThreadListComponent threadList={threadList} total={total} page={page} onPageChange={this.handlePageChange} type={forum.type} canAdmin={true} />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Forum));
