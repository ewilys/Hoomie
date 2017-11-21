/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { SmoothLine } from 'react-native-pathjs-charts'
import { chartOptions } from "../utils/constants"
import { dateStrToInt } from "../utils/methods"

class ChartView extends Component {
    constructor(props) {
        super(props);

        this.state={
            data: [[]]
        }
    }

    componentDidMount() {
        this.props.getData();
        if(this.props.items) {
            this.dataToChart(this.props.items);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.items && nextProps.items && this.props.items !== nextProps.items) {
            this.dataToChart(nextProps.items);
        }

        if(!this.props.homeRefreshing && nextProps.homeRefreshing) {
            this.props.getData();
        }

        if(this.props.isLoading && !nextProps.isLoading) {
            this.props.homeRefreshed();
        }
    }

    /**
     * Convert the items received from server to exploitable data for the graphs
     *
     * @param items = the items received from server
     */
    dataToChart(items) {
        let chartData = [[]];
        let chartPoint = {date: 0, temperature: 0};
        //Checks that items have values
        if(items && items.data && items.data.length > 0) {
            //Iterate through the temperatures
            for (let tempIndex = 0; tempIndex < items.data.length; tempIndex++) {
                //Reset the chart point
                chartPoint = {date: 0, temperature: 0, x: 0};
                //Gives it the correct values of date and temperature
                chartPoint.temperature = items.data[tempIndex].temperature;
                chartPoint.date = dateStrToInt(items.data[tempIndex].date);
                chartData[0].push(chartPoint);
            }

            //Make sure the poitns are in ascending order according to the date
            chartData[0].sort(function(a, b) {
                return a.date - b.date
            });

            this.setState({
                data: chartData
            })
        }
    }

    render() {
        console.log(this.state.data);
        return (
            <View>
                {this.state.data && this.state.data[0] && this.state.data[0][0] ?
                    <SmoothLine data={this.state.data} options={chartOptions} xKey='date' yKey='temperature'/>
                    : <Text/>
                }
            </View>
        );
    }
}

ChartView.propTypes = {
    getData: PropTypes.func.isRequired,
    chartType: PropTypes.func.isRequired,
    items: PropTypes.object,
    homeRefreshing: PropTypes.bool,
    hasErrored: PropTypes.bool,
    isLoading: PropTypes.bool,
    homeRefreshed: PropTypes.func
};

export default ChartView;