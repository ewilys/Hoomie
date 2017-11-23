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
import ProfileScreen from './components/Profile';
import FavoritesScreen from './components/Favorites';
import SettingsScreen from './components/Settings';

import {HamburgerIcon, SettingsIcon, BackIcon} from './components/icons';

import {CustomDrawerContent} from './components';
import {colors} from './utils/constants';

const AppMainTab = TabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Sweet home',
            drawerIcon: ({tintColor}) => (
                <FontAwesome name="home" size={23} color={tintColor}/>
            ),
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="home" size={23} color={tintColor}/>
            ),
            headerStyle: {
                backgroundColor: colors.BLUE_100,
            },
            headerTitle: 'Sweet Home',
            headerTitleStyle: {
                color: colors.WHITE,
            },
            headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')}/>,
        })
    },
    Favorites: {
        screen: FavoritesScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Favorites',
            drawerIcon: ({tintColor}) => (
                <FontAwesome name="heartbeat" size={23} color={tintColor}/>
            ),
            tabBarLabel: 'Favorites',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="heartbeat" size={23} color={tintColor}/>
            ),
            headerStyle: {
                backgroundColor: colors.BLUE_100,
            },
            headerTitle: 'Favorites',
            headerTitleStyle: {
                color: colors.WHITE,
            },
            headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')}/>,
        })
    },
    Profile: {
        screen: ProfileScreen,
        navigationOptions: ({navigation}) => ({
            drawerLabel: 'Profile',
            drawerIcon: ({tintColor}) => (
                <FontAwesome name="user-circle" size={23} color={tintColor}/>
            ),
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) => (
                <FontAwesome name="user-circle" size={23} color={tintColor}/>
            ),
            headerStyle: {
                backgroundColor: colors.BLUE_100,
            },
            headerTitle: 'Profile',
            headerTitleStyle: {
                color: colors.WHITE,
            },
            headerLeft: <HamburgerIcon onPress={() => navigation.navigate('DrawerOpen')}/>,
            headerRight: <SettingsIcon onPress={() => navigation.navigate('Settings')}/>,
        })
    },
}, {
    tabBarOptions: {
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.BLUE_50,
        inactiveBackgroundColor: colors.BLUE_100,
        activeBackgroundColor: colors.BLUE_100,
        showIcon: true,
        showLabel: Platform.OS === 'ios',
        indicatorStyle: {
            backgroundColor: colors.BLUE_300,
        },
        style: {
            backgroundColor: colors.BLUE_100,
        },
        upperCaseLabel: false,
    },
    tabBarPosition: 'bottom',
    swipeEnabled: false,
    animationEnabled: false,
});

const AppMainStack = StackNavigator({
    Home: {screen: AppMainTab},
    Settings: {screen: SettingsScreen},
}, {
    cardStyle: {
        backgroundColor: colors.BLUE_50,
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
                backgroundColor: colors.BLUE_100,
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
        activeBackgroundColor: colors.BLUE_100,
        activeTintColor: colors.WHITE,
        inactiveTintColor: colors.BLUE_200,
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
