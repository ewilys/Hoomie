/**
 Created by Lisa Martini on the 01/17/2018
 **/

import React, { Component } from 'react';
import {Text, View,Switch} from "react-native";
import PropTypes from 'prop-types';
import {chartOptions, colors, serverIp} from "../../utils/constants"
import {
    getDayAsStr,
    getMonthAsShortStr
} from "../../utils/methods"
import MeanValue from "./MeanValue";
import { AreaChart, YAxis,XAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape'
import UndefinedChart from "./UndefinedChart";
import {LinearGradient, Stop,Circle} from "react-native-svg";
const Dimensions = require('Dimensions');

class AtmosphereChart extends Component {
    constructor(props) {
        super(props);

        this.state={
            co: [],
            no2:[],
            dates:[],
            displayNo2 :false,
            isLoading: false,
            hasErrored: false,
            displayChart:false,
            updates : false,
        };

        this.chartStyle = {
            flex:1,
            flexDirection: 'column',
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

        this.toggleText={
            flex:1,
            color:colors.HOOMIE_300,
            fontSize: 12,
            fontWeight: 'bold',

        };

        this.headerToggle={
            flex:1,
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            marginBottom: 20,
        };

        this.contentInset={
            top:30,
            bottom:30,
        };


        this.updatedChartOptions = chartOptions;
    }

    componentDidMount() {
        this.atmospheresFetchData();
    }

    componentWillReceiveProps(nextProps) {
        if((!this.props.homeRefreshing && nextProps.homeRefreshing) || (this.props.room && nextProps.room && this.props.room !== nextProps.room) || (this.props.fetchingDate !== nextProps.fetchingDate)) {
            this.setState({
                updates:true,
                displayChart:false,
            });
            //this.atmospheresFetchData();
        }
        else{
            this.setState({
                updates:false,
            })
        }
    }

    componentDidUpdate(){
        if(this.state.updates){
            this.atmospheresFetchData();
            this.setState({updates:false});
        }

    }

    getFetchingAddress() {
        let fetchingAddress = "";
        if(this.props.admin) {
            fetchingAddress += "/admin/atmosphere/average"+this.props.period[0].toUpperCase() + this.props.period.slice(1)+"/";
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
            fetchingAddress += "/"+this.props.room+"/atmosphere/"+this.props.period+"/";
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

    atmospheresFetchData(subparameters) {
        this.setState({
            displayChart:false,
        });
        let fetchingAddress = this.getFetchingAddress();
        fetch(`http://${serverIp}` + fetchingAddress)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.atmospheresAreLoading();

                return response;
            })
            .then((response) => response.json())
            .then((atmospheres) => this.atmospheresFetchSuccess(atmospheres, subparameters))
            .catch(() => this.atmospheresHaveErrored());
    }

    atmospheresFetchSuccess(atmospheres, subparameters) {
        atmospheres.data.sort((a,b)=> {return parseInt(a.date)-parseInt(b.date)});
        if(this.props.room == "all"){
            this.setState({
                co: AtmosphereChart.valueToChart(atmospheres.data,1),
                no2: AtmosphereChart.valueToChart(atmospheres.data,2),
                dates: AtmosphereChart.datesToChart(atmospheres.data,this.props.period),
                isLoading: false,
                hasErrored: false,
                displayChart: true,
            });
        }
        else{
            this.setState({
                co: AtmosphereChart.valueToChart(atmospheres.data,1),
                no2: AtmosphereChart.valueToChart(atmospheres.data,2),
                dates: AtmosphereChart.datesToChart(atmospheres.data,this.props.period),
                isLoading: false,
                hasErrored: false,
                displayChart: true,
            });
        }

        this.props.homeRefreshed();
    }

    atmospheresAreLoading() {
        this.setState({
            isLoading: true
        })
    }


    atmospheresHaveErrored() {
        this.setState({
            hasErrored: true
        });
    }

    errorTimeOut(subparameters) {
        // We return a function instead of an action object
        return (dispatch) => {
            setTimeout(() => {
                // This function is able to dispatch other action creators
                dispatch(this.atmospheresHaveErrored());
            }, 5000);
        };
    }

    /**
     * Convert the atmospheres received from server to exploitable data for the graphs
     *
     * @param atmospheres = the atmospheres received from server
     */
    static valueToChart(atmospheres,gas) {
        let chartData = [];
        let chartPoint = {atmosphere: 0};
        //Checks that atmospheres have values
        if(atmospheres && atmospheres.length > 0) {
            //Iterate through the atmospheres
            for (let atmosIndex = 0; atmosIndex < atmospheres.length; atmosIndex++) {
                if(gas == 1){
                    chartPoint.atmosphere = Math.round( atmospheres[atmosIndex].co * 10) / 10;
                }else if(gas == 2){
                    chartPoint.atmosphere = Math.round( atmospheres[atmosIndex].no2 * 10) / 10;
                }
                chartData.push(chartPoint.atmosphere);
            }
        }
        return chartData;
    }

    /**
     * Convert the dates received from server to exploitable data for the graphs
     *
     * @param atmospheres = the [] of atmospheres received from server
     */
    static datesToChart(array,period) {
        let chartData = [];
        let chartPoint = {date: '0'};
        //Checks that atmospheres have values

        if(array && array.length > 0) {
            //Iterate through the atmospheres
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
        if(this.state.co && this.state.no2 && this.state.no2[0] && this.state.co[0] && !this.state.isLoading && this.state.displayChart) {
            return (
                <View style={this.chartStyle}>
                    <View style={this.headerToggle}>
                        <Text style={[this.toggleText,{textAlign:'right'}]}> CO </Text>
                        <Switch value={this.state.displayNo2} onValueChange={(value)=> this.setState({displayNo2:value})}/>
                        <Text style={this.toggleText}> NO2 </Text>
                    </View>
                    <View style={this.headerStyle}>
                        <Text style={this.chartTitleStyle}>{this.props.chartTitle ? this.props.chartTitle : ''}</Text>
                        {this.state.displayNo2 ? (<MeanValue values={this.state.no2} unit="ppm"/>) :  (<MeanValue values={this.state.co} unit="ppm"/>)}
                    </View>

                        {this.state.displayNo2 ?
                            <View style={ { height:300,width:350,flexDirection: 'row' } }>
                                <YAxis dataPoints={this.state.no2} contentInset={{top:30,bottom:10}} labelStyle={{color:'grey'}} formatLabel={value => `${value}ppm`}/>
                                 <AreaChart dataPoints={this.state.no2}
                                        style={chartOptions}
                                        contentInset={ this.contentInset}
                                        curve={shape.curveNatural}
                                        renderGradient={ ({ id }) => (
                                            <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                                                <Stop offset={ '0%' } stopColor={ 'rgb(95, 86, 233)' } stopOpacity={ 0.8 }/>
                                                <Stop offset={ '100%' } stopColor={ 'rgb(255, 255, 255)' } stopOpacity={ 0.2 }/>
                                            </LinearGradient>) }
                                        showGrid={false}
                                            renderDecorator={ ({ x, y, index, value }) => (
                                                <Circle
                                                    key={ index }
                                                    cx={ x(index) }
                                                    cy={ y(value) }
                                                    r={ 3 }
                                                    stroke={ 'rgb(95, 86, 233)' }
                                                    fill={ 'white' }
                                                />
                                            ) }
                                 />
                            </View>
                            :
                            <View style={ { height:300,width:350,flexDirection: 'row' } }>
                                <YAxis dataPoints={this.state.co} contentInset={{top:30,bottom:10}} labelStyle={{color:'grey'}} formatLabel={value => `${value}ppm`}/>
                                <AreaChart dataPoints={this.state.co}
                                          style={chartOptions}
                                          contentInset={ this.contentInset}
                                          curve={shape.curveNatural}
                                          renderGradient={ ({ id }) => (
                                              <LinearGradient id={ id } x1={ '0%' } y={ '0%' } x2={ '0%' } y2={ '100%' }>
                                                  <Stop offset={ '0%' } stopColor={ 'rgb(95, 200, 233)' } stopOpacity={ 0.8 }/>
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
                                                   stroke={ 'rgb(95, 200, 233)' }
                                                   fill={ 'white' }
                                               />
                                           ) }
                                />
                            </View>
                        }


                    <XAxis values={this.state.dates}  formatLabel={value=> value} contentInset={this.contentInset} labelStyle={{color:'grey'}} chartType={XAxis.Type.BAR}/>

                </View>
            );
        } else if(!this.state.displayChart) {
            return null;
        }else{
            return (<UndefinedChart period={this.props.period} data={"atmospheres"}/>);
        }
    }
}

AtmosphereChart.propTypes = {
    room: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired,
    fetchingDate: PropTypes.string.isRequired,
    chartTitle: PropTypes.string,
    homeRefreshing: PropTypes.bool,
    homeRefreshed: PropTypes.func,
    admin: PropTypes.bool,
};

export default AtmosphereChart;