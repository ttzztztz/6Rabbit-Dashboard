import React from "react";
import { Dispatch } from "redux";
import styles from "./style";
import { OptionsObject } from "notistack";
import { NextRouter, withRouter } from "next/dist/client/router";

import { WithStyles, withStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import TextField from "@material-ui/core/TextField";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import UserCreditsBoard from "../../../containers/UserCreditsBoard";
import { POST_PAY, FETCH_CREDITS_LOG } from "../../../consts/backend";
import FrontendRequestPromise from "../../../model/FrontendRequestPromise";
import { ICreditsLog } from "../../../typings";
import PaginationComponent from "../../../components/Pagination";
import renderCredits from "../../../model/RenderCredits";
import mapStatusToString from "../../../model/MapStatusToString";

interface Props extends WithStyles {
    router: NextRouter;
    uid: string;

    enqueueSnackbar: (message: string, options?: OptionsObject) => void;
    dispatch: Dispatch;
}

class Credits extends React.Component<Props> {
    state = {
        expanded: "pay" as string | boolean,

        recordList: [] as Array<ICreditsLog>,
        total: 0,
        page: 1,

        payMethod: "wechat" as "wechat" | "alipay",
        description: "",
        credits: 0
    };
    componentDidMount() {
        this.handlePageChange(1);
    }
    handlePanelChange = (key: string) => (_e: React.ChangeEvent<{}>, isExpanded: boolean) => {
        this.setState({
            expanded: isExpanded ? key : false
        });
    };
    handlePayContentChange = (key: string, isNumber: boolean = false) => (
        event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
        const { value } = event.target;
        this.setState({
            [key]: isNumber ? Number.parseInt(value) : value
        });
    };
    handlePayMethodChange = (_e: React.ChangeEvent<{}>, value: string) => {
        this.setState({
            payMethod: value
        });
    };
    handleSubmitPay = async () => {
        const { enqueueSnackbar } = this.props;
        const { payMethod, description: _description, credits } = this.state;
        const description = `[${payMethod}] ${_description}`;
        const {
            data: { code, message }
        } = await FrontendRequestPromise({
            url: POST_PAY,
            method: "POST",
            data: {
                credits: credits * 100,
                description
            }
        });

        if (code === 200) {
            enqueueSnackbar("提交成功，审核后到账！", { variant: "success" });
            this.setState({
                payMethod: "wechat",
                description: "",
                credits: 0
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
    };
    handlePageChange = async (page: number) => {
        const { dispatch, enqueueSnackbar } = this.props;

        const {
            data: { code, message }
        } = await FrontendRequestPromise({ url: FETCH_CREDITS_LOG(page.toString()) }, dispatch);
        if (code === 200) {
            const { list, count } = message;
            this.setState({
                recordList: list,
                total: count
            });
        } else {
            enqueueSnackbar(message, { variant: "error" });
        }
        this.setState({
            page
        });
    };

    render() {
        const { classes } = this.props;
        const { expanded, payMethod, recordList, total, page } = this.state;

        const qrcodeSrc = `/static/qrcode/${payMethod}.jpg`;
        return (
            <>
                <section>
                    <UserCreditsBoard autoFetchInfo={true} />
                </section>
                <section className={classes["content-container"]}>
                    <ExpansionPanel expanded={expanded === "pay"} onChange={this.handlePanelChange("pay")}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>在线充值</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes["detail-root"]}>
                            <Typography className={classes["pay-subtitle"]}>1、选择充值方式</Typography>
                            <FormControl component="fieldset" className={classes.formControl}>
                                <RadioGroup className={classes.group} value={payMethod} onChange={this.handlePayMethodChange}>
                                    <FormControlLabel value="wechat" control={<Radio />} label="微信" />
                                    <FormControlLabel value="alipay" control={<Radio />} label="支付宝" />
                                </RadioGroup>
                            </FormControl>
                            <Typography className={classes["pay-subtitle"]}>2、扫描二维码转账</Typography>
                            <div className={classes["qrcode-container"]}>
                                <img src={qrcodeSrc} alt="qrcode" />
                            </div>
                            <Typography className={classes["pay-subtitle"]}>3、输入充值金额</Typography>
                            <TextField
                                label="充值金额"
                                type="number"
                                defaultValue="0"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                onChange={this.handlePayContentChange("credits", true)}
                            />
                            <Typography className={classes["pay-subtitle"]}>4、添加备注</Typography>
                            <TextField
                                label="备注"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                onChange={this.handlePayContentChange("description")}
                            />
                            <Typography className={classes["pay-subtitle"]}>5、确认信息后请提交</Typography>
                            <Button variant="contained" color="primary" className={classes.button} onClick={this.handleSubmitPay}>
                                充值
                            </Button>
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel expanded={expanded === "record"} onChange={this.handlePanelChange("record")}>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>充值记录</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails className={classes["credits-log-container"]}>
                            <Table className={classes["credits-log-table"]}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">内容</TableCell>
                                        <TableCell align="center">时间</TableCell>
                                        <TableCell align="center">积分</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recordList.map(item => (
                                        <TableRow key={item.cid}>
                                            <TableCell component="th" scope="row" align="center">
                                                {item.description} {item.type === "deposit" && mapStatusToString(item.status)}
                                            </TableCell>
                                            <TableCell align="center">{new Date(item.createDate).toLocaleString()}</TableCell>
                                            <TableCell align="center">{renderCredits(item.creditsType, item.credits)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            <PaginationComponent total={total} page={page} onPageChange={this.handlePageChange} />
                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                </section>
            </>
        );
    }
}

export default withRouter(withStyles(styles)(Credits));
