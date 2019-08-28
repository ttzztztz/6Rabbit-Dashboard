import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import UserPostListItem from "../../containers/UserPostListItem";
import PaginationComponent from "../Pagination";
import { IUserPostItem } from "../../typings";

import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableFooter from "@material-ui/core/TableFooter";
import Paper from "@material-ui/core/Paper";
import clsx from "clsx";

interface Props extends WithStyles {
    postList: Array<IUserPostItem>;

    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

class UserPostList extends React.Component<Props> {
    render() {
        const { classes, postList, total, page, onPageChange } = this.props;

        return (
            <Paper className={clsx(classes.root, classes["not-show-outline"])}>
                <Table>
                    <TableBody>
                        {postList.map(item => (
                            <TableRow key={item.pid}>
                                <TableCell component="th" scope="row">
                                    <UserPostListItem {...item} showAvatar={true} />
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

export default withStyles(styles)(UserPostList);
