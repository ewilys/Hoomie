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
        this.props.getLast();
    }

    render() {
        return (
            <View>
                <Text>
                    {this.props.items && this.props.items.data && this.props.items.data[0] && this.props.items.data[0].temperature && this.props.items.data[0].temperature !== '-1' ? this.props.items.data[0].temperature : 'No temperatures'}
                </Text>
                <Button onPress={this.props.getLast} title="Refresh"/>
            </View>
        );
    }
}

TemperatureView.propTypes = {
    items: PropTypes.object,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    getLast: PropTypes.func
};

export default TemperatureView;