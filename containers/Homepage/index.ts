import { connect } from "react-redux";
import { Dispatch } from "redux";

import HomepageView from "../../View/Homepage";
import { StoreState } from "../../reducers";
import { changeTitle } from "../../actions";

const mapStateToProps = (_: StoreState) => ({});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeTitle: (title: string) => dispatch(changeTitle(title))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomepageView);
