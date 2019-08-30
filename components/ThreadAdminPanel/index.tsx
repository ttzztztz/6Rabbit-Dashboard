import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

import { withRouter, NextRouter } from "next/dist/client/router";

import { THREAD_UPDATE_RAW, THREAD_UPDATE } from "../../consts/routers";

interface Props extends WithStyles {
    router: NextRouter;
    isAdmin: boolean;
    target: Array<string>;

    deleteThreadStart: (list: Array<string>) => void;
    setCloseThreadStart: (list: Array<string>, payload: number) => void;
    setDiamondThreadStart: (list: Array<string>, payload: number) => void;
    setTopThreadStart: (list: Array<string>, payload: number) => void;
}

type ActionType = "删除" | "置顶" | "精华" | "关闭";

class ThreadAdminPanel extends React.Component<Props> {
    state = {
        openDialog: false,
        action: "删除" as ActionType
    };

    handleDelete = () => {
        const { deleteThreadStart, target } = this.props;
        deleteThreadStart(target);
    };
    handleEdit = () => {
        const { router, target } = this.props;
        const [tid] = target;

        const url = THREAD_UPDATE_RAW;
        const as = THREAD_UPDATE(tid);
        router.push(url, as);
    };
    handleClose = (payload: number) => {
        const { setCloseThreadStart, target } = this.props;
        setCloseThreadStart(target, payload);
    };
    handleDiamond = (payload: number) => {
        const { setDiamondThreadStart, target } = this.props;
        setDiamondThreadStart(target, payload);
    };
    handleTop = (payload: number) => {
        const { setTopThreadStart, target } = this.props;
        setTopThreadStart(target, payload);
    };

    renderButton = () => {
        const { isAdmin, target, classes } = this.props;
        const basicOperation = [
            <Button key="delete" onClick={() => this.handleDialogOpen("删除")} className={classes["operation-button"]}>
                删帖
            </Button>
        ];
        if (target.length === 1) {
            basicOperation.push(
                <Button key="edit" onClick={this.handleEdit} className={classes["operation-button"]}>
                    编辑
                </Button>
            );
        }

        if (isAdmin) {
            return [
                ...basicOperation,
                <Button key="close" onClick={() => this.handleDialogOpen("关闭")} className={classes["operation-button"]}>
                    关闭
                </Button>,
                <Button key="diamond" onClick={() => this.handleDialogOpen("精华")} className={classes["operation-button"]}>
                    精华
                </Button>,
                <Button key="top" onClick={() => this.handleDialogOpen("置顶")} className={classes["operation-button"]}>
                    置顶
                </Button>
            ];
        } else {
            return basicOperation;
        }
    };
    handleDialogClose = () => {
        this.setState({
            openDialog: false
        });
    };
    handleDialogOpen = (action: ActionType) => {
        this.setState({
            openDialog: true,
            action
        });
    };
    applyCancelAction = () => {
        const { action } = this.state;
        switch (action) {
            case "关闭":
                this.handleClose(0);
                break;
            case "精华":
                this.handleDiamond(0);
                break;
            case "置顶":
                this.handleTop(0);
                break;
        }
    };
    applyConfirmAction = () => {
        const { action } = this.state;
        switch (action) {
            case "关闭":
                this.handleClose(1);
                break;
            case "精华":
                this.handleDiamond(1);
                break;
            case "置顶":
                this.handleTop(1);
                break;
            case "删除":
                this.handleDelete();
                break;
        }
    };
    handleCancelBtnClick = () => {
        this.handleDialogClose();
        this.applyCancelAction();
    };
    handleConfirmBtnClick = () => {
        this.handleDialogClose();
        this.applyConfirmAction();
    };
    handleGlobalTopConfirmBtnClick = () => {
        this.handleDialogClose();
        this.handleTop(2);
    };

    render() {
        const { classes, target } = this.props;
        const { openDialog, action } = this.state;
        if (target.length === 0) {
            return <></>;
        } else {
            return (
                <div className={classes["admin-panel-container"]}>
                    <ButtonGroup color="primary">{this.renderButton()}</ButtonGroup>
                    <Dialog open={openDialog} onClose={this.handleDialogClose}>
                        <DialogTitle>操作确认</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                你即将操作
                                {target.length.toString()}个主题。
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {action === "置顶" ? (
                                [
                                    <Button onClick={this.handleConfirmBtnClick} color="primary" autoFocus key="current">
                                        本版{action}
                                    </Button>,
                                    <Button onClick={this.handleGlobalTopConfirmBtnClick} color="primary" key="global">
                                        全局{action}
                                    </Button>
                                ]
                            ) : (
                                <Button onClick={this.handleConfirmBtnClick} color="primary" autoFocus>
                                    设置{action}
                                </Button>
                            )}
                            <Button onClick={this.handleCancelBtnClick} color="primary">
                                取消{action}
                            </Button>
                        </DialogActions>
                    </Dialog>
                </div>
            );
        }
    }
}

export default withRouter(withStyles(styles)(ThreadAdminPanel));
