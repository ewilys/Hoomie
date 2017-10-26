/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import * as actions from '../actions'
import TemperatureView from "../components/TemperatureView";

const mapStateToProps = state => {
    console.log(state.getTemp.temperatures);
    return {
        temperatures: state.getTemp.temperatures
    }
};

const mapDispatchToProps = dispatch => {
    return {
        getTemperatures: () => dispatch(actions.getTemperatures())
    }
};

const TemperatureContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemperatureView);

export default TemperatureContainer