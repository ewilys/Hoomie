/**
 Created by Guillaume Ferron on the 12/13/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import {chartOptions, colors} from "../../utils/constants";
const Dimensions = require('Dimensions');
import { AreaChart } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import * as shape from 'd3-shape'

class UndefinedChart extends Component {
    constructor(props) {
        super(props);

        this.undefinedValues=[2, 5.5, 8, 9.5, 10, 9.5, 8, 5.5, 4, 4.5, 6];

        this.meanValueStyle = {
            color: colors.UNDEFINED,
            fontSize: 15,
            fontWeight: '100',
            marginRight: 30
        };

        this.chartStyle = {
            flexDirection: 'column',
            alignContent: 'center'
        };

        this.headerStyle = {
            flexDirection: 'row',
            justifyContent: 'space-between'
        };

        this.chartTitleStyle = {
            color: colors.UNDEFINED,
            fontSize: 15,
            fontWeight: '100',
            marginLeft: 30
        };
    }

    render() {
        return (
            <View style={this.chartStyle}>
                <View style={this.headerStyle}>
                    <Text style={this.chartTitleStyle}>No temperatures available for this {this.props.period} </Text>
                </View>
                <AreaChart dataPoints={this.undefinedValues}
                           style={chartOptions}
                           contentInset={ { top: 30, bottom: 30 } }
                           curve={shape.curveNatural}
                           svg={{
                               fill: colors.UNDEFINED,
                               stroke: colors.UNDEFINED,
                           }}
                           showGrid={false}
                />
            </View>
        );
    }


}

UndefinedChart.propTypes = {
    period: PropTypes.string.isRequired,
};

export default UndefinedChart;