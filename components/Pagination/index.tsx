import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import KeyboardArrowLeft from "@material-ui/icons/KeyboardArrowLeft";
import KeyboardArrowRight from "@material-ui/icons/KeyboardArrowRight";
import LastPageIcon from "@material-ui/icons/LastPage";

import { PAGESIZE } from "../../consts";

interface Props extends WithStyles {
    total: number;
    page: number;
    onPageChange: (page: number) => void;
}

class Pagination extends React.PureComponent<Props> {
    render() {
        const { classes, total, page, onPageChange } = this.props;
        const maxPage = Math.ceil(total / PAGESIZE);

        return (
            <div className={classes.root}>
                <div className={classes["page-show-text"]}>
                    {page} / {maxPage}
                </div>
                <IconButton onClick={() => onPageChange(1)} disabled={page === 1} aria-label="第一页">
                    <FirstPageIcon />
                </IconButton>
                <IconButton onClick={() => onPageChange(page - 1)} disabled={page === 1} aria-label="上一页">
                    <KeyboardArrowLeft />
                </IconButton>
                <IconButton onClick={() => onPageChange(page + 1)} disabled={page >= maxPage} aria-label="下一页">
                    <KeyboardArrowRight />
                </IconButton>
                <IconButton onClick={() => onPageChange(maxPage)} disabled={page >= maxPage} aria-label="最后一页">
                    <LastPageIcon />
                </IconButton>
            </div>
        );
    }
}

export default withStyles(styles)(Pagination);
