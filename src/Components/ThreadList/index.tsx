import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListItem from "../../Containers/ThreadListItem";
import PaginationComponent from "../../Components/Pagination";
import { IThreadListItem } from "../../Typings";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";

interface Props extends WithStyles {
    threadList: Array<IThreadListItem>;

    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

class ThreadList extends React.Component<Props> {
    render() {
        const { classes, threadList, total, page, onPageChange } = this.props;
        return (
            <Paper className={classes.root}>
                <Table>
                    <TableBody>
                        {threadList.map(item => (
                            <TableRow key={item.tid}>
                                <TableCell component="th" scope="row">
                                    <ThreadListItem {...item} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell component="th" scope="row">
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
