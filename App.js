import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Home from './src/pages/Home';
import Login from './src/pages/Login';
import Register from './src/pages/Register';

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
    },
        {
            initialRouteName: 'Home'
        }
    )
);

export default App;