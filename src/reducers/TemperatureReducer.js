/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

const initialState = {
    temperature: {
        year: {
            hasErrored: false,
            isLoading: false,
            values: []
        },
        month: {
            hasErrored: false,
            isLoading: false,
            values: []
        },
        day: {
            hasErrored: false,
            isLoading: false,
            values: []
        }
    }
};

export function getTemperatures(state = initialState, action) {
    if(action && action.temperature) {
        switch (action.type) {
            case 'TEMPERATURES_YEAR_FETCH_DATA_SUCCESS':
                return action.temperature.year.values;
            case 'TEMPERATURES_MONTH_FETCH_DATA_SUCCESS':
                return action.temperature.month.values;
            case 'TEMPERATURES_DAY_FETCH_DATA_SUCCESS':
                return action.temperature.day.values;
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