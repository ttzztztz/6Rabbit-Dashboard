import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        paperRoot: {
            padding: theme.spacing(2, 2),
            margin: theme.spacing(0, 0, 2, 0)
        },
        "title-bar": {
            display: "flex",
            alignItems: "flex-start"
        },
        "thread-avatar": {
            marginRight: "16px",
            cursor: "pointer"
        },
        "author-username": {
            cursor: "pointer"
        },
        "second-info-margin": {
            marginRight: "12px"
        },
        "second-info": {
            color: "rgba(134, 142, 150, 0.8)",
            fontSize: "12px"
        },
        strong: {
            fontWeight: 600
        },
        button: {
            [theme.breakpoints.up("md")]: {
                margin: theme.spacing(1)
            }
        },
        "reply-container": {
            display: "flex",
            justifyContent: "space-between"
        },
        "post-list-container": {
            margin: theme.spacing(1)
        },
        icon: {
            fontSize: "16px",
            marginRight: theme.spacing(0.5)
        },
        "thread-icon": {
            color: theme.palette.secondary.main
        },
        "thread-icon-container": {
            display: "flex",
            alignItems: "center"
        },
        "btn-container": {
            display: "flex",
            alignItems: "center"
        },
        "advanced-reply-btn": {
            [theme.breakpoints.down("sm")]: {
                display: "none"
            }
        },
        "reply-btn": {
            [theme.breakpoints.down("sm")]: {
                borderRight: "0 !important",
                borderRadius: "4px !important"
            }
        }
    });

export default styles;
