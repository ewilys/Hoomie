/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import TemperatureChartContainer from "../../containers/ui/TemperatureChartContainer";
import {RefreshControl, ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";

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
                <TemperatureChartContainer room={this.state.room} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                <TemperatureChartContainer room={this.state.room} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default University;
