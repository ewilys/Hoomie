/**
 Created by Guillaume Ferron on the 12/15/2017
 **/

import React, { Component } from 'react';
import {Image, Text, View} from "react-native";
import PropTypes from 'prop-types';
const Dimensions = require('Dimensions');

import {MAPS_API_KEY} from "../../utils/constants";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


class LocationWidget extends Component {
    constructor(props) {
        super(props);

        this.state={
            location: "Lyon",
            isLoading: false,
            hasErrored: false
        };

        this.locationStyle = {
            flex:1,
            flexDirection: 'row',
            justifyContent:'center',
            alignItems: 'center',
        };

    }

    componentDidMount() {
        //this.fetchData();
    }

    fetchData(subparameters) {
        fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=` + MAPS_API_KEY)
            .then((response) => {
                console.log(response);
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
            location: "Paris",
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

    render() {
        return (
            <View style={this.locationStyle}>
                <MaterialIcons name="location-on" size={30} color={"#555555"}/>
                <Text> {this.state.location}</Text>
            </View>
        );
    }
}

LocationWidget.propTypes = {
};

export default LocationWidget;