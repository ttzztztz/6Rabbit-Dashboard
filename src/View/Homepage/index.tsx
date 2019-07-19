import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";
import { RouteComponentProps } from "react-router";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

class Homepage extends React.Component<Props & RouteComponentProps> {
    render() {
        this.props.changeTitle("首页");
        return <></>;
    }
}

export default withStyles(styles)(Homepage);
