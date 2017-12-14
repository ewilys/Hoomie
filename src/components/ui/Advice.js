/**
 Created by Guillaume Ferron on the 12/13/2017
 **/
import React, {Component} from 'react';
import {Text, View} from "react-native";
import PropTypes from "prop-types";
import {colors} from "../../utils/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

class Advice extends Component {
    constructor(props) {
        super(props);

        this.adviceStyle={
            shadowColor: "#000000",
            shadowOpacity: 0.8,
            shadowRadius: 2,
            shadowOffset: {
                height: 1,
                width: 1
            },
            marginTop: 20,
            marginBottom: 20,
            marginRight: 20,
            marginLeft: 20,
            elevation: 3,
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            backgroundColor: "#FFF",
            borderRadius: 10,
        };

        this.adviceTextStyle = {
            color:colors.HOOMIE_100,
            fontSize:20,
            fontWeight:'400'
        }
    }

    render() {
        return (
            <View style={this.adviceStyle}>
                <MaterialIcons name='lightbulb-outline' size={30} color={this.adviceTextStyle.color}/>
                <Text style={this.adviceTextStyle}>{this.props.content}</Text>
            </View>
        );
    }
}

Advice.propTypes = {
    content: PropTypes.string.isRequired
};

export default Advice;
