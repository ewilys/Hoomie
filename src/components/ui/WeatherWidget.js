/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Image, Text, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import {colors, serverIp, WEATHER_API_KEY} from "../../utils/constants";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


class WeatherWidget extends Component {
    constructor(props) {
        super(props);

        this.state={
            temperature: -999,
            weatherCode: -1,
            isLoading: false,
            hasErrored: false
        };

        this.weatherStyle = {
            flex:1,
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        };

    }

    componentDidMount() {
        this.fetchData();
    }

    fetchData(subparameters) {
        fetch(`http://api.openweathermap.org/data/2.5/weather?q=Lyon,fr&appid=` + WEATHER_API_KEY)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }
                this.dataAreLoading();

                return response;
            })
            .then((response) => response.json())
            .then((temperatures) => this.dataFetchSuccess(temperatures, subparameters))
            .catch(() => this.dataHaveErrored());
    }

    dataFetchSuccess(data, subparameters) {
        this.setState({
            temperature: Math.round(parseFloat(data.main.temp) - 273.15),
            weatherCode: data.weather[0].id,
            isLoading: false,
            hasErrored: false
        });
    }

    dataAreLoading() {
        this.setState({
            isLoading: true
        })
    }


    dataHaveErrored() {
        this.setState({
            hasErrored: true
        });
    }

    static getWeatherName(code) {
        //Thunderstorm
        if(200 <= code && code < 300) {
            return "weather-lightning"
        }
        //Drizzle
        else if(300 <= code && code < 400) {
            return "weather-rainy"
        }
        //Rain
        else if(500 <= code && code < 600) {
            return "weather-rainy"
        }
        //Snow
        else if(600 <= code && code < 700) {
            return "weather-snowy"
        }
        //Atmosphere
        else if(700 <= code && code < 800) {
            return "weather-fog"
        }
        //Clear
        else if(code === 800) {
            return "weather-sunny"
        }
        //Cloudy
        else if(800 < code && code < 900) {
            return "weather-cloudy"
        }
    }

    render() {
        let name = WeatherWidget.getWeatherName(this.state.weatherCode);
        return (
            <View style={this.weatherStyle}>
                <MaterialCommunityIcons name={name} size={30} color={"#555555"}/>
                <Text> {this.state.temperature} °C</Text>
            </View>
        );
    }
}

WeatherWidget.propTypes = {

};

export default WeatherWidget;