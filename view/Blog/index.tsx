import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../components/ThreadList";
import { IThreadListItem } from "../../typings";
import { TITLE_PREFIX } from "../../consts";

import { NextRouter, withRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;
}

class BlogList extends React.PureComponent<Props> {
    state = {
        total: 25,
        page: 1
    };

    componentDidMount() {
        const { router } = this.props;
        this.setState({
            page: Number.parseInt(router.query["page"] as string)
        });
    }

    handlePageChange = (page: number) => {};

    render() {
        const { total, page } = this.state;

        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}博客</title>
                </Head>
                <ThreadListComponent
                    threadList={[]}
                    total={total}
                    page={page}
                    onPageChange={this.handlePageChange}
                    showAvatar={false}
                />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(BlogList));
