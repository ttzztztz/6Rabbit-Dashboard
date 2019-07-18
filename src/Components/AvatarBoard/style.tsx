import { createStyles } from "@material-ui/core/styles";
import { Theme } from "@material-ui/core/styles/createMuiTheme";

const styles = (_theme: Theme) =>
    createStyles({
        "board-container": {
            height: "144px",
            userSelect: "none"
        },
        "board-info-container": {
            textAlign: "center"
        },
        "board-blur-container": {
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backdropFilter: "blur(60px)",
            "-webkit-backdrop-filter": "blur(60px)"
        },
        "board-shadow": {
            color: "#FFF",
            textShadow: "0 0px 5px #000"
        }
    });

export default styles;
