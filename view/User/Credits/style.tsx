import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "list-root": {
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            "& li": {
                flexGrow: 1,
                [theme.breakpoints.up("md")]: {
                    width: "25% !important"
                }
            }
        },
        "credits-title": {
            margin: theme.spacing(4, 0, 0, 0),
            textAlign: "center",
            userSelect: "none"
        },
        "credits-container": {
            padding: theme.spacing(3, 0)
        },
        "credits-log-container": {
            width: "100%",
            overflowX: "auto"
        },
        "credits-log-table": {
            minWidth: "600px"
        }
    });

export default styles;
