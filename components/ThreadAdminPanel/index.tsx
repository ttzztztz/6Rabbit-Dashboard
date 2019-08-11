import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

import clsx from "clsx";

interface Props extends WithStyles {
    isAdmin: boolean;
    target: Array<string>;

    deleteThreadStart: (list: Array<string>) => void;
    setCloseThreadStart: (list: Array<string>) => void;
    setDiamondThreadStart: (list: Array<string>) => void;
    setTopThreadStart: (list: Array<string>) => void;
}

class ThreadAdminPanel extends React.Component<Props> {
    handleDelete = () => {
        const { deleteThreadStart, target } = this.props;
        deleteThreadStart(target);
    };
    handleEdit = () => {};
    handleClose = () => {
        const { setCloseThreadStart, target } = this.props;
        setCloseThreadStart(target);
    };
    handleDiamond = () => {
        const { setDiamondThreadStart, target } = this.props;
        setDiamondThreadStart(target);
    };
    handleTop = () => {
        const { setTopThreadStart, target } = this.props;
        setTopThreadStart(target);
    };

    renderButton = () => {
        const { isAdmin } = this.props;
        const basicOperation = [
            <Button key="delete" onClick={this.handleDelete}>
                删帖
            </Button>,
            <Button key="edit" onClick={this.handleEdit}>
                编辑
            </Button>
        ];
        if (1 || isAdmin) {
            return [
                ...basicOperation,
                <Button key="close" onClick={this.handleClose}>
                    关闭
                </Button>,
                <Button key="diamond" onClick={this.handleDiamond}>
                    精华
                </Button>,
                <Button key="top" onClick={this.handleTop}>
                    置顶
                </Button>
            ];
        } else {
            return basicOperation;
        }
    };

    render() {
        const { classes } = this.props;

        return (
            <div className={classes["admin-panel-container"]}>
                <ButtonGroup color="primary">{this.renderButton()}</ButtonGroup>
            </div>
        );
    }
}

export default withStyles(styles)(ThreadAdminPanel);
