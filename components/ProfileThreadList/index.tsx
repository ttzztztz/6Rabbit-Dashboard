import React from "react";
import styles from "./style";

import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";

import ThreadList from "../ThreadList";
import UserPostList from "../UserPostList";
import { IThreadListItem, IUserPostItem } from "../../typings";
import FrontendRequest from "../../model/FrontendRequest";
import { FETCH_USER_THREAD_LIST, FETCH_USER_POST_LIST, FETCH_AGGREGATE_PURCHASED_LIST } from "../../consts/backend";

interface Props extends WithStyles {
    showPurchased: boolean;
    prefix: string;
    uid: string;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
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
        threadList: [] as Array<IThreadListItem>,
        postList: [] as Array<IUserPostItem>,
        purchasedList: [] as Array<IThreadListItem>,

        page: 1,
        total: 0
    };
    fetchThreadList = async (page: number) => {
        const { uid, enqueueSnackbar } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequest({ url: FETCH_USER_THREAD_LIST(uid, page.toString()) }).toPromise();
        if (code === 200) {
            this.setState({
                total: message.threads,
                threadList: message.list
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    fetchPostList = async (page: number) => {
        const { uid, enqueueSnackbar } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequest({ url: FETCH_USER_POST_LIST(uid, page.toString()) }).toPromise();
        if (code === 200) {
            this.setState({
                total: message.posts,
                postList: message.list
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    fetchPurchasedList = async (page: number) => {
        const { enqueueSnackbar } = this.props;
        const {
            data: { code, message }
        } = await FrontendRequest({ url: FETCH_AGGREGATE_PURCHASED_LIST(page.toString()) }).toPromise();
        if (code === 200) {
            this.setState({
                total: message.count,
                purchasedList: message.list
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    renderThread = () => {
        const { page, total, threadList } = this.state;
        const handlePageChange = (page: number) => {
            this.setState({
                page
            });
            this.fetchThreadList(page);
        };
        return (
            <>
                <ThreadList page={page} total={total} onPageChange={handlePageChange} threadList={threadList} showOutline={false} />
            </>
        );
    };
    renderPost = () => {
        const { page, total, postList } = this.state;
        const handlePageChange = (page: number) => {
            this.setState({
                page
            });
            this.fetchPostList(page);
        };
        return (
            <>
                <UserPostList page={page} total={total} onPageChange={handlePageChange} postList={postList} />
            </>
        );
    };
    renderPurchased = () => {
        const { page, total, purchasedList } = this.state;
        const handlePageChange = (page: number) => {
            this.setState({
                page
            });
            this.fetchPurchasedList(page);
        };
        return (
            <>
                <ThreadList page={page} total={total} onPageChange={handlePageChange} threadList={purchasedList} showOutline={false} />
            </>
        );
    };
    handleMenuItemBtnClick = (activePage: number) => () => {
        this.setState({
            activePage: activePage,
            page: 1
        });

        if (activePage === 0) {
            this.fetchThreadList(1);
        } else if (activePage === 1) {
            this.fetchPostList(1);
        } else if (activePage === 2) {
            this.fetchPurchasedList(1);
        }
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
    componentDidMount() {
        this.fetchThreadList(1);
    }

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
                    <Menu anchorEl={menuAnchorElement} keepMounted open={Boolean(menuAnchorElement)} onClose={this.handleMenuClose}>
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
