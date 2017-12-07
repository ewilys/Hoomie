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
            drawerIcon: ({tintColor}) => (
                <MaterialIcons name="home" size={23} color={tintColor}/>
            ),
            headerTitle: 'Hoomie',
        })
    },
    Monitoring: {
        screen: MonitoringScreen,
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
        headerStyle: {
            elevation: 0,
            padding: 10
        },
        headerTitleStyle: {
            color: colors.HOOMIE_COLOR,
        },
        headerLeft: <MaterialIcons name='more-vert' size={30} color={colors.HOOMIE_COLOR} onPress={() => navigation.navigate('DrawerOpen')}/>,
    }),
});

export default Navigator;
