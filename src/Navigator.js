import React from 'react';
import {
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import HomeScreen from './components/pages/Home';
import SettingsScreen from './components/pages/Settings';
import MonitoringScreen from './components/pages/Monitoring';

import {CustomDrawerContent} from './components/index';
import {colors} from './utils/constants';

const AppDrawer = DrawerNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Hoomie',
            drawerIcon: <MaterialIcons name="home" size={23} color={colors.HOOMIE_COLOR}/>,
            headerTitle: 'Hoomie',
        })
    },
    Monitoring: {
        screen: MonitoringScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Monitoring',
            drawerIcon: <MaterialIcons name="timeline" size={23} color={colors.HOOMIE_COLOR}/>,
            headerTitle: 'Monitoring',
        })
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Settings',
            drawerIcon: <MaterialIcons name="settings" size={23} color={colors.HOOMIE_COLOR}/>,
            headerTitle: 'Settings',
        })
    },
}, {
    contentComponent: props =>
        (<CustomDrawerContent
            {...props}
        />),
    contentOptions: {
        activeBackgroundColor: colors.HOOMIE_COLOR,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.HOOMIE_COLOR,
    },
});

const Navigator = StackNavigator({
    Main: {screen: AppDrawer},
}, {
    navigationOptions: ({navigation}) => ({
        tabBarVisible: false,
        activeBackgroundColor: colors.WHITE,
        headerStyle: {
            elevation: 0,
            padding: 10
        },
        headerTitleStyle: {
            color: colors.HOOMIE_COLOR,
        },
        headerLeft: <MaterialIcons name='more-horiz' size={30} color={colors.HOOMIE_COLOR} onPress={() => navigation.navigate('DrawerClose')}/>,
    }),
});

export default Navigator;
