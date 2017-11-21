/* eslint-disable no-unused-vars */
import React, {Component} from 'react';
import YearChartContainer from "../containers/YearChartContainer";
import {RefreshControl, ScrollView} from "react-native";

class HomeScreen extends Component {
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
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh.bind(this)} />}>
                <YearChartContainer homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
            </ScrollView>
        );
    }
}

export default HomeScreen;
