import React from "react";
import styles from "./style";
import { Dispatch } from "redux";
import { OptionsObject } from "notistack";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Fab from "@material-ui/core/Fab";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachmentIcon from "@material-ui/icons/Attachment";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";

import { IThreadAttach, IAttachPrefetchInfo, IThreadItem } from "../../typings";
import FrontendRequestPromise from "../../model/FrontendRequestPromise";
import { FETCH_ATTACH_INFO, POST_FILE_DOWNLOAD, FETCH_ATTACH_PAY } from "../../consts/backend";
import renderCredits from "../../model/RenderCredits";

interface Props extends WithStyles {
    attachList: Array<IThreadAttach>;

    isLogin: boolean;
    uid: string;
    authorUid: string;
    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    dispatch: Dispatch;
}

class AttachList extends React.PureComponent<Props> {
    state = {
        attachExpanded: false as boolean | string,
        payDialog: {
            open: false,
            data: "1",
            title: "",
            creditsType: 0,
            credits: 0
        }
    };

    handleExpandPanel = (panel: string) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
        this.setState({
            attachExpanded: isExpanded ? panel : false
        });
    };

    handleDownload = (item: IThreadAttach) => async () => {
        const attachNeedBuyPrefetch = async (aid: string) => {
            const { enqueueSnackbar, dispatch } = this.props;
            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url: FETCH_ATTACH_INFO(aid),
                    method: "GET"
                },
                dispatch
            );

            if (code === 200) {
                const { needBuy, attach } = message as IAttachPrefetchInfo;
                if (needBuy) {
                    this.setState({
                        payDialog: {
                            open: true,
                            title: item.originalName,
                            data: attach.aid,
                            creditsType: attach.creditsType,
                            credits: attach.credits
                        }
                    });
                }
                return needBuy;
            } else {
                enqueueSnackbar(message, { variant: "error" });
            }
            return false;
        };

        const { isLogin, enqueueSnackbar, uid, authorUid } = this.props;
        const { aid } = item;
        const token = localStorage.getItem("token");
        if (!isLogin || !token) {
            enqueueSnackbar("请先登录！", { variant: "warning" });
            return;
        }

        if (item.credits === 0 || item.creditsType === 0 || uid === authorUid || !(await attachNeedBuyPrefetch(aid))) {
            this.startDownload(item.aid);
        }
    };

    startDownload = (aid: string) => {
        const token = localStorage.getItem("token");
        const tempForm = document.createElement("form");
        tempForm.action = POST_FILE_DOWNLOAD(aid);
        tempForm.target = "_blank";
        tempForm.method = "POST";
        tempForm.style.display = "none";

        const tokenElement = document.createElement("textarea");
        tokenElement.name = "token";
        tokenElement.value = token!;
        tempForm.appendChild(tokenElement);

        document.body.appendChild(tempForm);
        tempForm.submit();
        tempForm.remove();
    };

    renderPayDialog = () => {
        const {
            payDialog: { open, data, creditsType, credits, title }
        } = this.state;

        const handleDialogClose = () => {
            this.setState({
                payDialog: {
                    ...this.state.payDialog,
                    open: false
                }
            });
        };
        const handleConirmBtnClick = async () => {
            handleDialogClose();

            const { enqueueSnackbar, dispatch } = this.props;
            const url = FETCH_ATTACH_PAY(data);

            const {
                data: { code, message }
            } = await FrontendRequestPromise(
                {
                    url,
                    method: "GET"
                },
                dispatch
            );

            if (code === 200) {
                enqueueSnackbar("购买成功！", { variant: "success" });
                this.startDownload(data);
            } else {
                enqueueSnackbar(message, { variant: "warning" });
            }
        };

        return (
            <Dialog open={open} onClose={handleDialogClose}>
                <DialogTitle>操作确认</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        请您先购买附件：【{title}】，您需要支付{renderCredits(creditsType, credits)}。
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConirmBtnClick} color="primary">
                        确认购买
                    </Button>
                    <Button onClick={handleDialogClose} color="primary">
                        取消购买
                    </Button>
                </DialogActions>
            </Dialog>
        );
    };

    render() {
        const { classes, attachList } = this.props;
        const { attachExpanded } = this.state;

        return (
            <>
                {attachList.length > 0 && this.renderPayDialog()}
                <div className={classes["attach-list-container"]}>
                    {attachList.map(item => (
                        <ExpansionPanel expanded={attachExpanded === item.aid} onChange={this.handleExpandPanel(item.aid)} key={item.aid}>
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>
                                    <AttachmentIcon className={classes["attach-icon"]} />
                                    {item.originalName}
                                </Typography>
                                <Typography className={classes.secondaryHeading}>{(item.fileSize / 1024).toFixed(2)} KB</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails className={classes["detail-container"]}>
                                <div>
                                    下载次数：{item.downloads}
                                    <br />
                                    上传时间：{new Date(item.createDate).toLocaleString()}
                                </div>
                                <div className={classes["btn-container"]}>
                                    <Fab variant="extended" size="medium" color="primary" className={classes.button} onClick={this.handleDownload(item)}>
                                        <ArrowDownwardIcon className={classes["icon"]} />
                                        下载
                                    </Fab>
                                </div>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div>
            </>
        );
    }
}

export default withStyles(styles)(AttachList);
