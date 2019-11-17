import React from 'react';
import { StyleSheet, View } from 'react-native';

import { Item, Input, Container, Text, Button } from 'native-base';

export default class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Container style={styles.container}>
                <View style={styles.login}>
                    <Text style={styles.text}>Cadastrar-se</Text>
                    <View style={styles.separator}></View>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Nome' style={{ fontSize: 12 }} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Email' style={{ fontSize: 12 }} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Senha' secureTextEntry={true} style={{ fontSize: 12 }} />
                    </Item>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Confirmar Senha' secureTextEntry={true} style={{ fontSize: 12 }} />
                    </Item>
                    <Button rounded style={styles.button}>
                        <Text style={{ fontSize: 12 }}>
                            Salvar
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
