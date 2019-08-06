import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

class Homepage extends React.PureComponent<Props> {
    render() {
        this.props.changeTitle("首页");
        return <></>;
    }
}

export default withStyles(styles)(Homepage);
