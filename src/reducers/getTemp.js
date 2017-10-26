/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import { serverIp, serverPort } from '../utils/constants'

const initialState = {temperatures: "-1"};

export default function getTemperatures(state = initialState, action) {
    const fetchingAddress = `http://${serverIp}:${serverPort}/temperature`;
    let data;

    switch (action.type) {
        case 'TEMPERATURES_ARRAY':
            data = fetch(fetchingAddress, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json'
                    }
                })
                .then((temperatureValue) => {
                    console.log(temperatureValue._bodyText.split(":")[2].split("}")[0]);
                    if(temperatureValue) {

                        return temperatureValue._bodyText.split(":")[2].split("}")[0];
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            return Object.assign({}, state, {
                temperatures: data
            });
        default:
            return state
    }
}