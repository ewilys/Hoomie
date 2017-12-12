/* eslint-disable arrow-body-style */
import { connect } from 'react-redux'
import { temperaturesFetchData } from '../../actions/index'
import TemperatureChartView from "../../components/ui/TemperatureChartView";
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

function getLoading(state, period) {
    if(state && state.temperaturesAreLoading && state.temperaturesAreLoading.temperature) {
        switch(period) {
            case "year":
                return state.temperaturesAreLoading.temperature.year && state.temperaturesAreLoading.temperature.year.isLoading ? state.temperaturesAreLoading.temperature.year.isLoading : temperatureInitialState.temperature.year.isLoading;
            case "month":
                return state.temperaturesAreLoading.temperature.month && state.temperaturesAreLoading.temperature.month.isLoading ? state.temperaturesAreLoading.temperature.month.isLoading : temperatureInitialState.temperature.month.isLoading;
            case "day":
                return state.temperaturesAreLoading.temperature.day && state.temperaturesAreLoading.temperature.day.isLoading ? state.temperaturesAreLoading.temperature.day.isLoading : temperatureInitialState.temperature.day.isLoading;
        }
    }
}

function getError(state, period) {
    if(state && state.temperaturesHaveErrored && state.temperaturesHaveErrored.temperature) {
        switch(period) {
            case "year":
                return state.temperaturesHaveErrored.temperature.year && state.temperaturesHaveErrored.temperature.year.hasErrored ? state.temperaturesHaveErrored.temperature.year.hasErrored : temperatureInitialState.temperature.year.hasErrored;
            case "month":
                return state.temperaturesHaveErrored.temperature.month && state.temperaturesHaveErrored.temperature.month.hasErrored ? state.temperaturesHaveErrored.temperature.month.hasErrored : temperatureInitialState.temperature.month.hasErrored;
            case "day":
                return state.temperaturesHaveErrored.temperature.day && state.temperaturesHaveErrored.temperature.day.hasErrored ? state.temperaturesHaveErrored.temperature.day.hasErrored : temperatureInitialState.temperature.day.hasErrored;
        }
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        temperatures: getTemperatures(state, ownProps.subparameters.period),
        hasErrored: getError(state, ownProps.subparameters.period),
        isLoading: getLoading(state, ownProps.subparameters.period),
        homeRefreshing: ownProps.homeRefreshing,
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
                getData: (subparameters) => dispatch(temperaturesFetchData('/temperature/month/'+getCurrentMonth(), ownProps.subparameters)),
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