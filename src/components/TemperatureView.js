import React, { Component } from 'react';
import {Text} from "react-native";

class TemperatureView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: "20"
        }
    }

    componentDidMount() {

        return fetch('http://192.168.43.163:8080/temperature', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((temperatureValue) => {
            console.log(temperatureValue._bodyText.split(":")[2].split("}")[0]);
                if(temperatureValue) {

                    this.setState({
                        value: temperatureValue._bodyText.split(":")[2].split("}")[0]
                    })
                }
            })
            .catch((error) => {
                console.error(error);
            });
    }

    render() {
        return (
            <Text>
                Latest temperature: {this.state.value}
            </Text>
        );
    }
}

export default TemperatureView;