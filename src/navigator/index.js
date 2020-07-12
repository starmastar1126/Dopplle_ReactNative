import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,  Image,} from 'react-native';
import { Avatar, Badge, Icon, withBadge } from 'react-native-elements'
import {createStackNavigator,createAppContainer,createBottomTabNavigator} from 'react-navigation';

import HomePage from '../screens/homePage';
import ForgotPage from '../screens/forgotPage'
import RegisterPage from '../screens/registerPage'
import ProfilePage from '../screens/profilePage'
import ResetPage from '../screens/resetPage'
import MenuPage from '../screens/menuPage'

const AppContain =   createStackNavigator({
    Home: { screen: HomePage ,navigationOptions: { header: null }},
    Forgot:{screen:ForgotPage,navigationOptions: { header: null }},
    Register:{screen:RegisterPage,navigationOptions: { header: null }},
    Profile:{screen:ProfilePage,navigationOptions: { header: null }},
    Reset:{screen:ResetPage,navigationOptions: { header: null }},
    Menu:{screen:MenuPage,navigationOptions: { header: null }},
},);


export default AppContain