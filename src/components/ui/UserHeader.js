/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Image, Text, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import {colors} from "../../utils/constants";
import WeatherWidget from "./WeatherWidget";


class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.headerStyle = {
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 100,
            alignItems: 'center',
        };

        this.headerTextStyle = {
            fontSize: 20,
            marginLeft: 20
        };
    }

    render() {
        return (
            <View style={this.headerStyle}>
                <Text style={this.headerTextStyle}>Hello {this.props.name ? this.props.name : ''}</Text>
                <WeatherWidget/>
            </View>
        );
    }
}

UserHeader.propTypes = {
    name: PropTypes.string,

};

export default UserHeader;