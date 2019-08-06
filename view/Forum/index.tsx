import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../components/ThreadList";
import { IThreadListItem } from "../../typings";
import { TITLE_PREFIX } from "../../consts";

import { withRouter, NextRouter } from "next/dist/client/router";
import Head from "next/head";

interface Props extends WithStyles {
    router: NextRouter;
}

const fakeData: Array<IThreadListItem> = [
    {
        tid: "1",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "2",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "3",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "4",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "5",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "6",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    },
    {
        tid: "7",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: "/static/avatar.png"
    }
];

class Forum extends React.PureComponent<Props> {
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
                    <title>{TITLE_PREFIX}讨论</title>
                </Head>
                <ThreadListComponent
                    threadList={fakeData}
                    total={total}
                    page={page}
                    onPageChange={this.handlePageChange}
                />
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Forum));
