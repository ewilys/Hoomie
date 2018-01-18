import React, {Component} from 'react';
import {ScrollView,View} from "react-native";
import PropTypes from 'prop-types';
import {screenStyle} from "../../utils/constants";
import Advice from "../ui/Advice";
import UserHeader from "../ui/UserHeader";
import {dateToString, getCurrentDay, getCurrentMonth, getCurrentYear, getGreeting} from "../../utils/methods";

class HomeScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            date: getCurrentDay(),
            greeting : getGreeting(),

        }

        this.displayStyle={
            flex:1,
            flexDirection:'column',
            justifyContent:'space-around',
            alignItems: 'center',
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
                        <Text style={{textAlign:'center'}}> Good {this.state.greeting}, administrator </Text>
                        <Advice content="You should consider to heat up Residence E one hour sooner in the morning "/>
                        <Advice content="It seems that pollution level in Residence G is too high , you might take a look at your airing system"/>

                    </View>
                :
                    <View style={this.displayStyle}>
                        <Text style={{textAlign:'center'}}> Good {this.state.greeting}, Luke </Text>
                        <Advice content="Do you know that if you lower your heater temperature by 1°C during the night, you'll save 7% on your energy bill ?"/>
                        <Advice content="Hey ! You forgot to close your window today !"/>

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
