import React, {Component} from 'react';
import {Picker, RefreshControl, ScrollView,View,Switch,Text} from "react-native";
import {screenStyle,colors} from "../../utils/constants";
import {getCurrentDay, getMonthAsStr, getDayAsStr} from "../../utils/methods";
import TemperatureChart from "../ui/TemperatureChart";
import CalendarWidget from "../ui/CalendarWidget";
import AtmosphereChart from "../ui/AtmosChart";

class University extends Component {
    constructor() {
        super();

        this.state={
            isRefreshing: false,
            date: getCurrentDay(),
            room: "all"
        };

        this.headerUniversityStyle={
            flex:1,
            flexDirection:'row',
            justifyContent: 'space-around',
            alignItems: 'center',
        };

        this.displayStyle={
            flex:1,
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems: 'center',
        }
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
                <View style={this.headerUniversityStyle}>
                    <Picker style={{width: 200}} itemStyle={{fontSize: 15, fontWeight: '100'}} selectedValue={this.state.room} onValueChange={(itemValue, itemIndex) => this.setState({room: itemValue})} mode='dropdown'>
                        <Picker.Item label="All Rooms" value="all" />
                    </Picker>
                    <CalendarWidget onDateChange={this._onDateChange.bind(this)} currentDate={this.state.date}/>
                </View>
                <View style={{flex:1,flexDirection:'row',justifyContent:'flex-end',alignItems:'center'}}>
                    <Text style={[this.toggleText,{textAlign:'right'}]}> Temperatures </Text>
                    <Switch value={this.state.atmosphereDisplay} onValueChange={(value)=>this.setState({atmosphereDisplay:value})}/>
                    <Text style={this.toggleText}> Atmosphere </Text>
                </View>

                {this.state.atmosphereDisplay ?
                    <View style={this.displayStyle}>
                        <AtmosphereChart admin={true} period="year" fetchingDate={this.state.date} room={this.state.room} chartTitle={this.state.date.split("-")[0] + " Atmospheres"} subparameters={{period: "year"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                        <AtmosphereChart admin={true} period="month" fetchingDate={this.state.date} room={this.state.room} chartTitle={getMonthAsStr(this.state.date) + " Atmospheres"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                        <AtmosphereChart admin={true} period="day" fetchingDate={this.state.date} room={this.state.room} chartTitle={getMonthAsStr(this.state.date)+" "+getDayAsStr(this.state.date)+"  Atmospheres"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                    </View>
                    :
                    <View style={this.displayStyle}>
                        <TemperatureChart admin={true} period="month" fetchingDate={this.state.date}  room={this.state.room} chartTitle={getMonthAsStr(this.state.date) + " Temperatures"} subparameters={{period: "month"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                        <TemperatureChart admin={true} period="day" fetchingDate={this.state.date} room={this.state.room} chartTitle={getMonthAsStr(this.state.date)+" "+getDayAsStr(this.state.date)+"  Temperatures"} subparameters={{period: "day"}} homeRefreshing={this.state.isRefreshing} homeRefreshed={this.hasRefreshed.bind(this)}/>
                    </View>
                }

            </ScrollView>
        );
    }
}

export default University;
