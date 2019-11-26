import React from 'react';

import { Root } from "native-base";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Dashboard from './src/pages/Dashboard';
import Search from './src/pages/Dashboard/Search';
import Chat from './src/pages/Dashboard/Chat';

console.disableYellowBox = true;

const App = createAppContainer(
    createStackNavigator({
        Home: {
            screen: Home,
        },
        Login: {
            screen: Login,
        },
        Register: {
            screen: Register
        },
        Dashboard: {
            screen: Dashboard
        },
        Search: {
            screen: Search
        },
        Chat: {
            screen: Chat
        },
    },
        {
            initialRouteName: 'Home'
        }
    )
);

export default () =>
    <Root>
        <App />
    </Root>;
