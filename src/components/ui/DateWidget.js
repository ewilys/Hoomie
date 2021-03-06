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
            date: "",
            updates: false
        };

        this.dateStyle = {
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
        };

    }

    componentDidMount() {
        this.getDate();
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.date !== nextProps.date) {
            this.setState({updates:true})
        }else{
            this.setState({updates:false})
        }
    }

    componentDidUpdate(){
        if(this.state.updates){
            this.getDate();
            this.setState({updates:false})
        }
    }

    getDate() {
        this.setState({
            date: dateToLiteralString(this.props.date)
        })
    }

    render() {
        console.log(this.props.date);
        return (
            <View style={this.dateStyle} ref='dateContainer'>
                <MaterialIcons name="date-range" size={30} color={"#555555"}/>
                <Text> {this.state.date}</Text>
            </View>
        );
    }

    setNativeProps(nativeProps) {
        this.refs.dateContainer.setNativeProps(nativeProps);
    }
}

DateWidget.propTypes = {
    date: PropTypes.string.isRequired
};

export default DateWidget;