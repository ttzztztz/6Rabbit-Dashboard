import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListItem from "../ThreadListItem";
import PaginationComponent from "../Pagination";
import { IThreadListItem } from "../../typings";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

interface Props extends WithStyles {
    threadList: Array<IThreadListItem>;
    showAvatar?: boolean;
    showOutline?: boolean;

    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

class ThreadList extends React.Component<Props> {
    render() {
        const { classes, threadList, total, page, onPageChange } = this.props;
        const showAvatar = this.props.showAvatar === undefined ? true : this.props.showAvatar;
        const showOutline = this.props.showOutline === undefined ? true : this.props.showOutline;

        return (
            <Paper className={showOutline ? classes.root : clsx(classes.root, classes["not-show-outline"])}>
                <Table>
                    <TableBody>
                        {threadList.map(item => (
                            <TableRow key={item.tid}>
                                <TableCell component="th" scope="row">
                                    <ThreadListItem {...item} showAvatar={showAvatar} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
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
