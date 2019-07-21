import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

import ThreadListComponent from "../../Components/ThreadList";
import { IThreadListItem } from "../../Typings";

import DefaultAvatar from "../../Styles/avatar.png";
interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

const fakeData: Array<IThreadListItem> = [
    {
        tid: "1",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "2",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "3",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "4",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "5",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "6",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    },
    {
        tid: "7",
        time: new Date(),
        title: "hzytql",
        username: "hzy",
        userAvatar: DefaultAvatar
    }
];

class Forum extends React.PureComponent<Props & RouteComponentProps> {
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

export default withStyles(styles)(Forum);
