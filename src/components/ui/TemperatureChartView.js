/**
 Created by Guillaume Ferron on the 10/24/2017
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import PropTypes from 'prop-types';
import { SmoothLine } from 'react-native-pathjs-charts'
import {chartOptions, colors, serverIp} from "../../utils/constants"
import {dateStrToInt, getCurrentDay, getCurrentMonth, getCurrentYear} from "../../utils/methods"
import MeanValue from "./MeanValue";
import UndefinedChart from "./UndefinedChart";
const Dimensions = require('Dimensions');

class TemperatureChartView extends Component {
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
        if(!this.props.homeRefreshing && nextProps.homeRefreshing) {
            this.temperaturesFetchData();
        }

        if(this.state.isLoading) {
            this.props.homeRefreshed();
        }

        if(this.props.room && nextProps.room && this.props.room !== nextProps.room) {
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
            temperatures: TemperatureChartView.dataToChart(temperatures.data),
            isLoading: false,
            hasErrored: false
        })
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
        }
        return chartData;
    }

    render() {
        console.log(this.state.temperatures);
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
    room: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    chartTitle: PropTypes.string,
    homeRefreshing: PropTypes.bool,
    homeRefreshed: PropTypes.func,
    admin: PropTypes.bool,
};

export default TemperatureChartView;