import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        "upload-container": {
            margin: theme.spacing(0.5, 0)
        },
        "upload-list": {
            margin: theme.spacing(1, 0)
        },
        heading: {
            flexGrow: 2,
            display: "flex",
            alignItems: "center"
        },
        secondaryHeading: {
            color: theme.palette.text.secondary,
            flexGrow: 1
        },
        "charge-container": {
            flexGrow: 1
        },
        "charge-field": {
            width: "200px",
            marginRight: "6px"
        },
        menu: {
            width: "200px"
        },
        "delete-btn-container": {
            display: "flex",
            alignItems: "center"
        },
        none: {
            display: "none"
        },
        "detail-container": {
            display: "flex",
            justifyContent: "space-between"
        },
        "attach-icon": {
            marginRight: theme.spacing(0.5)
        }
    });

export default styles;
