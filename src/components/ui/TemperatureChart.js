/**
 Created by Guillaume Ferron on the 10/24/2017
 Modified by Lisa Martini since 01/15/2018
 **/

import React, { Component } from 'react';
import {Text, View,Image} from "react-native";
import PropTypes from 'prop-types';
import {chartOptions, colors, serverIp} from "../../utils/constants"
import {
    dateStrToInt, getCurrentDay, getCurrentMonth, getCurrentYear, getDayAsStr,
    getMonthAsShortStr
} from "../../utils/methods"
import MeanValue from "./MeanValue";
import { AreaChart, YAxis,XAxis, StackedAreaChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import UndefinedChart from "./UndefinedChart";
import {LinearGradient, Stop,Circle} from "react-native-svg";
const Dimensions = require('Dimensions');

class TemperatureChart extends Component {
    constructor(props) {
        super(props);

        this.state={
            temperatures: [],
            dates:[],
            rooms:['203','204','205'],
            colors:['rgb(233, 86, 95)', 'rgb(239, 136, 143)', 'rgb(246, 187, 191)'],
            isLoading: false,
            hasErrored: false,
            updates : false,
            displayChart :false,
            yaxis:[15,20,22,24,23.5],
        };

        this.chartStyle = {
            flex:1,
            flexDirection: 'column',
           // alignItems:'center',
            marginTop: 30,
            marginBottom:30,
        };

        this.headerStyle = {
            flex :1,
            flexDirection: 'row',
            justifyContent: 'space-between',
        };

        this.chartTitleStyle = {
            flex:3,
            color: colors.HOOMIE_COLOR,
            fontSize: 15,
            fontWeight: '100',
            marginLeft: 30,
        };

        this.contentInset={
            top:30,
            bottom:30,
        };



        this.updatedChartOptions = chartOptions;
        // this.updatedChartOptions.width = Dimensions.get('window').width - 10;
        // this.updatedChartOptions.height = 0.4 * Dimensions.get('window').height;
    }

    componentDidMount() {
        this.temperaturesFetchData();
    }

    componentWillReceiveProps(nextProps) {
        if((!this.props.homeRefreshing && nextProps.homeRefreshing) || (this.props.room && nextProps.room && this.props.room !== nextProps.room) || (this.props.fetchingDate !== nextProps.fetchingDate)) {
            this.setState({
                updates:true,
                displayChart:false,
            });
            //this.temperaturesFetchData();
        }
        else{
            this.setState({
                updates:false,
            })
        }
    }

    componentDidUpdate(){
        if(this.state.updates){
            this.temperaturesFetchData();
            this.setState({updates:false});
        }

    }

    getFetchingAddress() {
        let fetchingAddress = "";
        if(this.props.admin) {
            fetchingAddress += "/admin/temperature/average"+this.props.period[0].toUpperCase() + this.props.period.slice(1)+"/";
            switch(this.props.period) {
                case "year":
                    fetchingAddress += this.props.fetchingDate.split("-")[0];
                    break;
                case  "month":
                    fetchingAddress += this.props.fetchingDate.split("-")[0] + "-" + this.props.fetchingDate.split("-")[1];
                    break;
                case "day":
                    fetchingAddress += this.props.fetchingDate;
                    break;
            }
            fetchingAddress += "/"+this.props.room
        }
        else {
            fetchingAddress += "/"+this.props.room+"/temperature/"+this.props.period+"/";
            switch(this.props.period) {
                case "year":
                    fetchingAddress += this.props.fetchingDate.split("-")[0];
                    break;
                case  "month":
                    fetchingAddress += this.props.fetchingDate.split("-")[0] + "-" + this.props.fetchingDate.split("-")[1];
                    break;
                case "day":
                    fetchingAddress += this.props.fetchingDate;
                    break;
            }
        }

        return fetchingAddress;
    }

    temperaturesFetchData(subparameters) {
        this.setState({
            displayChart : false,
        });
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

        temperatures.data.sort((a,b)=> {return parseInt(a.date)-parseInt(b.date)});

        if(this.props.room == "all"){
            this.setState({
                temperatures: TemperatureChart.allValueToChart(temperatures.data),
                dates: TemperatureChart.datesToChart(temperatures.data,this.props.period),
                isLoading: false,
                hasErrored: false,
                displayChart : true,
            });
        }else{
            this.setState({
                temperatures: TemperatureChart.valueToChart(temperatures.data),
                dates: TemperatureChart.datesToChart(temperatures.data,this.props.period),
                isLoading: false,
                hasErrored: false,
                displayChart : true,
            });
        }
        console.log(this.state.temperatures);
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

    static allValueToChart(temperatures){
        let chartData = [];
        let chartPoint = {'203': 0,'204':0,'205':0};
        //Checks that temperatures have values
        /*if(temperatures && temperatures.length > 0) {
            //Iterate through the temperatures
            for (let tempIndex = 0; tempIndex < temperatures.length; tempIndex++) {
                chartPoint["203"] = Math.round( temperatures[tempIndex]["203"] * 10) / 10;
                chartPoint["204"] = Math.round( temperatures[tempIndex]["204"] * 10) / 10;
                chartPoint["205"] = Math.round( temperatures[tempIndex]["205"] * 10) / 10;
                let chartPoint = {'203': temperatures[tempIndex]["203"] ,'204':temperatures[tempIndex]["204"] ,'205':temperatures[tempIndex]["205"] };
                chartData.push(chartPoint);
            }
        }*/
            chartData = [{'203': 23,'204': 19,'205': 21,},
                {'203': 24,'204': 18,'205': 20,},
                {'203': 23,'204': 5,'205': 4,},
                { '203': 22,'204': 2,'205': 1,},]


        return chartData;
    }

    /**
     * Convert the temperatures received from server to exploitable data for the graphs
     *
     * @param temperatures = the temperatures received from server
     */
    static valueToChart(temperatures) {
        let chartData = [];
        let chartPoint = {temperature: 0};
        //Checks that temperatures have values
        if(temperatures && temperatures.length > 0) {
            //Iterate through the temperatures
            for (let tempIndex = 0; tempIndex < temperatures.length; tempIndex++) {
                chartPoint.temperature = Math.round( temperatures[tempIndex].value * 10) / 10;
                chartData.push(chartPoint.temperature);
            }
        }
        return chartData;
    }

    /**
     * Convert the dates received from server to exploitable data for the graphs
     *
     * @param temperatures = the [] of temperatures received from server
     */
    static datesToChart(array,period) {
        let chartData = [];
        let chartPoint = {date: '0'};
        //Checks that temperatures have values

        if(array && array.length > 0) {
            //Iterate through the temperatures
            for (let dateIndex = 0; dateIndex < array.length; dateIndex++) {
                switch(period){
                    case 'year':

                        chartPoint.date =  getMonthAsShortStr(array[dateIndex].date) ;
                        break;
                    case 'month':

                        chartPoint.date =  getDayAsStr(array[dateIndex].date) ;
                        break;
                    default :
                        console.log("day");
                        chartPoint.date =  parseInt(array[dateIndex].date)+"h" ;
                        break;
                }
                //chartPoint.date = array[dateIndex].date;
                chartData.push(chartPoint.date);
            }
        }
        console.log(chartData);
        return chartData;
    }

    render() {
        if(this.state.temperatures && this.state.temperatures[0] && !this.state.isLoading && this.state.displayChart) {
            return (
                <View style={this.chartStyle}>
                    <View style={this.headerStyle}>
                        <Text style={this.chartTitleStyle}>{this.props.chartTitle ? this.props.chartTitle : ''}</Text>
                        {this.props.room != "all" && <MeanValue values={this.state.temperatures} unit="°C"/>}
                    </View>
                    {this.props.room == "all" ?

                        <View style={ { height:300,width:350,flexDirection: 'row' } }>
                             <YAxis dataPoints={this.state.yaxis} contentInset={{top:30,bottom:10}} labelStyle={{color:'grey'}} formatLabel={value => `${value}ºC`}/>

                            <View >
                                <StackedAreaChart data={this.state.temperatures}
                                                  keys={ this.state.rooms}
                                           style={chartOptions}
                                           contentInset={ this.contentInset}
                                           curve={shape.curveNatural}
                                           colors={this.state.colors}
                                           showGrid={false}

                                />

                            </View>

                        </View>

                        :
                        <View style={ { height:300,width:350,flexDirection: 'row' } }>
                            <YAxis dataPoints={this.state.temperatures} contentInset={{top:30,bottom:10}} labelStyle={{color:'grey'}} formatLabel={value => `${value}ºC`}/>
                            <View >
                                <AreaChart dataPoints={this.state.temperatures}
                                           style={chartOptions}
                                           contentInset={ this.contentInset}
                                           curve={shape.curveNatural}
                                           renderGradient={ ({ id }) => (
                                               <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                                                   <Stop offset={ '0%' } stopColor={ 'rgb(233, 86, 95)' } stopOpacity={ 0.8 }/>
                                                   <Stop offset={ '100%' } stopColor={ 'rgb(255, 255, 255)' } stopOpacity={ 0.2 }/>
                                               </LinearGradient>
                                           ) }
                                           showGrid={false}
                                           renderDecorator={ ({ x, y, index, value }) => (
                                               <Circle
                                                   key={ index }
                                                   cx={ x(index) }
                                                   cy={ y(value) }
                                                   r={ 3 }
                                                   stroke={ 'rgb(233, 86, 95)' }
                                                   fill={ 'white' }
                                               />
                                           ) }
                                />

                            </View>
                        </View>
                    }
                    <XAxis values={this.state.dates}  formatLabel={value=> value} contentInset={this.contentInset} labelStyle={{color:'grey'}} chartType={XAxis.Type.BAR}/>
                </View>

            );
        } else if(!this.state.displayChart){
            return null;
        }else{
            return(<UndefinedChart period={this.props.period} data={"temperatures"}/>);
        }
    }
}

TemperatureChart.propTypes = {
    room: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    fetchingDate: PropTypes.string.isRequired,
    chartTitle: PropTypes.string,
    homeRefreshing: PropTypes.bool,
    homeRefreshed: PropTypes.func,
    admin: PropTypes.bool,
};

export default TemperatureChart;