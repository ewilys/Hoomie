import React, {Component} from 'react';
import {Picker, RefreshControl, ScrollView,View} from "react-native";
import {screenStyle} from "../../utils/constants";
import {getCurrentDay, getMonthAsStr, getDayAsStr} from "../../utils/methods";
import TemperatureChart from "../ui/TemperatureChart";
import CalendarWidget from "../ui/CalendarWidget";

class University extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false,
            date: getCurrentDay(),
            room: "204"
        };

        this.headerUniversityStyle={
            flex:1,
            flexDirection:'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        };
    }

    _onDateChange(date) {
        this.setState({
            date: date.dateString
        });
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
                <View style={this.headerUniversityStyle}>
                    <Picker style={{width: 200}} itemStyle={{fontSize: 15, fontWeight: '100'}} selectedValue={this.state.room} onValueChange={(itemValue, itemIndex) => this.setState({room: itemValue})} mode='dropdown'>
                        <Picker.Item label="All Rooms" value="all" />
                        <Picker.Item label="Room 203" value="203" />
                        <Picker.Item label="Room 204" value="204" />
                        <Picker.Item label="Room 205" value="205" />
                    </Picker>
                    <CalendarWidget onDateChange={this._onDateChange.bind(this)} currentDate={this.state.date}/>
                </View>
                <TemperatureChart admin={true} period="year" fetchingDate={this.state.date} room={this.state.room} chartTitle={this.state.date.split("-")[0] + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart admin={true} period="month" fetchingDate={this.state.date} room={this.state.room} chartTitle={getMonthAsStr(this.state.date) + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart admin={true} period="day" fetchingDate={this.state.date} room={this.state.room} chartTitle={getMonthAsStr(this.state.date)+" "+getDayAsStr(this.state.date)+"  Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default University;
