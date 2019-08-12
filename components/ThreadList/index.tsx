import React from "react";
import styles from "./style";
import clsx from "clsx";

import { WithStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";

import ThreadListItem from "../../containers/ThreadListItem";
import PaginationComponent from "../Pagination";
import { IThreadListItem } from "../../typings";
import ThreadAdminPanel from "../../containers/ThreadAdminPanel";

interface Props extends WithStyles {
    threadList: Array<IThreadListItem>;
    showAvatar?: boolean;
    showOutline?: boolean;
    isAdmin: boolean;
    canAdmin: boolean;

    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

class ThreadList extends React.Component<Props> {
    state = {
        checkedList: [] as Array<string>
    };
    handleCheckedChange = (tid: string, checked: boolean) => {
        const { checkedList: currentCheckedList } = this.state;
        if (checked === true) {
            this.setState({
                checkedList: [...new Set([...currentCheckedList, tid])]
            });
        } else {
            this.setState({
                checkedList: currentCheckedList.filter(item => item !== tid)
            });
        }
    };

    render() {
        const { classes, threadList, total, page, onPageChange, isAdmin } = this.props;
        const { checkedList } = this.state;
        const showAvatar = this.props.showAvatar === undefined ? true : this.props.showAvatar;
        const showOutline = this.props.showOutline === undefined ? true : this.props.showOutline;
        const canAdmin = this.props.canAdmin === undefined ? false : this.props.canAdmin;

        return (
            <Paper className={showOutline ? classes.root : clsx(classes.root, classes["not-show-outline"])}>
                <Table>
                    <TableBody>
                        {threadList.map(item => (
                            <TableRow key={item.tid}>
                                <TableCell component="th" scope="row">
                                    <ThreadListItem {...item} showAvatar={showAvatar} canAdmin={canAdmin} onChange={this.handleCheckedChange} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        {canAdmin && isAdmin && (
                            <TableRow>
                                <TableCell component="th" scope="row" className={classes["no-border-cell"]}>
                                    <ThreadAdminPanel target={checkedList} />
                                </TableCell>
                            </TableRow>
                        )}
                        <TableRow>
                            <TableCell component="th" scope="row" className={classes["no-border-cell"]}>
                                <PaginationComponent total={total} page={page} onPageChange={onPageChange} />
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(ThreadList);
