/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { SmoothLine } from 'react-native-pathjs-charts'
import { chartOptions } from "../../utils/constants"
import { dateStrToInt } from "../../utils/methods"
const Dimensions = require('Dimensions');

class TemperatureChartView extends Component {
    constructor(props) {
        super(props);

        this.state={
            temperatures: [[]]
        };

        this.chartStyle = {
            marginTop: 20,
            flexDirection: 'row',
            marginLeft: 20,
            marginRight: 5,
            justifyContent: 'center'
        };

        this.updatedChartOptions = chartOptions;
        this.updatedChartOptions.width = Dimensions.get('window').width - this.chartStyle.marginLeft - this.chartStyle.marginRight;
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
                //Gives it the correct values of date and temperature
                chartPoint.temperature = temperatures[tempIndex].value;
                chartPoint.date = dateStrToInt(temperatures[tempIndex].date);
                chartPoint.x = tempIndex;
                chartData[0].push(chartPoint);
            }

            //Make sure the poitns are in ascending order according to the date
            chartData[0].sort(function(a, b) {
                return a.date - b.date
            });

            this.setState({
                temperatures: chartData
            })
        }
    }

    render() {
        return (
            <View style={this.chartStyle}>
                {this.state.temperatures && this.state.temperatures[0] && this.state.temperatures[0][0] ?
                    <SmoothLine data={this.state.temperatures} options={this.updatedChartOptions} xKey='x' yKey='temperature'/>
                    : <Text/>
                }
            </View>
        );
    }
}

TemperatureChartView.propTypes = {
    getData: PropTypes.func.isRequired,
    chartType: PropTypes.func.isRequired,
    temperatures: PropTypes.array,
    homeRefreshing: PropTypes.bool,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    homeRefreshed: PropTypes.func
};

export default TemperatureChartView;