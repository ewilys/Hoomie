/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

const initialState = {temperatures: "-1"};

export function getItems(state = initialState, action) {
    switch(action.type) {
        case 'ITEMS_FETCH_DATA_SUCCESS':
            return action.items;
        default:
            return state;
    }
}

export function itemsHaveErrored(state = false, action) {
    switch (action.type) {
        case 'ITEMS_HAVE_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function itemsAreLoading(state = false, action) {
    switch (action.type) {
        case 'ITEMS_ARE_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}