/**
 Created by Guillaume Ferron on the 12/13/2017
 Modified by Lisa Martini since 01/15/2018
 **/

import React, { Component } from 'react';
import { Text, View } from "react-native";
import {chartOptions, colors} from "../../utils/constants";
const Dimensions = require('Dimensions');
import { AreaChart,YAxis,XAxis } from 'react-native-svg-charts';
import PropTypes from 'prop-types';
import * as shape from 'd3-shape'

class UndefinedChart extends Component {
    constructor(props) {
        super(props);

        this.state={
            periodIndex : 'h',
            updates:false,
        }

        this.undefinedValues=[22, 25.5, 18, 19.5, 20, 19.5, 18, 15.5, 24, 24.5, 26];
        this.undefinedDates=[1,2,3,4,5,6,7,8,9,10,11];

        this.meanValueStyle = {
            color: colors.UNDEFINED,
            fontSize: 15,
            fontWeight: '100',
            marginRight: 30
        };

        this.chartStyle = {
            flex:1,
            flexDirection: 'column',
            alignContent: 'center',
            marginTop: 30,
            marginBottom:30,

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

        this.contentInset={
            top:30,
            bottom:30,
        }
    }
    componentDidMount() {
       this.getPeriodIndex(this.props.period);

    }

    getPeriodIndex(period){
        var p = 'h';
        switch(period){
            case 'year':
                p = 'mo';
                break;
            case 'month':
                p = 'th';
                break;
            default:
                p = 'h';
                break;
        }
        this.setState({periodIndex:p});
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.period !== nextProps.period) {
            this.setState({
                updates:true,
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
            this.getPeriodIndex(this.props.period)
            this.setState({
                updates:false});
        }

    }

    render() {
        return (
            <View style={this.chartStyle}>
                <View style={this.headerStyle}>
                    <Text style={this.chartTitleStyle}>No {this.props.data} available for this {this.props.period} </Text>
                </View>
                <View style={{height:300,width:350,flexDirection:'row'}}>
                    <YAxis  dataPoints={this.undefinedValues} contentInset={{top:30,bottom:10}} labelStyle={{color:'grey'}} formatLabel={value => `${value}ºC`}/>
                    <AreaChart dataPoints={this.undefinedValues}
                               style={chartOptions}
                               contentInset={ this.contentInset }
                               curve={shape.curveNatural}
                               svg={{
                                   fill: colors.UNDEFINED,
                                   stroke: colors.UNDEFINED,
                               }}
                               showGrid={false}
                    />
                </View>
                <XAxis values={this.undefinedDates} formatLabel={value=> value+this.state.periodIndex} contentInset={this.contentInset} labelStyle={{color:'grey'}} chartType={XAxis.Type.BAR}/>

            </View>
        );
    }


}

UndefinedChart.propTypes = {
    period: PropTypes.string.isRequired,
    data: PropTypes.string.isRequired,
};

export default UndefinedChart;