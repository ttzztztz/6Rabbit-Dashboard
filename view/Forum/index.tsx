import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../components/ThreadList";
import { IThreadListItem } from "../../typings";
import { withRouter, NextRouter } from "next/dist/client/router";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
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
        this.setState({
            page: Number.parseInt((this.props.match.params as { tid: string; page: string }).page)
        });
    }
    handlePageChange = (page: number) => {};

    render() {
        const { total, page } = this.state;
        this.props.changeTitle("讨论");
        return (
            <>
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
