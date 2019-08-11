import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "user-infos-container": {
            margin: theme.spacing(2, 0, 2, 0)
        },
        "user-infos-content-container": {
            padding: theme.spacing(2, 1, 2, 1),
            [theme.breakpoints.up("md")]: {
                width: "70%",
                margin: "auto"
            }
        }
    });

export default styles;
