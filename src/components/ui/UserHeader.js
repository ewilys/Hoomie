/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Modal, TouchableHighlight, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import WeatherWidget from "./WeatherWidget";
import LocationWidget from "./LocationWidget";

import CalendarWidget from "./CalendarWidget";


class UserHeader extends Component {
    constructor(props) {
        super(props);

        this.state={
            modalVisible: false,

        };

        this.headerStyle = {
            flex :1,
            flexDirection: 'row',
            justifyContent: 'space-around',
            height: 100,
            alignItems: 'center',
        };




    }

    render() {
        return (
            <View style={this.headerStyle}>
                <CalendarWidget onDateChange={this.props.onDateChange} currentDate={this.props.currentDate}/>
                <LocationWidget/>
                <WeatherWidget/>
            </View>
        );
    }
}

UserHeader.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    currentDate: PropTypes.string.isRequired
};

export default UserHeader;