import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        root: {
            padding: theme.spacing(3, 2)
        },
        "title-container": {
            textAlign: "center",
            userSelect: "none",
            margin: theme.spacing(3)
        },
        textField: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
            [theme.breakpoints.up("md")]: {
                width: "50%"
            },
            [theme.breakpoints.down("md")]: {
                width: "85%"
            }
        },
        "input-container": {
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap"
        },
        "btn-container": {
            display: "flex",
            justifyContent: "center",
            margin: theme.spacing(3)
        },
        button: {
            margin: theme.spacing(1)
        },
        activeButton: {
            width: "35%"
        }
    });

export default styles;
