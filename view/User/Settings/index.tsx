import React from "react";
import styles from "./style";
import { WithStyles, withStyles } from "@material-ui/core";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";

interface Props extends WithStyles {}

class Settings extends React.PureComponent<Props> {
    state = {
        pwd_old: "",
        pwd_new: "",
        pwd_new_repeat: "",

        name: "",
        signature: "",
        qq: "",
        wechat: "",
        gender: "男",
        email: "",
        mobile: ""
    };
    handleChange = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({
            [key]: e.target.value
        });
    };

    handleProfileSubmit = () => {};
    handlePwdSubmit = () => {
        const { pwd_old, pwd_new, pwd_new_repeat } = this.state;
        if (pwd_new !== pwd_new_repeat) {
            return;
        }
    };

    render() {
        const { classes } = this.props;
        const { pwd_old, pwd_new, pwd_new_repeat, name, signature, qq, wechat, gender, email, mobile } = this.state;

        return (
            <section className={classes["setting-container"]}>
                <Typography variant="h5" className={classes["setting-title"]}>
                    个人资料
                </Typography>
                <div className={classes["input-container"]}>
                    <TextField
                        id="name"
                        label="姓名"
                        className={classes.textField}
                        value={name}
                        onChange={this.handleChange("name")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="gender"
                        select
                        label="性别"
                        className={classes.textField}
                        value={gender}
                        onChange={this.handleChange("gender")}
                        margin="dense"
                        variant="outlined"
                    >
                        {["男", "女", "其他"].map((option, index) => (
                            <MenuItem key={index} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        id="email"
                        label="邮箱"
                        className={classes.textField}
                        value={email}
                        onChange={this.handleChange("email")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="qq"
                        label="QQ"
                        className={classes.textField}
                        value={qq}
                        onChange={this.handleChange("qq")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="mobile"
                        label="手机"
                        className={classes.textField}
                        value={mobile}
                        onChange={this.handleChange("mobile")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="wechat"
                        label="微信"
                        className={classes.textField}
                        value={wechat}
                        onChange={this.handleChange("wechat")}
                        margin="dense"
                        variant="outlined"
                    />
                    <TextField
                        id="signature"
                        label="个性签名"
                        className={classes.textField}
                        value={signature}
                        onChange={this.handleChange("signature")}
                        margin="dense"
                        variant="outlined"
                    />
                    <div className={classes["setting-submit-btn-container"]}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handleProfileSubmit}
                        >
                            提交
                        </Button>
                    </div>
                </div>

                <Typography variant="h5" className={classes["setting-title"]}>
                    修改密码
                </Typography>
                <div className={classes["input-container"]}>
                    <TextField
                        id="pwd_old"
                        label="请输入旧密码"
                        className={classes.textField}
                        value={pwd_old}
                        onChange={this.handleChange("pwd_old")}
                        margin="dense"
                        type="password"
                        variant="outlined"
                    />
                    <TextField
                        id="pwd_new"
                        label="请输入新密码"
                        className={classes.textField}
                        value={pwd_new}
                        onChange={this.handleChange("pwd_new")}
                        margin="dense"
                        type="password"
                        variant="outlined"
                    />
                    <TextField
                        id="pwd_new_repeat"
                        label="请再次输入新密码"
                        className={classes.textField}
                        value={pwd_new_repeat}
                        onChange={this.handleChange("pwd_new_repeat")}
                        margin="dense"
                        type="password"
                        variant="outlined"
                    />
                    <div className={classes["setting-submit-btn-container"]}>
                        <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            onClick={this.handlePwdSubmit}
                        >
                            提交
                        </Button>
                    </div>
                </div>
            </section>
        );
    }
}

export default withStyles(styles)(Settings);
