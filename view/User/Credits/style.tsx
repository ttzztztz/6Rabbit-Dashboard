import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (theme: Theme) =>
    createStyles({
        heading: {
            fontWeight: theme.typography.fontWeightRegular
        },
        "content-container": {
            margin: theme.spacing(2, 0)
        },
        formControl: {
            margin: theme.spacing(1)
        },
        group: {
            margin: theme.spacing(1, 0)
        },
        button: {
            margin: theme.spacing(1)
        },
        "detail-root": {
            display: "flex",
            flexFlow: "column nowrap"
        },
        "pay-subtitle": {
            margin: theme.spacing(1.5, 0)
        },
        "credits-log-container": {
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden"
        },
        "credits-log-table": {
            minWidth: "600px"
        },
        "qrcode-container": {
            "& img": {
                maxWidth: "100%"
            }
        }
    });

export default styles;
