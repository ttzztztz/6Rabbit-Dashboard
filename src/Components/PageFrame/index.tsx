import React from "react";

import Avatar from "@material-ui/core/Avatar";
import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import HomeIcon from "@material-ui/icons/Home";
import SubjectIcon from "@material-ui/icons/Subject";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import MessageIcon from "@material-ui/icons/Message";
import PersonIcon from "@material-ui/icons/Person";

import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

interface Props extends WithStyles {
    title: string;
}

class Bar extends React.PureComponent<Props> {
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
        const { classes } = this.props;
        const navItemList = [
            {
                icon: <HomeIcon />,
                title: "首页",
                router: "/"
            },
            {
                icon: <SubjectIcon />,
                title: "文章",
                router: "/blog"
            },
            {
                icon: <ShoppingCartIcon />,
                title: "商城",
                router: "/shop"
            },
            {
                icon: <MessageIcon />,
                title: "讨论",
                router: "/discuss"
            },
            {
                icon: <PersonIcon />,
                title: "用户",
                router: "/user"
            }
        ];

        return (
            <>
                {navItemList.map((item, key) => (
                    <ListItem button key={key}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                    </ListItem>
                ))}
            </>
        );
    };

    render() {
        const { classes, title } = this.props;
        const { open } = this.state;
        return (
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
                    {this.props.children}
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Bar);
