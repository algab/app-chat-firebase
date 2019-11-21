import React from 'react';

import { Root } from "native-base";
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';
import Dashboard from './src/pages/Dashboard';
import Search from './src/pages/Dashboard/Search';

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
