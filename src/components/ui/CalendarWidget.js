/**
 Created by Lisa Martini the 01/15/2018
 **/

import React, { Component } from 'react';
import {Modal, TouchableHighlight, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import {getCurrentDay, getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";
import DateWidget from "./DateWidget";
import {Calendar, CalendarList} from 'react-native-calendars';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


class CalendarWidget extends Component {
    constructor(props) {
        super(props);

        this.state={
            modalVisible: false,

        };

        this.headerStyle = {
            flex :1,
            flexDirection: 'row',
            justifyContent: 'center',
            height: 100,
            alignItems: 'center',
            marginLeft: 10,
        };

        this.modalStyle ={
            flex : 0.7,
            flexDirection:'column',
            justifyContent:'flex-start',
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

CalendarWidget.propTypes = {
    onDateChange: PropTypes.func.isRequired,
    currentDate: PropTypes.string.isRequired
};

export default CalendarWidget;