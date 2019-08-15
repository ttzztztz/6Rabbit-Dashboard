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
            fontSize: theme.typography.pxToRem(15),
            flexBasis: "33.33%",
            flexShrink: 0
        },
        secondaryHeading: {
            fontSize: theme.typography.pxToRem(15),
            color: theme.palette.text.secondary
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
        }
    });

export default styles;
