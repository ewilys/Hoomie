/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import TemperatureChartContainer from "../../containers/ui/TemperatureChartContainer";
import {Picker, RefreshControl, ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";
import {getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";

class University extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false,
            room: "204"
        }
    }

    _onRefresh() {
        this.setState({isRefreshing: true});
    }

    hasRefreshed() {
        this.setState({isRefreshing: false});
    }

    render() {
        return (
            <ScrollView style={screenStyle} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh.bind(this)} />}>
                <Picker style={{width: 200}} itemStyle={{fontSize: 15, fontWeight: 'bold'}} selectedValue={this.state.room} onValueChange={(itemValue, itemIndex) => this.setState({room: itemValue})} mode='dropdown'>
                    <Picker.Item label="Room 204" value="204" />
                    <Picker.Item label="Room 205" value="205" />
                </Picker>
                <TemperatureChartContainer room={this.state.room} chartTitle={getCurrentYear() + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChartContainer room={this.state.room} chartTitle={getCurrentMonthAsStr() + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default University;
