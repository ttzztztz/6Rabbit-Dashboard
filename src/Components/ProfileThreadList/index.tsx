import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import ThreadList from "../ThreadList";

interface Props extends WithStyles {
    showPurchased: boolean;
    prefix: string;
}

enum ActivePage {
    THREAD,
    POST,
    PURCHASED
}

const mapActivePageToTitle = ["帖子", "回帖", "已购"];

class ProfileThreadList extends React.PureComponent<Props> {
    state = {
        activePage: 0,
        menuAnchorElement: null,
        threadList: [],
        postList: [],
        purchasedList: [],

        page: 1,
        total: 50
    };

    renderThread = () => {
        const { page, total, threadList } = this.state;
        const handlePageChange = () => {};
        return (
            <>
                <ThreadList
                    showAvatar={false}
                    page={page}
                    total={total}
                    onPageChange={handlePageChange}
                    threadList={threadList}
                    showOutline={false}
                />
            </>
        );
    };
    renderPost = () => {
        return <></>;
    };
    renderPurchased = () => {
        return <></>;
    };
    handleMenuItemBtnClick = (activePage: number) => () => {
        this.setState({
            activePage: activePage,
            page: 1
        });
        this.handleMenuClose();
    };
    handleMenuClose = () => {
        this.setState({
            menuAnchorElement: null
        });
    };
    handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        this.setState({
            menuAnchorElement: event.currentTarget
        });
    };

    render() {
        const { classes, showPurchased, prefix } = this.props;
        const { activePage, menuAnchorElement } = this.state;

        return (
            <div className={classes["profile-thread-list-container"]}>
                <div id="title-container" className={classes["title"]}>
                    <Button aria-haspopup="true" onClick={this.handleMenuClick}>
                        <Typography variant="h5">
                            {prefix}
                            {mapActivePageToTitle[activePage]}
                        </Typography>
                    </Button>
                    <Menu
                        anchorEl={menuAnchorElement}
                        keepMounted
                        open={Boolean(menuAnchorElement)}
                        onClose={this.handleMenuClose}
                    >
                        <MenuItem onClick={this.handleMenuItemBtnClick(0)}>{prefix}帖子</MenuItem>
                        <MenuItem onClick={this.handleMenuItemBtnClick(1)}>{prefix}回帖</MenuItem>
                        {showPurchased && <MenuItem onClick={this.handleMenuItemBtnClick(2)}>{prefix}已购</MenuItem>}
                    </Menu>
                </div>
                <div id="active-page-container">
                    {activePage === ActivePage.THREAD && this.renderThread()}
                    {activePage === ActivePage.POST && this.renderPost()}
                    {activePage === ActivePage.PURCHASED && this.renderPurchased()}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(ProfileThreadList);
