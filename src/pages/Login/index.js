import React from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';

import { Item, Input, Container, Text, Button } from 'native-base';

import Loader from '../../components/Loader';

import firebase from '../../services/firebase';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: null, password: null, loading: false };
    }

    static navigationOptions = {
        header: null
    }

    signIn = () => {
        this.setState({ loading: true });
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then(() => {
                this.setState({ loading: false });
                this.props.navigation.navigate('Dashboard');
            })
            .catch(err => {
                this.setState({ loading: false });
            });
    }

    register = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <Container style={styles.container}>
                <Loader loading={this.state.loading} />
                <View style={styles.login}>
                    <Image style={styles.image} source={require("../../../assets/firebase-logo.png")} />
                    <Item rounded style={styles.item}>
                        <Input placeholder='Email' style={{ fontSize: 12 }} onChangeText={(email) => this.setState({ email })} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Senha' secureTextEntry={true} style={{ fontSize: 12 }} onChangeText={(password) => this.setState({ password })} />
                    </Item>
                    <Button rounded style={styles.buttonLogin} onPress={this.signIn}>
                        <Text style={{ fontSize: 12 }}>
                            Entrar
                        </Text>
                    </Button>
                    <Button transparent style={styles.buttonRegister} onPress={this.register}>
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
        height: Dimensions.get('window').height,
    },
    login: {
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 30,
        height: 420,
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
        marginTop: 0,
    }
});
