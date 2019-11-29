import React from 'react';
import { StyleSheet, View, Image, Alert, KeyboardAvoidingView, StatusBar } from 'react-native';

import '@firebase/firestore';

import { Item, Input, Text, Button } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import Loader from '../../components/Loader';

import firebase from '../../services/firebase';
import { storeData } from '../../services/storage';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = { email: null, password: null, loading: false };
    }

    static navigationOptions = {
        header: null
    }

    signIn = () => {
        const { email, password } = this.state;
        this.setState({ loading: true });
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(async () => {
                await this.storageData(email);
                this.setState({ loading: false });
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch((err) => {
                this.setState({ loading: false });
                if (err.code === 'auth/wrong-password') {
                    Alert.alert('Aviso', 'E-mail ou senha incorretos.');
                } else {
                    Alert.alert('Erro', 'Por favor, tente novamente mais tarde.');
                }
            });
    }

    register = () => {
        this.props.navigation.navigate('Register');
    }

    async storageData(email) {
        const user = await firebase.firestore().collection('users').where('email', '==', email).get();
        user.forEach(async doc => await storeData('user', { ...doc.data(), id: doc.id }));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} enabled>
                <StatusBar backgroundColor="#808080" barStyle="light-content" />
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
                        <Text style={{ fontSize: 12, color: '#3F51B5' }}>
                            Não tem uma conta ? Cadastrar-se
                        </Text>
                    </Button>
                </View>
            </KeyboardAvoidingView>
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
