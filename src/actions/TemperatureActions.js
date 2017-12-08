/**
 Created by Guillaume Ferron on the 10/24/2017
 **/
import { serverIp } from "../utils/constants"

export const TEMPERATURES_HAVE_ERRORED = 'TEMPERATURES_HAVE_ERRORED';
export const TEMPERATURES_ARE_LOADING = 'TEMPERATURES_ARE_LOADING';
export const TEMPERATURES_FETCH_DATA_SUCCESS = 'TEMPERATURES_FETCH_DATA_SUCCESS';

export function temperaturesHaveErrored(bool) {
    return {
        type: TEMPERATURES_HAVE_ERRORED,
        hasErrored: bool
    };
}

export function temperaturesAreLoading(bool) {
    return {
        type: TEMPERATURES_ARE_LOADING,
        isLoading: bool
    };
}

export function temperaturesFetchDataSuccess(temperatures) {
    return {
        type: TEMPERATURES_FETCH_DATA_SUCCESS,
        temperatures
    };
}

export function temperaturesFetchData(fetchingAddress) {
    return (dispatch) => {
        dispatch(temperaturesAreLoading(true));
        console.log("fetching :http://"+serverIp+fetchingAddress);
        fetch(`http://${serverIp}` + fetchingAddress)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                dispatch(temperaturesAreLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((temperatures) => {
                dispatch(temperaturesFetchDataSuccess(temperatures))})
            .catch(() => dispatch(temperaturesHaveErrored(true)));
    };
}

export function errorTimeOut() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(temperaturesHaveErrored(true));
        }, 5000);
    };
}