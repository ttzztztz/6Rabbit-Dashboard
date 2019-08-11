import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (_theme: Theme) =>
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
        "message-container": {
            maxHeight: "200px",
            overflow: "hidden",
            position: "relative",
            "&:before": {
                background: "linear-gradient(180deg,hsla(0,0%,100%,0) 0,#fff)",
                content: '" "',
                top: "120px",
                height: "70px",
                position: "absolute",
                width: "100%"
            }
        }
    });

export default styles;
