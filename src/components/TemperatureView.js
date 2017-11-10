/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, Button, View } from "react-native";
import PropTypes from 'prop-types';

class TemperatureView extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getValues();
    }

    render() {
        return (
            <View>
                <Text>
                    {this.props.temperatures && this.props.temperatures !== '-1' ? this.props.temperatures : 'No temperatures'}
                </Text>
                <Button onPress={this.props.getValues} title="Refresh"/>
            </View>
        );
    }
}

TemperatureView.propTypes = {
    temperatures: PropTypes.string,
    getValues: PropTypes.func
};

export default TemperatureView;