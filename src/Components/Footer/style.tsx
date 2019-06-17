import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        paper: {
            margin: theme.spacing(2),
            userSelect: "none"
        },
        "footer-right": {
            "& p": {
                margin: "0"
            },
            textAlign: "right"
        }
    });

export default styles;
