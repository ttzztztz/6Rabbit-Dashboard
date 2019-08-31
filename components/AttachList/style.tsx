import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "attach-list-container": {
            margin: theme.spacing(2, 0)
        },
        "attach-icon": {
            marginRight: theme.spacing(0.5)
        },
        heading: {
            flexGrow: 2,
            display: "flex",
            alignItems: "center",
            wordBreak: "break-all"
        },
        secondaryHeading: {
            color: theme.palette.text.secondary,
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
            wordBreak: "break-all"
        },
        "detail-container": {
            display: "flex",
            justifyContent: "space-between",
            [theme.breakpoints.down("sm")]: {
                flexWrap: "wrap",
                justifyContent: "center"
            }
        },
        icon: {
            fontSize: "16px",
            marginRight: theme.spacing(0.5)
        },
        button: {
            [theme.breakpoints.up("sm")]: {
                margin: theme.spacing(1)
            }
        }
    });

export default styles;
