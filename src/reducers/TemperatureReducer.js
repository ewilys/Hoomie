/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import { serverIp, serverPort } from '../utils/constants'

const initialState = {temperatures: "-1"};

export default function getValues(state = initialState, action) {
    const fetchingAddress = `http://${serverIp}:${serverPort}/temperature/last`;
    let data;
    switch (action.type) {
        case 'REFRESH_VALUES':
            data = fetch(fetchingAddress, {
                    method: 'GET',
                    headers: {
                    'Accept': 'application/json'
                    }
                })
                .then((temperatureValue) => {
                    if(temperatureValue) {
                        console.log(temperatureValue);
                        return temperatureValue._bodyText;
                    }
                    else {
                        console.log("Issue with the server response")
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
            return Object.assign({}, state, {
                temperatures: data.toString()
            });
        default:
            return state
    }
}