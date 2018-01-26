import React, {Component} from 'react';
import {ScrollView,View,Text} from "react-native";
import PropTypes from 'prop-types';
import {screenStyle,colors} from "../../utils/constants";
import Advice from "../ui/Advice";
import UserHeader from "../ui/UserHeader";
import {dateToString, getCurrentDay, getCurrentMonth, getCurrentYear, getGreeting} from "../../utils/methods";

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: getCurrentDay(),
            greeting : getGreeting(),
            updates:true,
           // admin : true,

        }

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



    _onDateChange(date) {

        this.setState({
            date: dateToString(date)
        });
    }

    render() {
        return (
            <ScrollView style={screenStyle}>
                <UserHeader onDateChange={this._onDateChange.bind(this)} currentDate={this.state.date}/>
                {this.props.admin ?
                    <View style={this.displayStyle}>
                        <Text style={this.textStyle}> Good {this.state.greeting}, Jean-Luc </Text>
                        <Advice content="You should consider heating up the residency E 1 hour sooner in the morning, students are cold !"/>
                        <Advice content="The pollution level in residency G is above the mean value, you might want to have the airing system checked."/>

                    </View>
                :
                    <View style={this.displayStyle}>
                        <Text style={this.textStyle}> Good {this.state.greeting}, Luke </Text>
                        <Advice content="Did you know that if you lower the temperature by 1°C at night, you can save up to 7% on your energy bill ?"/>
                        <Advice content="Hey ! You forgot to close the window !"/>

                    </View>
                }

            </ScrollView>
        );
    }
}


HomeScreen.propTypes={
    admin: PropTypes.bool.isRequired,
}
export default HomeScreen;
