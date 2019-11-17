import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import { Item, Input, Container, Text, Button } from 'native-base';

export default class Login extends React.Component {
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
    }

    register = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        if (!this.state.isReady) {
            return <AppLoading />;
        }
        return (
            <Container style={styles.container}>
                <View style={styles.login}>
                    <Image style={styles.image} source={require("../../../assets/firebase-logo.png")} />
                    <Item rounded style={styles.item}>
                        <Input placeholder='Email' style={{ fontSize: 12 }} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Senha' secureTextEntry={true} style={{ fontSize: 12 }} />
                    </Item>
                    <Button rounded style={styles.buttonLogin}>
                        <Text style={{ fontSize: 12 }}>
                            Entrar
                        </Text>
                    </Button>
                    <Button rounded style={styles.buttonRegister} onPress={this.register}>
                        <Text style={{ fontSize: 12 }}>
                            Não tem uma conta ? Cadastrar-se
                        </Text>
                    </Button>
                </View>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    login: {
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 30,
        height: 450,
        width: 350,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
    },
    image: {
        width: 90,
        height: 90,
        marginTop: 30,
        marginBottom: 20,
    },
    item: {
        marginBottom: 10,
        width: 300,
        height: 42
    },
    buttonLogin: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        height: 42,
        marginBottom: 10,
        backgroundColor: '#4e73df'
    },
    buttonRegister: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        height: 42,
        marginBottom: 10,
        backgroundColor: '#3b5998'
    }
});
