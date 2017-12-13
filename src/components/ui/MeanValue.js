/**
 Created by Guillaume Ferron on the 12/13/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import {colors} from "../../utils/constants"

class MeanValue extends Component {
    constructor(props) {
        super(props);

        this.state={
            meanValue: -999
        };

        this.meanValueStyle = {
            color: colors.HOOMIE_COLOR,
            fontSize: 15,
            fontWeight: 'bold',
            marginRight: 30
        };
    }

    componentDidMount() {
        if(this.props.values && this.props.values.length>0) {
            this.computeMeanValue(this.props.values);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.values && nextProps.values.length>0) {
            this.computeMeanValue(nextProps.values);
        }
    }

    /**
     * Compute the mean value of an array of given values
     *
     * @param values = the values to compute the mean value from
     */
    computeMeanValue(values) {
        let meanValue = 0;
        for(let valuesIndex = 0; valuesIndex < values.length; valuesIndex++) {
            meanValue += parseFloat(values[valuesIndex].temperature);
        }

        meanValue /= values.length;

        this.setState({
            meanValue: Math.round( meanValue * 10) / 10
        });
    }

    render() {
        return(
            <Text style={this.meanValueStyle}>
                {this.state.meanValue !== -999 ? this.state.meanValue : ''}{this.props.unit ? this.props.unit : ''}
            </Text>
        );
    }
}

MeanValue.propTypes = {
    values: PropTypes.array.isRequired,
    unit: PropTypes.string
};

export default MeanValue;