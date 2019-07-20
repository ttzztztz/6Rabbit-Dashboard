import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (_: Theme) =>
    createStyles({
        "author-avatar": {
            marginRight: "16px"
        },
        "author-username": {
            marginRight: "12px"
        },
        "notification-item-container": {
            display: "flex",
            alignItems: "flex-start"
        },
        "notification-item-info": {
            color: "rgba(134, 142, 150, 0.8)",
            fontSize: "12px"
        },
        "content-unread": {
            fontWeight: 700
        },
        "unread-circle": {
            width: "12px",
            height: "12px",
            display: "inline-block",
            borderRadius: "6px",
            background: "linear-gradient(45deg, red, #ff3c3c63)",
            margin: "0 3px"
        }
    });

export default styles;
