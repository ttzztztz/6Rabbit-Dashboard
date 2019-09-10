import React from "react";
import styles from "./style";
import { SnackbarProvider } from "notistack";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
import Avatar from "@material-ui/core/Avatar";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import LinearProgress from "@material-ui/core/LinearProgress";
import Fab from "@material-ui/core/Fab";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Subject";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MessageIcon from "@material-ui/icons/Message";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import SearchIcon from "@material-ui/icons/Search";
import ToggleOnIcon from "@material-ui/icons/ToggleOn";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { WithStyles, withStyles } from "@material-ui/core";

import Notifier from "../../containers/Notifier";
import Footer from "../Footer";
import {
    USER_LOGIN,
    USER_CENTER,
    HOMEPAGE,
    THREAD_LIST_RAW,
    THREAD_LIST,
    USER_REGISTER,
    USER_NOTIFICATION_CENTER,
    SEARCH_RAW,
    SEARCH,
    ADMIN
} from "../../consts/routers";

import Link from "next/link";
import { NextRouter, withRouter } from "next/dist/client/router";
import { FETCH_OAUTH_REDIRECT } from "../../consts/backend";

interface Props extends WithStyles {
    router: NextRouter;
    title: string;

    loading: boolean;
    isLogin: boolean;
    isAdmin: boolean;
    username: string;
    uid: string;
    avatar: string;
    unread: number;

    init: () => void;
    logout: () => void;
}

class Bar extends React.PureComponent<Props> {
    state = {
        openSidebar: false,
        anchorEl: null as null | HTMLElement,
        searchBoxInput: ""
    };

    handleDrawerOpen = () => {
        this.setState({
            openSidebar: true
        });
    };

    handleDrawerClose = () => {
        this.setState({
            openSidebar: false
        });
    };

    renderNavList = () => {
        const { isLogin, isAdmin } = this.props;
        const navItemList = [
            {
                icon: <HomeIcon />,
                title: "首页",
                router: HOMEPAGE,
                as: HOMEPAGE,
                requireAdmin: false
            },
            {
                icon: <SubjectIcon />,
                title: "博客",
                router: THREAD_LIST_RAW,
                as: THREAD_LIST("1"),
                requireAdmin: false
            },
            {
                icon: <MessageIcon />,
                title: "讨论",
                router: THREAD_LIST_RAW,
                as: THREAD_LIST("2"),
                requireAdmin: false
            },
            {
                icon: <ShoppingCartIcon />,
                title: "商城",
                router: THREAD_LIST_RAW,
                as: THREAD_LIST("3"),
                requireAdmin: false
            },
            {
                icon: <PersonIcon />,
                title: "用户",
                router: isLogin ? USER_CENTER : USER_LOGIN,
                as: isLogin ? USER_CENTER : USER_LOGIN,
                requireAdmin: false
            },
            {
                icon: <ToggleOnIcon />,
                title: "管理",
                router: ADMIN,
                as: ADMIN,
                requireAdmin: true
            }
        ];

        const renderedItemList = navItemList.filter(item => isAdmin || (!isAdmin && !item.requireAdmin));
        return (
            <>
                {renderedItemList.map((item, key) => (
                    <Link key={key} href={item.router} as={item.as}>
                        <ListItem button>
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.title} />
                        </ListItem>
                    </Link>
                ))}
            </>
        );
    };

    componentDidMount() {
        const { init } = this.props;
        init();
    }

    handleMenuClose = () => {
        this.setState({
            anchorEl: null
        });
    };
    handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        this.setState({
            anchorEl: event.currentTarget
        });
    };
    handleLogin = () => {
        this.handleMenuClose();
        const { router } = this.props;
        const url = USER_LOGIN;
        router.push(url, url);
    };
    handleLogout = () => {
        this.handleMenuClose();
        const { logout } = this.props;
        logout();
    };
    handleUserCenter = () => {
        this.handleMenuClose();
        const { router } = this.props;
        const url = USER_CENTER;
        router.push(url, url);
    };
    handleNotificationCenter = () => {
        this.handleMenuClose();
        const { router } = this.props;
        const url = USER_NOTIFICATION_CENTER;
        router.push(url, url);
    };
    handleRegister = () => {
        this.handleMenuClose();
        const { router } = this.props;
        const url = USER_REGISTER;
        router.push(url, url);
    };
    handleSearch = () => {
        const { searchBoxInput } = this.state;
        const { router } = this.props;
        const url = SEARCH_RAW;
        const as = SEARCH(searchBoxInput, "1");
        router.push(url, as);
    };
    handleSearchBoxKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { searchBoxInput } = this.state;
        if (event.keyCode === 13 && searchBoxInput.length >= 3) {
            this.handleSearch();
        }
    };
    handleSearchBoxChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        this.setState({
            searchBoxInput: event.target.value
        });
    };
    handleOAuthLogin = (key: string) => () => {
        window && window.location.replace(FETCH_OAUTH_REDIRECT(key));
    };

    renderMenu = () => {
        const { anchorEl } = this.state;
        const { isLogin } = this.props;

        return (
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={Boolean(anchorEl)}
                onClose={this.handleMenuClose}
            >
                {isLogin
                    ? [
                          <MenuItem onClick={this.handleUserCenter} key="user-center">
                              用户中心
                          </MenuItem>,
                          <MenuItem onClick={this.handleNotificationCenter} key="notification-center">
                              通知中心
                          </MenuItem>,
                          <MenuItem onClick={this.handleLogout} key="user-logout">
                              账号注销
                          </MenuItem>
                      ]
                    : [
                          <MenuItem onClick={this.handleLogin} key="user-login">
                              账号登录
                          </MenuItem>,
                          <MenuItem onClick={this.handleOAuthLogin("QQ")} key="user-login-qq">
                              QQ登录
                          </MenuItem>,
                          <MenuItem onClick={this.handleOAuthLogin("Github")} key="user-login-github">
                              Github登录
                          </MenuItem>,
                          <MenuItem onClick={this.handleRegister} key="user-logout">
                              账号注册
                          </MenuItem>
                      ]}
            </Menu>
        );
    };

    renderSearchBar = () => {
        const { classes } = this.props;
        const { searchBoxInput } = this.state;
        return (
            <div className={classes.search}>
                <div className={classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="搜索..."
                    classes={{
                        root: classes.inputRoot,
                        input: classes.inputInput
                    }}
                    onKeyDown={this.handleSearchBoxKeyDown}
                    onChange={this.handleSearchBoxChange}
                    value={searchBoxInput}
                />
            </div>
        );
    };

    render() {
        const {
            classes,
            title,
            loading,
            isLogin,
            unread,
            avatar,
            router: { pathname }
        } = this.props;
        const { openSidebar } = this.state;

        return (
            <SnackbarProvider
                maxSnack={5}
                classes={{
                    variantSuccess: classes.success,
                    variantError: classes.error,
                    variantWarning: classes.warning,
                    variantInfo: classes.info
                }}
            >
                <Notifier />
                <div className={classes.root}>
                    <CssBaseline />
                    <AppBar
                        position="fixed"
                        className={clsx(classes.appBar, {
                            [classes.appBarShift]: openSidebar
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: openSidebar
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap className={classes.title}>
                                {title}
                            </Typography>
                            {isLogin && pathname !== SEARCH_RAW && !openSidebar && this.renderSearchBar()}
                            <div className={classes.grow} />
                            <div>
                                <IconButton edge="end" color="inherit" onClick={this.handleMenuOpen}>
                                    <Badge badgeContent={unread} color="secondary">
                                        {isLogin ? <Avatar alt="avatar" src={avatar} className={classes.avatar} /> : <AccountCircle />}
                                    </Badge>
                                </IconButton>
                                {this.renderMenu()}
                            </div>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: openSidebar,
                            [classes.drawerClose]: !openSidebar
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: openSidebar,
                                [classes.drawerClose]: !openSidebar
                            })
                        }}
                        open={openSidebar}
                    >
                        <div className={classes.toolbar}>
                            <IconButton onClick={this.handleDrawerClose}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </div>
                        <Divider />
                        <List>{this.renderNavList()}</List>
                    </Drawer>
                    <main className={classes.content}>
                        <div className={classes["content-container"]}>
                            <div className={classes.toolbar} />
                            <div className={classes["content-children-container"]}>{this.props.children}</div>
                            <Footer />
                        </div>
                    </main>
                    {loading && <LinearProgress className={classes.progess} color="primary" />}
                    {isLogin && (
                        <Link href="/thread/create">
                            <div className={classes["post-btn-container"]}>
                                <Fab size="large" color="primary" className={classes["post-btn"]}>
                                    <AddIcon />
                                </Fab>
                            </div>
                        </Link>
                    )}
                </div>
            </SnackbarProvider>
        );
    }
}

export default withRouter(withStyles(styles)(Bar));
