import React, {Component} from 'react';
import {RefreshControl, ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";
import {getCurrentDay, getCurrentMonthAsStr, getCurrentYear} from "../../utils/methods";
import TemperatureChartView from "../ui/TemperatureChartView";

class Monitoring extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false
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
                <TemperatureChartView room="204" period="year" chartTitle={getCurrentYear() + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChartView room="204" period="month" chartTitle={getCurrentMonthAsStr() + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChartView room="204" period="day" chartTitle={getCurrentMonthAsStr()+ " " + getCurrentDay().split("-")[2] + "th" + " Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default Monitoring;
