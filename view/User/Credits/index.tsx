import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import PaginationComponent from "../../../components/Pagination";

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import RoomIcon from "@material-ui/icons/Room";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";

interface Props extends WithStyles {}

const fakeData = [
    {
        id: "1",
        title: "购买hzytql",
        time: new Date(),
        credits: "3 金币"
    },
    {
        id: "2",
        title: "购买hzytql",
        time: new Date(),
        credits: "3 金币"
    },
    {
        id: "3",
        title: "购买hzytql",
        time: new Date(),
        credits: "3 金币"
    }
];

class Credits extends React.PureComponent<Props> {
    state = {
        group: "Lv1",
        credits: 12,
        golds: 24,
        rmbs: 12,

        page: 1,
        total: 36
    };
    handlePageChange = (page: number) => {};
    render() {
        const { classes } = this.props;
        const { group, credits, golds, rmbs, page, total } = this.state;
        return (
            <div className={classes["credits-container"]}>
                <section id="basic-statics">
                    <List className={classes["list-root"]}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <RoomIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="用户组" secondary={group} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <WorkIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="经验" secondary={credits.toString()} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <BeachAccessIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="金币" secondary={golds.toString()} />
                        </ListItem>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar>
                                    <AttachMoneyIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary="人民币" secondary={rmbs.toFixed(2)} />
                        </ListItem>
                    </List>
                </section>
                <section id="record">
                    <Typography variant="h5" className={classes["credits-title"]}>
                        购买记录
                    </Typography>
                    <div className={classes["credits-log-container"]}>
                        <Table className={classes["credits-log-table"]}>
                            <TableHead>
                                <TableRow>
                                    <TableCell align="center">内容</TableCell>
                                    <TableCell align="center">时间</TableCell>
                                    <TableCell align="center">积分</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {fakeData.map(item => (
                                    <TableRow key={item.id}>
                                        <TableCell component="th" scope="row" align="center">
                                            {item.title}
                                        </TableCell>
                                        <TableCell align="center">{new Date(item.time).toLocaleString()}</TableCell>
                                        <TableCell align="center">{item.credits}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <PaginationComponent total={total} page={page} onPageChange={this.handlePageChange} />
                </section>
            </div>
        );
    }
}

export default withStyles(styles)(Credits);
