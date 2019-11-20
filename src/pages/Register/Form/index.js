import React from 'react';
import { View, StyleSheet } from 'react-native';

import { Formik } from 'formik';
import { Item, Input, Button, Text } from 'native-base';

function validate(values) {
    const errors = {};
    if (values.name === '') {
        errors.name = 'Campo obrigatório';
    } else {
        delete errors.name;
    }

    if (values.email === '') {
        errors.email = 'Campo obrigatório';
    } else {
        delete errors.email;
    }

    if (values.password.length <= 6) {
        errors.password = 'Senha precisa ter mais de 6 caracteres.';
    } else {
        delete errors.password;
    }

    if (values.confirm.length <= 6 || values.confirm !== values.password) {
        errors.confirm = 'Repita a mesma senha digitada anteriormente.';
    } else {
        delete errors.confirm;
    }

    return errors;
}

export const Form = props => (
    <Formik
        initialValues={{ name: '', email: '', password: '', confirm: '' }}
        validate={values => validate(values)}
        onSubmit={values => props.submit(values)}
    >
        {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
            <View>
                <View style={styles.field}>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Nome' style={styles.text} onChangeText={handleChange('name')} />
                    </Item>
                    {errors.name && <Text style={styles.validate}>{errors.name}</Text>}
                </View>
                <View style={styles.field}>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Email' style={styles.text} onChangeText={handleChange('email')} />
                    </Item>
                    {errors.email && <Text style={styles.validate}>{errors.email}</Text>}
                </View>
                <View style={styles.field}>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Senha' secureTextEntry={true} style={styles.text} onChangeText={handleChange('password')} />
                    </Item>
                    {errors.password && <Text style={styles.validate}>{errors.password}</Text>}
                </View>
                <View style={styles.field}>
                    <Item rounded style={styles.item}>
                        <Input placeholder='Confirmar Senha' secureTextEntry={true} style={styles.text} onChangeText={handleChange('confirm')} />
                    </Item>
                    {errors.confirm && <Text style={styles.validate}>{errors.confirm}</Text>}
                </View>
                <Button rounded style={styles.button} onPress={handleSubmit}>
                    <Text style={styles.text}>
                        Salvar
                    </Text>
                </Button>
            </View>
        )}
    </Formik>
);

const styles = StyleSheet.create({
    field: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: 300,
    },
    item: {
        marginBottom: 10,
        height: 42
    },
    text: {
        fontSize: 12,
    },
    validate: {
        fontSize: 12,
        color: 'red',
        marginBottom: 5,
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
