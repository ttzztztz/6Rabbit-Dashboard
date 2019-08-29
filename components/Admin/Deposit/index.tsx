import React from "react";
import { Dispatch } from "redux";
import styles from "./style";

import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import { ICreditsLog } from "../../../typings";
import FrontendRequestPromise from "../../../model/FrontendRequestPromise";
import { OPTIONS_DEPOSIT_ADMIN } from "../../../consts/backend";
import renderCredits from "../../../model/RenderCredits";

interface Props extends WithStyles {
    dispatch: Dispatch;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
}

class Deposit extends React.Component<Props> {
    state = {
        list: [] as Array<ICreditsLog>
    };

    fetchList = async () => {
        const { dispatch, enqueueSnackbar } = this.props;

        const {
            data: { code, message }
        } = await FrontendRequestPromise(
            {
                url: OPTIONS_DEPOSIT_ADMIN,
                method: "GET"
            },
            dispatch
        );

        if (code === 200) {
            this.setState({
                list: message
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    removeOneFromList = (cid: string) => {
        const { list: oldList } = this.state;
        const newList = oldList.filter(item => item.cid !== cid);
        this.setState({
            list: newList
        });
    };
    executeOperation = (cid: string, status: 1 | -1) => async () => {
        const { dispatch, enqueueSnackbar } = this.props;

        const {
            data: { code, message }
        } = await FrontendRequestPromise(
            {
                url: OPTIONS_DEPOSIT_ADMIN,
                method: "POST",
                data: {
                    cid,
                    status
                }
            },
            dispatch
        );

        if (code === 200) {
            this.removeOneFromList(cid);
            enqueueSnackbar("操作成功！", { variant: "success" });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    componentDidMount() {
        this.fetchList();
    }
    render() {
        const { classes } = this.props;
        const { list } = this.state;

        return (
            <div className={classes["table-container"]}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>描述</TableCell>
                            <TableCell>时间</TableCell>
                            <TableCell>金额</TableCell>
                            <TableCell>操作</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {list.map(item => (
                            <TableRow key={item.cid}>
                                <TableCell component="th" scope="row">
                                    {item.description}
                                </TableCell>
                                <TableCell>{new Date(item.createDate).toLocaleString()}</TableCell>
                                <TableCell>{renderCredits(item.creditsType, item.credits)}</TableCell>
                                <TableCell>
                                    <ButtonGroup variant="contained" size="small" color="primary">
                                        <Button onClick={this.executeOperation(item.cid, 1)}>通过</Button>
                                        <Button onClick={this.executeOperation(item.cid, -1)}>拒绝</Button>
                                    </ButtonGroup>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        );
    }
}

export default withStyles(styles)(Deposit);
