import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "thread-list-item-container": {
            display: "flex"
        },
        "thread-avatar": {
            marginRight: "16px",
            cursor: "pointer"
        },
        "thread-list-item-title": {
            cursor: "pointer"
        },
        "author-username": {
            marginRight: "12px",
            cursor: "pointer"
        },
        "second-info": {
            color: "rgba(134, 142, 150, 0.8)",
            fontSize: "12px"
        },
        "thread-icon": {
            color: theme.palette.secondary.main
        },
        "thread-icon-container": {
            display: "flex",
            alignItems: "center"
        }
    });

export default styles;
