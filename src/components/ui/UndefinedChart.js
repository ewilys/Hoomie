/**
 Created by Guillaume Ferron on the 12/13/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import { SmoothLine } from 'react-native-pathjs-charts';
import {chartOptions, colors} from "../../utils/constants";
const Dimensions = require('Dimensions');

class UndefinedChart extends Component {
    constructor(props) {
        super(props);

        this.undefinedValues=[[
            {x: 0, y: 2},
            {x: 1, y: 5.5},
            {x: 2, y: 8},
            {x: 3, y: 9.5},
            {x: 4, y: 10},
            {x: 5, y: 9.5},
            {x: 6, y: 8},
            {x: 7, y: 5.5},
            {x: 8, y: 4},
            {x: 9, y: 4.5},
            {x: 10, y: 6},
        ]];

        this.meanValueStyle = {
            color: colors.UNDEFINED,
            fontSize: 15,
            fontWeight: 'bold',
            marginRight: 30
        };

        this.undefinedChartStyle = {
            ...chartOptions,
            color: colors.UNDEFINED,
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
            fontWeight: 'bold',
            marginLeft: 30
        };

        this.updatedChartOptions = chartOptions;
        this.updatedChartOptions.width = Dimensions.get('window').width - 10;
        this.updatedChartOptions.height = 0.4 * Dimensions.get('window').height;
    }

    render() {
        return (
            <View style={this.chartStyle}>
                <View style={this.headerStyle}>
                    <Text style={this.chartTitleStyle}>Undefined</Text>
                    <Text style={this.meanValueStyle}>Nan</Text>
                </View>
                <SmoothLine data={this.undefinedValues} options={this.undefinedChartStyle} xKey='x' yKey='y'/>
            </View>
        );
    }
}

export default UndefinedChart;