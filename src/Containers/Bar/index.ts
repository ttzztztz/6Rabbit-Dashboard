import { connect } from "react-redux";
import { Dispatch } from "redux";
import Bar from "../../Components/Bar";
import { StoreState } from "../../Reducers";

const mapStateToProps = ({ basic: { title } }: StoreState) => ({
    title: title
});

const mapDispatchToProps = (dispatch: Dispatch) => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Bar);
