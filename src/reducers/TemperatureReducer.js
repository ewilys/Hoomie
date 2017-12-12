/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import {temperatureInitialState} from "../utils/constants";

export function getTemperatures(state = temperatureInitialState, action) {
    if(action && action.temperature) {
        switch (action.type) {
            case 'TEMPERATURES_YEAR_FETCH_DATA_SUCCESS':
                return {
                    ...state,
                    temperature: {
                        year: {
                            values: action.temperature.year.values
                        }
                    }
                };
            case 'TEMPERATURES_MONTH_FETCH_DATA_SUCCESS':
                return {
                    ...state,
                    temperature: {
                        month: {
                            values: action.temperature.month.values
                        }
                    }
                };
            case 'TEMPERATURES_DAY_FETCH_DATA_SUCCESS':
                return {
                    ...state,
                    temperature: {
                        day: {
                            values: action.temperature.day.values
                        }
                    }
                };
            default:
                return state;
        }
    }
    else {
        return state;
    }
}

export function temperaturesHaveErrored(state = false, action) {
    if(action && action.temperature) {
        switch (action.type) {
            case 'TEMPERATURES_YEAR_HAVE_ERRORED':
                return action.temperature.year.hasErrored;
            case 'TEMPERATURES_MONTH_HAVE_ERRORED':
                return action.temperature.month.hasErrored;
            case 'TEMPERATURES_DAY_HAVE_ERRORED':
                return action.temperature.day.hasErrored;
            default:
                return state;
        }
    }
    else {
        return state;
    }
}

export function temperaturesAreLoading(state = false, action) {
    if(action && action.temperature) {
        switch (action.type) {
            case 'TEMPERATURES_YEAR_ARE_LOADING':
                return action.temperature.year.isLoading;
            case 'TEMPERATURES_MONTH_ARE_LOADING':
                return action.temperature.month.isLoading;
            case 'TEMPERATURES_DAY_ARE_LOADING':
                return action.temperature.day.isLoading;
            default:
                return state;
        }
    }
    else {
        return state;
    }
}