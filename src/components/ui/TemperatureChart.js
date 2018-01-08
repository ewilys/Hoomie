/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import {chartOptions, colors, serverIp} from "../../utils/constants"
import {dateStrToInt, getCurrentDay, getCurrentMonth, getCurrentYear} from "../../utils/methods"
import MeanValue from "./MeanValue";
import UndefinedChart from "./UndefinedChart";
const Dimensions = require('Dimensions');

class TemperatureChart extends Component {
    constructor(props) {
        super(props);

        this.state={
            temperatures: [[]],
            isLoading: false,
            hasErrored: false,
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
        this.temperaturesFetchData();
    }

    componentWillReceiveProps(nextProps) {
        if((!this.props.homeRefreshing && nextProps.homeRefreshing) || (this.props.room && nextProps.room && this.props.room !== nextProps.room)) {
            this.temperaturesFetchData();
        }
    }

    getFetchingAddress() {
        let fetchingAddress = "";
        if(this.props.admin) {
            fetchingAddress += "/admin/temperature/average"+this.props.period[0].toUpperCase() + this.props.period.slice(1)+"/";
            switch(this.props.period) {
                case "year":
                    fetchingAddress += getCurrentYear();
                    break;
                case  "month":
                    fetchingAddress += getCurrentMonth();
                    break;
                case "day":
                    fetchingAddress += getCurrentDay();
                    break;
            }
            fetchingAddress += "/"+this.props.room
        }
        else {
            fetchingAddress += "/"+this.props.room+"/temperature/"+this.props.period+"/";
            switch(this.props.period) {
                case "year":
                    fetchingAddress += getCurrentYear();
                    break;
                case  "month":
                    fetchingAddress += getCurrentMonth();
                    break;
                case "day":
                    fetchingAddress += getCurrentDay();
                    break;
            }
        }

        return fetchingAddress;
    }

    temperaturesFetchData(subparameters) {
        let fetchingAddress = this.getFetchingAddress();
        fetch(`http://${serverIp}` + fetchingAddress)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.temperaturesAreLoading();

                return response;
            })
            .then((response) => response.json())
            .then((temperatures) => this.temperaturesFetchSuccess(temperatures, subparameters))
            .catch(() => this.temperaturesHaveErrored());
    }

    temperaturesFetchSuccess(temperatures, subparameters) {
        this.setState({
            temperatures: TemperatureChart.dataToChart(temperatures.data),
            isLoading: false,
            hasErrored: false
        });

        this.props.homeRefreshed();
    }

    temperaturesAreLoading() {
        this.setState({
            isLoading: true
        })
    }


    temperaturesHaveErrored() {
        this.setState({
            hasErrored: true
        });
    }

    errorTimeOut(subparameters) {
        // We return a function instead of an action object
        return (dispatch) => {
            setTimeout(() => {
                // This function is able to dispatch other action creators
                dispatch(this.temperaturesHaveErrored());
            }, 5000);
        };
    }

    /**
     * Convert the temperatures received from server to exploitable data for the graphs
     *
     * @param temperatures = the temperatures received from server
     */
    static dataToChart(temperatures) {
        let chartData = [[]];
        let chartPoint = {date: 0, temperature: 0};
        //Checks that temperatures have values
        if(temperatures && temperatures.length > 0) {
            //Iterate through the temperatures
            for (let tempIndex = 0; tempIndex < temperatures.length; tempIndex++) {
                //Reset the chart point
                chartPoint = {date: 0, temperature: 0};
                //Gives it the correct values of date and temperature, with one decimal
                chartPoint.temperature = Math.round( temperatures[tempIndex].value * 10) / 10;
                chartPoint.date = dateStrToInt(temperatures[tempIndex].date);
                chartData[0].push(chartPoint);
            }

            //Make sure the points are in ascending order according to the date
            chartData[0].sort(function(a, b) {
                return a.date - b.date
            });
        }
        return chartData;
    }

    render() {
        if(this.state.temperatures && this.state.temperatures[0] && this.state.temperatures[0][0] && !this.state.isLoading) {
            return (
                <View style={this.chartStyle}>
                    <View style={this.headerStyle}>
                        <Text style={this.chartTitleStyle}>{this.props.chartTitle ? this.props.chartTitle : ''}</Text>
                        <MeanValue values={this.state.temperatures[0]} unit="°C"/>
                    </View>
                </View>
            );
        } else {
            return(<UndefinedChart/>);
        }
    }
}

TemperatureChart.propTypes = {
    room: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    chartTitle: PropTypes.string,
    homeRefreshing: PropTypes.bool,
    homeRefreshed: PropTypes.func,
    admin: PropTypes.bool,
};

export default TemperatureChart;