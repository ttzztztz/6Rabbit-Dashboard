import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListComponent from "../../Components/ThreadList";
import { IThreadListItem } from "../../Typings";

import DefaultAvatar from "../../Styles/avatar.png";
interface Props extends WithStyles {}

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

class Forum extends React.Component<Props> {
    render() {
        return (
            <>
                <ThreadListComponent threadList={fakeData} />
            </>
        );
    }
}

export default withStyles(styles)(Forum);
