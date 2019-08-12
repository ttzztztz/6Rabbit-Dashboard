import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../containers/ThreadList";
import { IThreadListItem, IExtendedNextPageContext } from "../../typings";
import { TITLE_PREFIX } from "../../consts";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";
import { BLOG_LIST_RAW, BLOG_LIST } from "../../consts/routers";
import { StateObservable, ActionsObservable } from "redux-observable";
import { Subject, of } from "rxjs";
import { Epics } from "../../epics";
import { getBlogListStart, IGetBlogListStart } from "../../actions/async";

interface Props extends WithStyles {
    router: NextRouter;

    threadList: Array<IThreadListItem>;
    page: number;
    total: number;
}

class BlogList extends React.PureComponent<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const page = query["page"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const {
            payload: { list, total }
        } = await Epics(of(getBlogListStart(page)) as ActionsObservable<IGetBlogListStart>, state$, {}).toPromise();

        return { threadList: list, page: Number.parseInt(page), total };
    }

    handlePageChange = (page: number) => {
        const url = BLOG_LIST_RAW;
        const as = BLOG_LIST(page.toString());
        this.props.router.push(url, as);
    };

    render() {
        const { threadList, total, page } = this.props;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}博客</title>
                </Head>
                <ThreadListComponent
                    threadList={threadList}
                    total={total}
                    page={page}
                    onPageChange={this.handlePageChange}
                    showAvatar={false}
                    canAdmin={true}
                />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(BlogList));
