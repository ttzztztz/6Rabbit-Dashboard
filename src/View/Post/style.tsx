import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2)
        },
        title: {
            userSelect: "none",
            margin: theme.spacing(0, 0, 2, 0)
        },
        button: {
            margin: theme.spacing(1)
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1)
        },
        "btn-container": {
            display: "flex",
            justifyContent: "flex-end",
            width: "99%"
        },
        "post-title": {
            [theme.breakpoints.up("sm")]: {
                width: "calc(98% - 16px - 30%)"
            },
            [theme.breakpoints.down("sm")]: {
                width: "98%"
            }
        },
        "post-forum": {
            [theme.breakpoints.up("sm")]: {
                width: "30%"
            },
            [theme.breakpoints.down("sm")]: {
                width: "98%"
            }
        },
        "post-content": {
            width: "98%"
        }
    });

export default styles;
