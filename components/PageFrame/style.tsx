import { createStyles } from "@material-ui/core/styles";
import { dangerColor, infoColor, successColor, warningColor } from "../../styles/Color";
import { fade, Theme } from "@material-ui/core/styles";

const drawerWidth = 160;

const styles = (theme: Theme) =>
    createStyles({
        root: {
            display: "flex",
            maxWidth: "100%"
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create("all", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            backdropFilter: "saturate(180%) blur(20px)",
            backgroundColor: theme.palette.primary.main + "cc",
            "&:hover": {
                backgroundColor: theme.palette.primary.main
            }
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(["width", "margin"], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        menuButton: {
            marginRight: 36
        },
        hide: {
            display: "none"
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: "nowrap"
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create("width", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: "hidden",
            width: theme.spacing(7) + 1,
            [theme.breakpoints.down("sm")]: {
                width: "1px"
            }
        },
        toolbar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            padding: "0 8px",
            ...theme.mixins.toolbar
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
            maxWidth: "100%",
            position: "relative",
            [theme.breakpoints.down("sm")]: {
                minWidth: "99.5%"
            }
        },
        "content-children-container": {
            minHeight: "600px"
        },
        progess: {
            width: "100%",
            position: "fixed",
            zIndex: 1200,
            [theme.breakpoints.up("xs")]: {
                top: "64px"
            },
            [theme.breakpoints.down("xs")]: {
                top: "56px"
            }
        },
        "post-btn": {
            transition:
                "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms,border 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            backgroundColor: theme.palette.primary.main + "BB",
            backdropFilter: "saturate(180%) blur(20px)"
        },
        "post-btn-container": {
            transition: "all 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
            position: "fixed",
            right: "40px",
            bottom: "40px",
            zIndex: 1200
        },
        success: { backgroundColor: successColor + "CC" },
        error: { backgroundColor: dangerColor + "CC" },
        warning: { backgroundColor: warningColor + "CC" },
        info: { backgroundColor: infoColor + "CC" },
        grow: {
            flexGrow: 1
        },
        searchIcon: {
            width: theme.spacing(7),
            height: "100%",
            position: "absolute",
            pointerEvents: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
        },
        inputRoot: {
            color: "inherit"
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create("width"),
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                width: 120,
                "&:focus": {
                    width: 200
                }
            }
        },
        search: {
            position: "relative",
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            "&:hover": {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginRight: theme.spacing(2),
            marginLeft: 0,
            width: "100%",
            [theme.breakpoints.up("sm")]: {
                marginLeft: theme.spacing(3),
                width: "auto"
            }
        },
        title: {
            userSelect: "none",
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        },
        avatar: {
            width: "32px",
            height: "32px"
        }
    });

export default styles;
