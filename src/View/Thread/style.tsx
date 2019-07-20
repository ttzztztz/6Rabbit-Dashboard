import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        paperRoot: {
            padding: theme.spacing(2, 2),
            margin: theme.spacing(0, 0, 2, 0)
        },
        "title-bar": {
            display: "flex",
            alignItems: "flex-start"
        },
        "thread-avatar": {
            marginRight: "16px"
        },
        "author-username": {
            marginRight: "12px"
        },
        "second-info": {
            color: "rgba(134, 142, 150, 0.8)",
            fontSize: "12px"
        },
        strong: {
            fontWeight: 600
        },
        button: {
            margin: theme.spacing(1)
        },
        "reply-container": {
            display: "flex",
            justifyContent: "flex-end"
        },
        "post-list-container": {
            margin: theme.spacing(1)
        }
    });

export default styles;
