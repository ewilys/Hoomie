import React from 'react';
import {
    StackNavigator,
    DrawerNavigator,NavigationActions,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './components/pages/Login';
import HomeScreen from './components/pages/Home';
import SettingsScreen from './components/pages/Settings';
import Monitoring from './components/pages/Monitoring';
import University from './components/pages/University';

import {CustomDrawerContent} from './components/index';
import {colors} from './utils/constants';

const StudentDrawer = DrawerNavigator({
    Home: {
        screen: (props)=><HomeScreen {...props} admin={false}/>,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Hoomie',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="home" size={23} color={tintColor}/>
            ),
            headerTitle: 'Hoomie',
        })
    },
    Monitoring: {
        screen: Monitoring,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Monitoring',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="timeline" size={23} color={tintColor}/>
            ),
            headerTitle: 'Monitoring',
        })
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Settings',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="settings" size={23} color={tintColor}/>
            ),
            headerTitle: 'Settings',
        })
    },
}, {
    contentComponent: props =>
        (<CustomDrawerContent
            {...props} univ={false}
        />),
    contentOptions: {
        activeBackgroundColor: colors.HOOMIE_COLOR,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.HOOMIE_COLOR,
    },
});


const UniversityDrawer = DrawerNavigator({
    Home: {
        screen: (props)=><HomeScreen {...props} admin={true}/>,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Hoomie',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="home" size={23} color={tintColor}/>
            ),
            headerTitle: 'Hoomie',
        })
    },
    University: {
        screen: University,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'General Monitoring',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="school" size={23} color={tintColor}/>
            ),
            headerTitle: 'General Monitoring',
        })
    },
    Monitoring: {
        screen: Monitoring,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Room Monitoring',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="timeline" size={23} color={tintColor}/>
            ),
            headerTitle: 'Room Monitoring',
        })
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Settings',
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="settings" size={23} color={tintColor}/>
            ),
            headerTitle: 'Settings',
        })
    },
}, {
    contentComponent: props =>
        (<CustomDrawerContent
            {...props} univ={true}
        />),
    contentOptions: {
        activeBackgroundColor: colors.HOOMIE_COLOR,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.HOOMIE_COLOR,
    },
});



const Navigator = StackNavigator({
    UnivStack: {screen: UniversityDrawer},
    StudStack:{screen:StudentDrawer},
}, {
    navigationOptions: ({navigation}) => ({
        tabBarVisible: false,
        headerStyle: {
            elevation: 0,
            padding: 10
        },
        headerTitleStyle: {
            color: colors.HOOMIE_COLOR,
            fontWeight: '100'
        },
        initialRouteName:'UnivStack',
        headerLeft: <MaterialIcons name='menu' size={30} color={colors.HOOMIE_COLOR} onPress={() => navigation.navigate('DrawerOpen')}/>,

    }),
});

export default Navigator;
