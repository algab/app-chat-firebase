import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    }

    componentDidMount() {
        setTimeout(() => {
            this.props.navigation.navigate('Login');
        }, 8000);
    }

    render() {
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
