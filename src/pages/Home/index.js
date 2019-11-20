import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { StackActions, NavigationActions } from 'react-navigation';

import firebase from '../../services/firebase';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isReady: false };
    }

    static navigationOptions = {
        header: null
    }

    async componentDidMount() {
        await Font.loadAsync({
            Roboto: require('../../../node_modules/native-base/Fonts/Roboto.ttf'),
            Roboto_medium: require('../../../node_modules/native-base/Fonts/Roboto_medium.ttf'),
            ...Ionicons.font,
        });
        this.setState({ isReady: true });
        await firebase.auth().onAuthStateChanged(user => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [NavigationActions.navigate({ routeName: user ? 'Dashboard' : 'Login' })],
            });
            this.props.navigation.dispatch(resetAction);
            // this.props.navigation.navigate('Login');
        })
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center'
    }
});
