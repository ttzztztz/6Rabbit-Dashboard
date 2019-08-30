import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "admin-panel-container": {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(2, 0, 0, 0)
        },
        "operation-button": {
            [theme.breakpoints.down("sm")]: {
                padding: theme.spacing(0.5, 1)
            }
        }
    });

export default styles;
