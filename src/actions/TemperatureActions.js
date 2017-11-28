/**
 Created by Guillaume Ferron on the 10/24/2017
 **/
import { serverPort, serverIp } from "../utils/constants"

export const ITEMS_HAVE_ERRORED = 'ITEMS_HAVE_ERRORED';
export const ITEMS_ARE_LOADING = 'ITEMS_ARE_LOADING';
export const ITEMS_FETCH_DATA_SUCCESS = 'ITEMS_FETCH_DATA_SUCCESS';

export function itemsHaveErrored(bool) {
    return {
        type: ITEMS_HAVE_ERRORED,
        hasErrored: bool
    };
}

export function itemsAreLoading(bool) {
    return {
        type: ITEMS_ARE_LOADING,
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: ITEMS_FETCH_DATA_SUCCESS,
        items
    };
}

export function itemsFetchData(fetchingAddress) {
    return (dispatch) => {
        dispatch(itemsAreLoading(true));
        console.log("fetching :http://"+serverIp+fetchingAddress);
        fetch(`http://${serverIp}` + fetchingAddress)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                console.log("fetch working");
                dispatch(itemsAreLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((items) => {
                console.log(items);
                dispatch(itemsFetchDataSuccess(items))})
            .catch(() => dispatch(itemsHaveErrored(true)));
    };
}

export function errorTimeOut() {
    // We return a function instead of an action object
    return (dispatch) => {
        setTimeout(() => {
            // This function is able to dispatch other action creators
            dispatch(itemsHaveErrored(true));
        }, 5000);
    };
}