import React, {Component} from 'react';
import {Picker, RefreshControl, ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";
import {getCurrentDay, getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";
import TemperatureChart from "../ui/TemperatureChart";

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
                <Picker style={{width: 200}} itemStyle={{fontSize: 15, fontWeight: '100'}} selectedValue={this.state.room} onValueChange={(itemValue, itemIndex) => this.setState({room: itemValue})} mode='dropdown'>
                    <Picker.Item label="All Rooms" value="all" />
                    <Picker.Item label="Room 203" value="203" />
                    <Picker.Item label="Room 204" value="204" />
                    <Picker.Item label="Room 205" value="205" />
                </Picker>
                <TemperatureChart admin={true} period="year" room={this.state.room} chartTitle={getCurrentYear() + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart admin={true} period="month" room={this.state.room} chartTitle={getCurrentMonthAsStr() + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart admin={true} period="day" room={this.state.room} chartTitle={getCurrentMonthAsStr()+ " " + getCurrentDay().split("-")[2] + "th" + " Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default University;
