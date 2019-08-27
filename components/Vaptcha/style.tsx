import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (_: Theme) =>
    createStyles({
        "vaptcha-init-main": {
            display: "table",
            width: "100%",
            height: "100%",
            backgroundColor: "#EEEEEE"
        },
        "vaptcha-init-loading": {
            display: "table-cell",
            verticalAlign: "middle",
            textAlign: "center",
            "& > a": {
                display: "inline-block",
                width: "18px",
                height: "18px",
                border: "none"
            },
            "& > a img": {
                verticalAlign: "middle"
            },
            "& .vaptcha-text": {
                fontFamily: "sans-serif",
                fontSize: "12px",
                color: "#CCCCCC",
                verticalAlign: "middle"
            }
        }
    });

export default styles;
