import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import { VERIFY_CODE_VID } from "../../consts";

interface Props extends WithStyles {
    onChangeToken: (token: string) => void;
    timestamp: number;
    className?: string;
}

interface IVaptchaObj {
    listen: (event: string, callback: () => void) => void;
    getToken: () => string;
    reset: () => void;
    render: () => void;
    destroy: () => void;
}

interface IExtendedWindow extends Window {
    vaptcha: (options: {
        vid: string;
        type: string;
        container: string;
    }) => {
        then: (callback: (vaptchaObj: IVaptchaObj) => void) => void;
    };
}

class Vaptcha extends React.PureComponent<Props> {
    vaptchaObj: IVaptchaObj | null = null;
    currentTimestamp: number = this.props.timestamp;

    render() {
        const { classes, timestamp, className } = this.props;

        return (
            <div id="vaptcha-container" data-timestamp={timestamp.toString()} className={className}>
                <div className={classes["vaptcha-init-main"]}>
                    <div className={classes["vaptcha-init-loading"]}>
                        <a href="https://www.vaptcha.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://cdn.vaptcha.com/vaptcha-loading.gif" />
                        </a>
                        <span className={classes["vaptcha-text"]}>Vaptcha启动中...</span>
                    </div>
                </div>
            </div>
        );
    }

    componentDidUpdate() {
        const { timestamp: nowTimestamp } = this.props;

        if (this.vaptchaObj && nowTimestamp !== this.currentTimestamp) {
            this.currentTimestamp = nowTimestamp;
            this.vaptchaObj.reset();
        }
    }

    componentDidMount() {
        const { onChangeToken } = this.props;

        (window as IExtendedWindow)
            .vaptcha({
                vid: VERIFY_CODE_VID,
                type: "click",
                container: "#vaptcha-container"
            })
            .then((vaptchaObj: IVaptchaObj) => {
                this.vaptchaObj = vaptchaObj;
                vaptchaObj.listen("pass", () => {
                    onChangeToken(vaptchaObj.getToken());
                });

                vaptchaObj.listen("close", () => {
                    vaptchaObj.reset();
                });

                vaptchaObj.render();
            });
    }

    componentWillUnmount() {
        this.vaptchaObj && this.vaptchaObj.destroy();
    }
}

export default withStyles(styles)(Vaptcha);
