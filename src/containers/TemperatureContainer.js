/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import * as actions from '../actions'
import TemperatureView from "../components/TemperatureView";

const mapStateToProps = state => {
    return {
        temperatures: state.TemperatureReducer.temperatures
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getValues: () => dispatch(actions.getValues())
    }
};

const TemperatureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemperatureView);

export default TemperatureContainer