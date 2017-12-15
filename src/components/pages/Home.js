import React, {Component} from 'react';
import {ScrollView} from "react-native";
import {screenStyle} from "../../utils/constants";
import Advice from "../ui/Advice";
import UserHeader from "../ui/UserHeader";

class HomeScreen extends Component {

    render() {
        return (
            <ScrollView style={screenStyle}>
                <UserHeader name="Guillaume"/>
                <Advice content="Do you know that if you lower your heater temperature by 1°C during the night, you'll save 7% on your energy bill ?"/>
                <Advice content="Hey ! You forgot to close your window today !"/>
            </ScrollView>
        );
    }
}

export default HomeScreen;
