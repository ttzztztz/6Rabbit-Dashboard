import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import ThreadListItem from "../../Containers/ThreadListItem";
import { IThreadListItem } from "../../Typings";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Paper from "@material-ui/core/Paper";

interface Props extends WithStyles {
    threadList: Array<IThreadListItem>;
}

class ThreadList extends React.Component<Props> {
    render() {
        const { classes, threadList } = this.props;
        return (
            <Paper className={classes.root}>
                <Table className={classes.table}>
                    <TableBody>
                        {threadList.map(item => (
                            <TableRow key={item.tid}>
                                <TableCell component="th" scope="row">
                                    <ThreadListItem {...item} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        );
    }
}

export default withStyles(styles)(ThreadList);
