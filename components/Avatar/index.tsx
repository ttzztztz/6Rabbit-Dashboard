import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

interface Props extends WithStyles {
    url?: string;
    src: string;
    width?: number;
}

class Avatar extends React.PureComponent<Props> {
    renderImg = () => {
        const { src, classes } = this.props;
        const imgWidth = this.props.width ? this.props.width : 64;
        const imgBorderRadius = imgWidth / 2;

        return (
            <img
                src={src}
                className={classes["avatar-img"]}
                style={{
                    width: imgWidth.toString() + "px",
                    height: imgWidth.toString() + "px",
                    borderRadius: imgBorderRadius.toString() + "px"
                }}
            />
        );
    };

    renderImgWrap = () => {
        const { url } = this.props;

        if (url) {
            return (
                <a href={url} target="_blank" rel="noopener noreferrer">
                    {this.renderImg()}
                </a>
            );
        } else {
            return this.renderImg();
        }
    };

    render() {
        const { classes } = this.props;

        return <div className={classes["avatar-container"]}>{this.renderImgWrap()}</div>;
    }
}

export default withStyles(styles)(Avatar);
