import React from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Modal, ActivityIndicator } from 'react-native';

import md5 from 'md5';
import { Item, Input, Text, Button, Toast } from 'native-base';

import firebase from '../../services/firebase';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: null,
            email: null,
            password: null,
            confirm: null,
            modal: false,
            button: true
        };
    }

    static navigationOptions = {
        header: null
    }

    handleChange(target, value) {
        if (target === 'password' || target === 'confirm') {      
            if (value.length <= 6) {
                Toast.show({
                    text: 'Senha precisa ter mais de 6 caracteres.',
                    type: 'warning',
                    position: 'top'
                });
            } else {
                this.setState({ [target]: value });                
            }
        } else {
            this.setState({ [target]: value });
        }
        const { name, email, password, confirm } = this.state;     
        if (name !== null && email !== null && password !== null && confirm !== null) {
            this.setState({ button: false });
        } else {
            this.setState({ button: true });
        }
    }

    changeModal() {
        this.setState({ modal: !this.state.modal });
    }

    saveRegister = async () => {
        try {
            this.changeModal();
            const { name, email, password, confirm } = this.state;
            if (password === confirm) {                
                await firebase.database().ref('users').push({
                    name,
                    email,
                    avatar_url: `https://www.gravatar.com/avatar/${md5(email.toLowerCase())}?d=identicon`,
                });
                await firebase.auth().createUserWithEmailAndPassword(email, password);                
            } else {
                Toast.show({
                    text: 'Senhas incorretas.',
                    type: 'warning',
                    position: 'top'
                });
            }
            this.changeModal();
        } catch (error) {
            this.changeModal();
            console.log(error);            
            Toast.show({
                text: 'Por favor, tente novamente mais tarde.',
                type: 'danger',
                position: 'top'
            });
        }
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <View style={styles.login}>
                    <Text style={styles.text}>Cadastrar-se</Text>
                    <View style={styles.separator}></View>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Nome' style={{ fontSize: 12 }} onChange={(ev) => this.handleChange('name', ev.nativeEvent.text.trim(' '))} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Email' style={{ fontSize: 12 }} onChange={(ev) => this.handleChange('email', ev.nativeEvent.text)} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Senha' secureTextEntry={true} style={{ fontSize: 12 }} onChange={(ev) => this.handleChange('password', ev.nativeEvent.text)} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Confirmar Senha' secureTextEntry={true} style={{ fontSize: 12 }} onChange={(ev) => this.handleChange('confirm', ev.nativeEvent.text)} />
                    </Item>
                    <Button rounded style={styles.button} onPress={this.saveRegister} disabled={this.state.button}>
                        <Text style={{ fontSize: 12 }}>
                            Salvar
                        </Text>
                    </Button>
                </View>
                <Modal animationType="slide" transparent visible={this.state.modal}>
                    <View style={styles.test}>
                        <View style={styles.background}>
                            <ActivityIndicator size="large" color="#fff" />
                            <Text style={{ color: '#fff' }}>Carregando...</Text>
                        </View>
                    </View>
                </Modal>
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
    },
    test: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.25)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    },
    background: {
        position: 'absolute',
        top: -0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
});
