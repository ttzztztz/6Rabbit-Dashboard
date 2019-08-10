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
import { NotificationStore } from "../../../reducers/notification";

interface Props extends WithStyles, NotificationStore {
    notificationReadAllStart: () => void;
    notificationDeleteAllStart: () => void;
    notificationDeleteOneStart: (nid: string) => void;
    notificationReadOneStart: (nid: string) => void;
    notificationChangePageStart: (page: string) => void;
}

class Notifications extends React.PureComponent<Props> {
    handlePageChange = (page: number) => {
        const { notificationChangePageStart } = this.props;
        notificationChangePageStart(page.toString());
    };
    componentDidMount() {
        const { notificationChangePageStart } = this.props;
        notificationChangePageStart("1");
    }
    handleReadAll = () => {
        const { notificationReadAllStart } = this.props;
        notificationReadAllStart();
    };
    handleDeleteAll = () => {
        const { notificationDeleteAllStart } = this.props;
        notificationDeleteAllStart();
    };
    handleDeleteOne = (nid: string) => {
        const { notificationDeleteOneStart } = this.props;
        notificationDeleteOneStart(nid);
    };
    handleReadOne = (nid: string) => {
        const { notificationReadOneStart } = this.props;
        notificationReadOneStart(nid);
    };
    render() {
        const { classes, list, total, page } = this.props;

        return (
            <div className={classes["notification-center-container"]}>
                {total > 0 && (
                    <div className={classes["control-container"]}>
                        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleReadAll}>
                            全部已读
                        </Button>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={this.handleDeleteAll}>
                            删除全部
                        </Button>
                    </div>
                )}
                <div className={classes["notification-container"]}>
                    <Table>
                        <TableBody>
                            {list.map(item => (
                                <TableRow key={item.nid}>
                                    <TableCell scope="row">
                                        <NotificationItem {...item} handleDelete={this.handleDeleteOne} handleRead={this.handleReadOne} />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow>
                                <TableCell scope="row" className={classes["no-border-cell"]}>
                                    <PaginationComponent total={total} page={page} onPageChange={this.handlePageChange} />
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
