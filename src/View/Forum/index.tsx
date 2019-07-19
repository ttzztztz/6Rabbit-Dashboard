import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../Components/ThreadList";
import { IThreadListItem } from "../../Typings";
import { RouteComponentProps } from "react-router";

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

class Forum extends React.Component<Props & RouteComponentProps> {
    render() {
        this.props.changeTitle("讨论");
        return (
            <>
                <ThreadListComponent threadList={fakeData} />
            </>
        );
    }
}

export default withStyles(styles)(Forum);
