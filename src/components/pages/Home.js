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
                        <Text style={this.textStyle}> Good {this.state.greeting}, administrator </Text>
                        <Advice content="Vous devriez pensez à chauffer la résidence E 1 heure plus tôt le matin, certains étudiants ont froid !"/>
                        <Advice content="Le niveau de pollution dans la résidence G est plus haut que la moyenne, vous devriez faire vérifier la ventilation !"/>

                    </View>
                :
                    <View style={this.displayStyle}>
                        <Text style={this.textStyle}> Good {this.state.greeting}, Luke </Text>
                        <Advice content="Savais tu que si tu baisses le chauffage de 1°C pendant la nuit, tu peux économiser jusqu'à 7% sur ta facture ?"/>
                        <Advice content="Hey ! Tu as oublié de fermer la fenêtre !"/>

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
