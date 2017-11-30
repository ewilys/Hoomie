import React from 'react';
import Platform from 'react-native';
import {
    TabNavigator,
    StackNavigator,
    DrawerNavigator,
} from 'react-navigation';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './components/Home';
import SettingsScreen from './components/Settings';

import {HamburgerIcon, SettingsIcon, BackIcon} from './components/icons';

import {CustomDrawerContent} from './components';
import {colors} from './utils/constants';

const AppMainTab = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Hoomie',
            drawerIcon: ({tintColor}) => (
                <FontAwesome name="home" size={23} color={tintColor}/>
            ),
            headerStyle: {
                backgroundColor: colors.WHITE,
                elevation: 0
            },
            headerTitle: 'Hoomie',
            headerTitleStyle: {
                color: colors.HOOMIE_COLOR,

            },
            headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')}/>,
            tabBarVisible: false
        })
    }
}, {
    swipeEnabled: false,
    animationEnabled: false,
});

const AppMainStack = StackNavigator({
    Home: {screen: AppMainTab},
    Settings: {screen: SettingsScreen},
}, {
    cardStyle: {
        backgroundColor: colors.WHITE,
    },
    mode: 'modal',
});

const AppDrawer = DrawerNavigator({
    Home: {
        screen: AppMainStack,
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Settings',
            drawerIcon: ({tintColor}) => (
                <Ionicons name="gear" size={23} color={tintColor}/>
            ),
            headerStyle: {
                backgroundColor: colors.HOOMIE_100,
            },
            headerTitle: 'Settings',
            headerTitleStyle: {
                color: colors.WHITE,
            },
            headerLeft: <BackIcon onPress={() => navigation.goBack()}/>,
        })
    },
}, {
    contentComponent: props =>
        (<CustomDrawerContent
            {...props}
        />),
    contentOptions: {
        activeBackgroundColor: colors.HOOMIE_100,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.HOOMIE_200,
    },
});

const Navigator = TabNavigator({
    Main: {screen: AppDrawer},
}, {
    navigationOptions: {
        tabBarVisible: false,
    },
    swipeEnabled: false,
});

export default Navigator;
