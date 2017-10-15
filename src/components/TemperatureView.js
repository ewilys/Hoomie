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
        const _this = this;

        return fetch('http://192.168.43.163:3000/temperature', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        })
            .then((temperatureValue) => {
                if(temperatureValue && typeof temperatureValue === JSON) {

                    console.log(temperatureValue.parse()._bodyText);
                    _this.setState({
                        value: temperatureValue.parse()._bodyText
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
                {this.state.value}
            </Text>
        );
    }
}

export default TemperatureView;