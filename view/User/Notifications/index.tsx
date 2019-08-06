import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableFooter from "@material-ui/core/TableFooter";

import NotificationItem from "../../../components/NotificationItem";
import PaginationComponent from "../../../components/Pagination";

import { INotificationItem } from "../../../typings";

interface Props extends WithStyles {}

const fakeData: Array<INotificationItem> = [
    {
        nid: "1",
        username: "hzytql",
        userAvatar: "/static/avatar.png",
        content: "洪志远太强啦",
        isRead: true,
        time: new Date()
    },
    {
        nid: "2",
        username: "hzytql",
        userAvatar: "/static/avatar.png",
        content: "洪志远太强啦",
        isRead: false,
        time: new Date()
    }
];

class Notifications extends React.PureComponent<Props> {
    state = {
        notificationList: fakeData,
        total: 35,
        page: 1
    };

    handlePageChange = (page: number) => {};

    render() {
        const { classes } = this.props;
        const { notificationList, total, page } = this.state;

        return (
            <div className={classes["notification-center-container"]}>
                <div className={classes["control-container"]}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        全部已读
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        删除全部
                    </Button>
                </div>
                <div className={classes["notification-container"]}>
                    <Table>
                        <TableBody>
                            {notificationList.map(item => (
                                <TableRow key={item.nid}>
                                    <TableCell scope="row">
                                        <NotificationItem {...item} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell scope="row">
                                    <PaginationComponent
                                        total={total}
                                        page={page}
                                        onPageChange={this.handlePageChange}
                                    />
                                </TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Notifications);
