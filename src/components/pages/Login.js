import React, {Component} from 'react';
import {ScrollView,View,Text} from "react-native";
import PropTypes from 'prop-types';
import {screenStyle,colors} from "../../utils/constants";
import {NavigationActions} from "react-navigation";
import {Button} from "../ui/Button"

class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.displayStyle={
            flex:1,
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems: 'center',
        }

        this.textStyle={
            textAlign:'center',
            color: colors.HOOMIE_500,
            fontSize: 15,
        }
    }

    render() {
        return (
            <ScrollView style={screenStyle}>
                <View style={this.displayStyle}>
                    <Text style={this.textStyle}> Welcome to Hoomie </Text>
                    <Button text="University" onPress={() => this.props.toUniv()}/>
                    <Button text="Student" onPress={() => this.props.toStud()}/>
                </View>

            </ScrollView>
        );
    }
}

LoginScreen.propTypes={
    toUniv:PropTypes.func.isRequired,
    toStud:PropTypes.func.isRequired,
}
export default LoginScreen;
