/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

/* eslint-disable no-unused-vars */
import React, { Component } from 'react';
import {Text} from "react-native";

class TemperatureView extends Component {
    /* constructor(props) {
        super(props);
    } */

    // static propTypes = {
    //     temperatures: PropTypes.string
    // };

    render() {
        return (
            <Text>
                {this.props.temperatures ? this.props.temperatures : 'No temperatures'}
            </Text>
        );
    }
}

export default TemperatureView;