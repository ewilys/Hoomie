/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import { temperaturesFetchData } from '../../actions/index'
import TemperatureChartView from "../../components/ui/TemperatureChartView";
import { SmoothLine } from 'react-native-pathjs-charts'
import {getCurrentDay, getCurrentMonth, getCurrentYear} from "../../utils/methods";
import {temperatureInitialState} from "../../utils/constants";

function getTemperatures(state, period) {
    if(state && state.getTemperatures && state.getTemperatures.temperature) {
        switch(period) {
            case "year":
                return state.getTemperatures.temperature.year && state.getTemperatures.temperature.year.values && state.getTemperatures.temperature.year.values.data ? state.getTemperatures.temperature.year.values.data : temperatureInitialState.temperature.year.values;
            case "month":
                return state.getTemperatures.temperature.month && state.getTemperatures.temperature.month.values && state.getTemperatures.temperature.month.values.data ? state.getTemperatures.temperature.month.values.data : temperatureInitialState.temperature.month.values;
            case "day":
                return state.getTemperatures.temperature.day && state.getTemperatures.temperature.day.values && state.getTemperatures.temperature.day.values.data ? state.getTemperatures.temperature.day.values.data : temperatureInitialState.temperature.day.values;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        temperatures: getTemperatures(state, ownProps.subparameters.period),
        hasErrored: state.temperaturesHaveErrored,
        isLoading: state.temperaturesAreLoading,
        homeRefreshing: ownProps.homeRefreshing,
        chartType: SmoothLine
    }
};

const mapDispatchToProps = (dispatch, ownProps) => {
    switch(ownProps.subparameters.period) {
        case "year":
            return {
                getData: (subparameters) => dispatch(temperaturesFetchData('/temperature/year/'+getCurrentYear(), ownProps.subparameters)),
                homeRefreshed: ownProps.homeRefreshed
            };
        case "month":
            return {
                getData: (subparameters) => dispatch(temperaturesFetchData('/temperature/month/2017-10', ownProps.subparameters)),
                homeRefreshed: ownProps.homeRefreshed
            };
        case "day":
            return {
                getData: (subparameters) => dispatch(temperaturesFetchData('/temperature/day/'+getCurrentDay(), ownProps.subparameters)),
                homeRefreshed: ownProps.homeRefreshed
            };
    }

};

const TemperatureChartContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(TemperatureChartView);

export default TemperatureChartContainer