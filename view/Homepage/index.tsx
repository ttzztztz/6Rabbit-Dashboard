import React from "react";
import styles from "./style";
import { TITLE_PREFIX } from "../../consts";

import { WithStyles, withStyles } from "@material-ui/core";
import Head from "next/head";

interface Props extends WithStyles {}

class Homepage extends React.PureComponent<Props> {
    render() {
        return (
            <>
                <Head>
                    <title>{TITLE_PREFIX}首页</title>
                </Head>
            </>
        );
    }
}

export default withStyles(styles)(Homepage);
