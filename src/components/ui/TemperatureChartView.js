/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { SmoothLine } from 'react-native-pathjs-charts'
import {chartOptions, colors} from "../../utils/constants"
import { dateStrToInt } from "../../utils/methods"
import MeanValue from "./MeanValue";
import UndefinedChart from "./UndefinedChart";
const Dimensions = require('Dimensions');

class TemperatureChartView extends Component {
    constructor(props) {
        super(props);

        this.state={
            temperatures: [[]]
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
            color: colors.HOOMIE_COLOR,
            fontSize: 15,
            fontWeight: '100',
            marginLeft: 30
        };

        this.updatedChartOptions = chartOptions;
        this.updatedChartOptions.width = Dimensions.get('window').width - 10;
        this.updatedChartOptions.height = 0.4 * Dimensions.get('window').height;
    }

    componentDidMount() {
        this.props.getData();
        if(this.props.temperatures) {
            this.dataToChart(this.props.temperatures);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.temperatures && nextProps.temperatures && this.props.temperatures !== nextProps.temperatures) {
            this.dataToChart(nextProps.temperatures);
        }

        if(!this.props.homeRefreshing && nextProps.homeRefreshing) {
            this.props.getData();
        }

        if(this.props.isLoading && !nextProps.isLoading) {
            this.props.homeRefreshed();
        }
    }

    /**
     * Convert the temperatures received from server to exploitable data for the graphs
     *
     * @param temperatures = the temperatures received from server
     */
    dataToChart(temperatures) {
        let chartData = [[]];
        let chartPoint = {date: 0, temperature: 0, x: 0};
        //Checks that temperatures have values
        if(temperatures && temperatures.length > 0) {
            //Iterate through the temperatures
            for (let tempIndex = 0; tempIndex < temperatures.length; tempIndex++) {
                //Reset the chart point
                chartPoint = {date: 0, temperature: 0, x: 0};
                //Gives it the correct values of date and temperature, with one decimal
                chartPoint.temperature = Math.round( temperatures[tempIndex].value * 10) / 10;
                chartPoint.date = dateStrToInt(temperatures[tempIndex].date);
                chartPoint.x = tempIndex;
                chartData[0].push(chartPoint);
            }

            //Make sure the points are in ascending order according to the date
            chartData[0].sort(function(a, b) {
                return a.date - b.date
            });

            this.setState({
                temperatures: chartData
            })
        }
    }

    render() {
        if(this.state.temperatures && this.state.temperatures[0] && this.state.temperatures[0][0]) {
            return (
                <View style={this.chartStyle}>
                    <View style={this.headerStyle}>
                        <Text style={this.chartTitleStyle}>{this.props.chartTitle ? this.props.chartTitle : ''}</Text>
                        <MeanValue values={this.state.temperatures[0]} unit="°C"/>
                    </View>
                    <SmoothLine data={this.state.temperatures} options={this.updatedChartOptions} xKey='x' yKey='temperature'/>
                </View>
            );
        } else {
            return(<UndefinedChart/>);
        }
    }
}

TemperatureChartView.propTypes = {
    getData: PropTypes.func.isRequired,
    temperatures: PropTypes.array,
    chartTitle: PropTypes.string,
    homeRefreshing: PropTypes.bool,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    homeRefreshed: PropTypes.func
};

export default TemperatureChartView;