/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Modal, TouchableHighlight, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import {getCurrentDay, getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";
import {colors} from "../../utils/constants";
import WeatherWidget from "./WeatherWidget";
import LocationWidget from "./LocationWidget";
import DateWidget from "./DateWidget";
import {Calendar, CalendarList} from 'react-native-calendars';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


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

        this.modalStyle ={
            flex : 0.7,
            flexDirection:'column',
            justifyContent:'flex-start',
        };

        this.headerTextStyle = {
            fontSize: 15,
        };
    }




    changeDate(day) {
        this.props.onDateChange(day);
        this.setState({
            modalVisible: false
        });
    }

    render() {
        return (
            <View style={this.headerStyle}>
                <TouchableHighlight onPress={() => {this.setState({modalVisible: true})}} underlayColor="#fff">
                    <DateWidget date={this.props.currentDate}/>
                </TouchableHighlight>
                <LocationWidget/>
                <WeatherWidget/>
                <Modal animationType='slide' visible={this.state.modalVisible} onRequestClose={() => {this.setState({modalVisible: false})}}>
                    <View style={this.modalStyle} >
                        <Calendar current={this.props.currentDate} minDate={'2017-08-16'} maxDate={getCurrentDay()} onDayPress={(day) => this.changeDate(day)}/>
                        <MaterialIcons style={{marginLeft: Dimensions.get('window').width * 0.5 - 50}} name="keyboard-arrow-down" size={100} color={"#CCC"} onPress={() => {this.setState({modalVisible: false})}}/>
                    </View>
                </Modal>
            </View>
        );
    }
}

UserHeader.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    currentDate: PropTypes.string.isRequired
};

export default UserHeader;