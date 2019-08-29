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
            alignItems: "center"
        },
        secondaryHeading: {
            color: theme.palette.text.secondary
        },
        "detail-container": {
            display: "flex",
            justifyContent: "space-between"
        },
        icon: {
            fontSize: "16px",
            marginRight: theme.spacing(0.5)
        },
        button: {
            [theme.breakpoints.up("md")]: {
                margin: theme.spacing(1)
            }
        }
    });

export default styles;
