import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "post-avatar": {
            marginRight: "16px",
            cursor: "pointer"
        },
        "action-btn": {
            marginRight: "12px",
            cursor: "pointer"
        },
        "post-list-item-container": {
            display: "flex",
            alignItems: "flex-start"
        },
        "post-list-item-info": {
            color: "rgba(134, 142, 150, 0.8)",
            fontSize: "12px"
        },
        "post-content-container": {
            flexGrow: 1
        },
        "quote-container": {
            margin: theme.spacing(2, 0)
        },
        secondaryHeading: {
            color: theme.palette.text.secondary,
            [theme.breakpoints.down("sm")]: {
                display: "none"
            },
            wordBreak: "break-all"
        },
        heading: {
            flexGrow: 2,
            display: "flex",
            alignItems: "center",
            wordBreak: "break-all"
        }
    });

export default styles;
