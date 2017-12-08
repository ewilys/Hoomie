/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

const initialState = {temperatures: "-1"};

export function getTemperatures(state = initialState, action) {
    switch(action.type) {
        case 'TEMPERATURES_FETCH_DATA_SUCCESS':
            return action.temperatures;
        default:
            return state;
    }
}

export function temperaturesHaveErrored(state = false, action) {
    switch (action.type) {
        case 'TEMPERATURES_HAVE_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function temperaturesAreLoading(state = false, action) {
    switch (action.type) {
        case 'TEMPERATURES_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}