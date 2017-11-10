/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

export const REFRESH_VALUES = 'REFRESH_VALUES';

export function getValues(subparameters) {
    return {
        type: REFRESH_VALUES,
        subparameters
    }
}