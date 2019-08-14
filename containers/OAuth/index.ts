import { connect } from "react-redux";
import { Dispatch } from "redux";

import OAuthView from "../../view/OAuth";
import { StoreState } from "../../reducers";
import { enqueueSnackbar, setOAuthStore } from "../../actions";
import { OptionsObject } from "notistack";
import { oauthLoginStart, oauthBindUserStart, oauthFetchInfoStart, oauthClearTokenStart } from "../../actions/async";
import { NextRouter } from "next/dist/client/router";
import { IOAuthActionPayload } from "../../typings";

const mapStateToProps = ({ basic: { isLogin }, oauth: { platform, code, username, avatar, active } }: StoreState) => ({
    isLogin,
    platform,
    code,
    username,
    avatar,
    active
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    enqueueSnackbar: (message: string, options?: OptionsObject) => dispatch(enqueueSnackbar(message, options)),

    setOAuthStore: (platform: string, code: string) => dispatch(setOAuthStore(platform, code)),
    oauthClearTokenStart: (platform: string, code: string) => dispatch(oauthClearTokenStart(platform, code)),
    oauthLoginStart: (router: NextRouter, payload: IOAuthActionPayload) => dispatch(oauthLoginStart(router, payload)),
    oauthBindUserStart: (router: NextRouter, payload: IOAuthActionPayload) => dispatch(oauthBindUserStart(router, payload)),
    oauthFetchInfoStart: (platform: string, code: string) => dispatch(oauthFetchInfoStart(platform, code))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OAuthView);
