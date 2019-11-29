import React from 'react';
import { StyleSheet, View, Alert, KeyboardAvoidingView } from 'react-native';

import '@firebase/firestore';

import md5 from 'md5';
import { Text } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import { Form } from './Form';

import Loader from '../../components/Loader';

import firebase from '../../services/firebase';
import { storeData } from '../../services/storage';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false };
    }

    static navigationOptions = {
        header: null
    }

    saveRegister = (values) => {
        this.setState({ loading: true });
        const { name, email, password } = values;
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(async () => {
                await firebase.firestore().collection('users').add({
                    name,
                    email,
                    avatar_url: `https://www.gravatar.com/avatar/${md5(email.toLowerCase())}?d=identicon`,
                });
                await this.storageData(email);
                this.setState({ loading: false });
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Dashboard' })],
                });
                this.props.navigation.dispatch(resetAction);
            })
            .catch(err => {
                this.setState({ loading: false });
                if (err.code === 'auth/email-already-in-use') {
                    Alert.alert('Aviso', 'E-mail indisponível, tente outro.');
                } else {
                    Alert.alert('Erro', 'Por favor, tente novamente mais tarde.');
                }
            });
    }

    async storageData(email) {
        const user = await firebase.firestore().collection('users').where('email', '==', email).get();
        user.forEach(async doc => await storeData('user', { ...doc.data(), id: doc.id }));
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Loader loading={this.state.loading} />
                <View style={styles.register}>
                    <Text style={styles.text}>Cadastrar-se</Text>
                    <View style={styles.separator}></View>
                    <Form submit={this.saveRegister} />
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
    register: {
        alignItems: 'center',
        backgroundColor: '#fff',
        elevation: 30,
        height: 455,
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
    text: {
        fontSize: 24,
        letterSpacing: 1.5,
        marginTop: 30,
    },
    separator: {
        backgroundColor: '#000',
        width: 120,
        height: 2,
        marginBottom: 30,
    },
    item: {
        marginBottom: 10,
        width: 300,
        height: 42
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        width: 300,
        height: 42,
        marginBottom: 10,
        backgroundColor: '#4e73df'
    }
});
