import { connect } from "react-redux";
import { Dispatch } from "redux";
import PageFrame from "../../Components/PageFrame";
import { StoreState } from "../../Reducers";

const mapStateToProps = ({ basic: { title } }: StoreState) => ({
    title: title
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(PageFrame);
