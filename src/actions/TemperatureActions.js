/**
 Created by Guillaume Ferron on the 10/24/2017
 **/
import { serverIp } from "../utils/constants"

export const TEMPERATURES_YEAR_HAVE_ERRORED = 'TEMPERATURES_YEAR_HAVE_ERRORED';
export const TEMPERATURES_YEAR_ARE_LOADING = 'TEMPERATURES_YEAR_ARE_LOADING';
export const TEMPERATURES_YEAR_FETCH_DATA_SUCCESS = 'TEMPERATURES_YEAR_FETCH_DATA_SUCCESS';
export const TEMPERATURES_MONTH_HAVE_ERRORED = 'TEMPERATURES_MONTH_HAVE_ERRORED';
export const TEMPERATURES_MONTH_ARE_LOADING = 'TEMPERATURES_MONTH_ARE_LOADING';
export const TEMPERATURES_MONTH_FETCH_DATA_SUCCESS = 'TEMPERATURES_MONTH_FETCH_DATA_SUCCESS';
export const TEMPERATURES_DAY_HAVE_ERRORED = 'TEMPERATURES_DAY_HAVE_ERRORED';
export const TEMPERATURES_DAY_ARE_LOADING = 'TEMPERATURES_DAY_ARE_LOADING';
export const TEMPERATURES_DAY_FETCH_DATA_SUCCESS = 'TEMPERATURES_DAY_FETCH_DATA_SUCCESS';

export function temperaturesHaveErrored(bool, subparameters) {
    switch(subparameters.period) {
        case "year":
            return {
                type: TEMPERATURES_YEAR_HAVE_ERRORED,
                temperature: {
                    year: {
                        hasErrored: bool
                    }
                }
            };
        case "month":
            return {
                type: TEMPERATURES_MONTH_HAVE_ERRORED,
                temperature: {
                    month: {
                        hasErrored: bool
                    }
                }
            };
        case "day":
            return {
                type: TEMPERATURES_DAY_HAVE_ERRORED,
                temperature: {
                    day: {
                        hasErrored: bool
                    }
                }
            };
    }
}

export function temperaturesAreLoading(bool, subparameters) {
    switch(subparameters.period) {
        case "year":
            return {
                type: TEMPERATURES_YEAR_ARE_LOADING,
                temperature: {
                    year: {
                        isLoading: bool
                    }
                }
            };
        case "month":
            return {
                type: TEMPERATURES_MONTH_ARE_LOADING,
                temperature: {
                    month: {
                        isLoading: bool
                    }
                }
            };
        case "day":
            return {
                type: TEMPERATURES_DAY_ARE_LOADING,
                temperature: {
                    day: {
                        isLoading: bool
                    }
                }
            };
    }
}

export function temperaturesFetchDataSuccess(temperatures, subparameters) {
    switch(subparameters.period) {
        case "year":
            return {
                type: TEMPERATURES_YEAR_FETCH_DATA_SUCCESS,
                temperature: {
                    year: {
                        values: temperatures
                    }
                }
            };
        case "month":
            return {
                type: TEMPERATURES_MONTH_FETCH_DATA_SUCCESS,
                temperature: {
                    month: {
                        values: temperatures
                    }
                }
            };
        case "day":
            return {
                type: TEMPERATURES_DAY_FETCH_DATA_SUCCESS,
                temperature: {
                    day: {
                        values: temperatures
                    }
                }
            };
    }
}

export function temperaturesFetchData(fetchingAddress, subparameters) {
    return (dispatch) => {
        dispatch(temperaturesAreLoading(true, subparameters));
        fetch(`http://${serverIp}` + fetchingAddress)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(temperaturesAreLoading(false, subparameters));

                return response;
            })
            .then((response) => response.json())
            .then((temperatures) => {
                dispatch(temperaturesFetchDataSuccess(temperatures, subparameters))})
            .catch(() => dispatch(temperaturesHaveErrored(true, subparameters)));
    };
}

export function errorTimeOut(subparameters) {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(temperaturesHaveErrored(true, subparameters));
        }, 5000);
    };
}