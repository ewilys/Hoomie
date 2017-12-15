/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Image, Text, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import {dateToLiteralString, getCurrentDay} from "../../utils/methods";


class DateWidget extends Component {
    constructor(props) {
        super(props);

        this.state = {
            date: ""
        };

        this.dateStyle = {
            flexDirection: 'row',
            alignItems: 'center',
        };

    }

    componentDidMount() {
        this.getDate();
    }

    getDate() {
        this.setState({
            date: dateToLiteralString(getCurrentDay())
        })
    }

    render() {
        return (
            <View style={this.dateStyle}>
                <MaterialIcons name="date-range" size={30} color={"#555555"}/>
                <Text> {this.state.date}</Text>
            </View>
        );
    }
}

DateWidget.propTypes = {
};

export default DateWidget;