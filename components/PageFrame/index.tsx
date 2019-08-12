import React from "react";
import styles from "./style";
import { SnackbarProvider } from "notistack";
import clsx from "clsx";

import Drawer from "@material-ui/core/Drawer";
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

import AddIcon from "@material-ui/icons/Add";
import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Subject";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MessageIcon from "@material-ui/icons/Message";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PersonIcon from "@material-ui/icons/Person";
import { WithStyles, withStyles } from "@material-ui/core";

import Notifier from "../../containers/Notifier";
import Footer from "../Footer";
import { USER_LOGIN, USER_CENTER, HOMEPAGE, BLOG_LIST_RAW, BLOG_LIST, SHOP_LIST_RAW, SHOP_LIST, FORUM_LIST_RAW, FORUM_LIST } from "../../consts/routers";

import Link from "next/link";

interface Props extends WithStyles {
    title: string;
    loading: boolean;
    isLogin: boolean;

    init: () => void;
}

class Bar extends React.PureComponent<Props> {
    navItemList = [
        {
            icon: <HomeIcon />,
            title: "首页",
            router: HOMEPAGE,
            as: HOMEPAGE
        },
        {
            icon: <SubjectIcon />,
            title: "博客",
            router: BLOG_LIST_RAW,
            as: BLOG_LIST("1")
        },
        {
            icon: <ShoppingCartIcon />,
            title: "商城",
            router: SHOP_LIST_RAW,
            as: SHOP_LIST("1")
        },
        {
            icon: <MessageIcon />,
            title: "讨论",
            router: FORUM_LIST_RAW,
            as: FORUM_LIST("1")
        },
        {
            icon: <PersonIcon />,
            title: "用户",
            router: this.props.isLogin ? USER_CENTER : USER_LOGIN,
            as: this.props.isLogin ? USER_CENTER : USER_LOGIN
        }
    ];

    state = {
        open: false
    };

    handleDrawerOpen = () => {
        this.setState({
            open: true
        });
    };

    handleDrawerClose = () => {
        this.setState({
            open: false
        });
    };

    renderNavList = () => {
        return (
            <>
                {this.navItemList.map((item, key) => (
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

    render() {
        const { classes, title, loading, isLogin } = this.props;
        const { open } = this.state;
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
                            [classes.appBarShift]: open
                        })}
                    >
                        <Toolbar>
                            <IconButton
                                color="inherit"
                                aria-label="Open drawer"
                                onClick={this.handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton, {
                                    [classes.hide]: open
                                })}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography variant="h6" noWrap>
                                {title}
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })
                        }}
                        open={open}
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
                        <div className={classes.toolbar} />
                        <div className={classes["content-children-container"]}>{this.props.children}</div>
                        <Footer />
                    </main>
                    {loading && <LinearProgress className={classes.progess} color="secondary" />}
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

export default withStyles(styles)(Bar);
