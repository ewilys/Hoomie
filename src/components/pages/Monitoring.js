import React, {Component} from 'react';
import {RefreshControl, ScrollView,View,Switch,Text} from "react-native";
import {screenStyle,colors} from "../../utils/constants";
import {getCurrentDay, getDayAsStr, getMonthAsStr} from "../../utils/methods";
import TemperatureChart from "../ui/TemperatureChart";
import UserHeader from "../ui/UserHeader";
import AtmosphereChart from "../ui/AtmosChart";

class Monitoring extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false,
            atmosphereDisplay:false,
            date: getCurrentDay()
        };
        this.displayStyle={
            flex:1,
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems: 'center',
        },

        this.toggleText={
            flex:1,
            color:colors.HOOMIE_300,
            fontSize: 12,
            fontWeight: 'bold',
            alignSelf: 'center',
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
                <UserHeader onDateChange={this._onDateChange.bind(this)} currentDate={this.state.date}/>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={[this.toggleText,{textAlign:'right'}]}> Temperatures </Text>
                    <Switch value={this.state.atmosphereDisplay} onValueChange={(value)=>this.setState({atmosphereDisplay:value})}/>
                    <Text style={this.toggleText}> Atmosphere </Text>
                </View>

                    {this.state.atmosphereDisplay ?
                        <View style={this.displayStyle}>
                            <AtmosphereChart room="204" period="year" fetchingDate={this.state.date} chartTitle={this.state.date.split("-")[0] + " Atmospheres"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                            <AtmosphereChart room="204" period="month" fetchingDate={this.state.date} chartTitle={getMonthAsStr(this.state.date) + " Atmospheres"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                            <AtmosphereChart room="204" period="day" fetchingDate={this.state.date} chartTitle={getMonthAsStr(this.state.date)+" "+getDayAsStr(this.state.date)+"  Atmospheres"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                        </View>
                        :
                        <View style={this.displayStyle}>
                            <TemperatureChart room="204" period="year" fetchingDate={this.state.date} chartTitle={this.state.date.split("-")[0] + " Temperatures"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                            <TemperatureChart room="204" period="month" fetchingDate={this.state.date} chartTitle={getMonthAsStr(this.state.date) + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                            <TemperatureChart room="204" period="day" fetchingDate={this.state.date} chartTitle={getMonthAsStr(this.state.date)+" "+getDayAsStr(this.state.date)+"  Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                        </View>
                    }


            </ScrollView>
        );
    }
}

export default Monitoring;
