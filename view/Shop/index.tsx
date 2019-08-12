import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";

import { Subject, of } from "rxjs";
import { StateObservable, ActionsObservable } from "redux-observable";

import ThreadListComponent from "../../containers/ThreadList";
import { TITLE_PREFIX } from "../../consts";
import { getShopListStart, IGetShopListStart } from "../../actions/async";
import { IThreadListItem, IExtendedNextPageContext } from "../../typings";
import { Epics } from "../../epics";
import { BLOG_LIST_RAW, BLOG_LIST } from "../../consts/routers";

import Head from "next/head";
import { NextRouter } from "next/dist/client/router";

interface Props extends WithStyles {
    router: NextRouter;

    threadList: Array<IThreadListItem>;
    page: number;
    total: number;
}

class ShopList extends React.PureComponent<Props> {
    static async getInitialProps({ store, query }: IExtendedNextPageContext) {
        const page = query["page"] as string;

        const state$ = new StateObservable(new Subject(), store.getState());
        const {
            payload: { list, total }
        } = await Epics(of(getShopListStart(page)) as ActionsObservable<IGetShopListStart>, state$, {}).toPromise();

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
                    <title>{TITLE_PREFIX}商城</title>
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

export default withStyles(styles)(ShopList);
