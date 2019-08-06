import { connect } from "react-redux";
import { Dispatch } from "redux";

import HomepageView from "../../view/Homepage";
import { StoreState } from "../../reducers";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageView);
