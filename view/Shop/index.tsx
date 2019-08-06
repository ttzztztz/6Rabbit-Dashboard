import React from "react";
import styles from "./style";

import { WithStyles, withStyles } from "@material-ui/core";

import { TITLE_PREFIX } from "../../consts";
import Head from "next/head";

interface Props extends WithStyles {}

class ShopList extends React.PureComponent<Props> {
    render() {
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}商城</title>
                </Head>
            </>
        );
    }
}

export default withStyles(styles)(ShopList);
