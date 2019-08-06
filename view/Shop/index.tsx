import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

interface Props extends WithStyles {
    changeTitle: (title: string) => void;
}

class ShopList extends React.PureComponent<Props> {
    render() {
        this.props.changeTitle("商城");
        return <></>;
    }
}

export default withStyles(styles)(ShopList);
