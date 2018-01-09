import React, {Component} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";
import {getCurrentDay, getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";
import TemperatureChart from "../ui/TemperatureChart";
import UserHeader from "../ui/UserHeader";

class Monitoring extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false,
            date: getCurrentDay()
        }
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
                <UserHeader onDateChange={this._onDateChange.bind(this)} currentDate={this.state.date}/>
                <TemperatureChart room="204" period="year" fetchingDate={this.state.date.split("-")[0]} chartTitle={this.state.date.split("-")[0] + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart room="204" period="month" fetchingDate={this.state.date.split("-")[0] + "-" + this.state.date.split("-")[1]} chartTitle={this.state.date.split("-")[0] + "-" + this.state.date.split("-")[1] + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChart room="204" period="day" fetchingDate={this.state.date} chartTitle={this.state.date + " Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default Monitoring;
