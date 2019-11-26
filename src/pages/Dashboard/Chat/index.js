import React from 'react';
import { View, Platform } from 'react-native';

import '@firebase/firestore';
import { Thumbnail, Text } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat'
import KeyboardSpacer from 'react-native-keyboard-spacer';

import firebase from '../../../services/firebase';
import { readData } from '../../../services/storage';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fromUser: {},
            toUser: {},
            messages: [],
        };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#FF6F00',
            },
            headerTitle: navigation.getParam('header'),
        }
    }

    async componentDidMount() {
        const { navigation } = this.props;
        const user = await readData('user');
        const result = await firebase.firestore().collection('users').doc(navigation.getParam('id')).get();
        this.setState({ fromUser: user, toUser: { ...result.data(), id: result.id } });
        navigation.setParams({ header: this.headerTitle });
        await this.verifyMessages();
    }

    headerTitle = () => {
        const { toUser } = this.state;
        return (
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <Thumbnail style={{ height: 38, width: 38 }} source={{ uri: toUser.avatar_url }} />
                <Text style={{ marginLeft: 10, color: '#fff', fontSize: 18 }}>{toUser.name}</Text>
            </View>
        )
    }

    async verifyMessages() {
        const messages = [];
        const { fromUser, toUser } = this.state;
        const result = await firebase.firestore().collection('chat').doc(fromUser.id).collection(toUser.id).get();
        result.forEach(doc => messages.unshift({ ...doc.data(), createdAt: doc.data().createdAt.toDate() }));
        this.setState({ messages });
    }

    async onSend(messages) {
        const { fromUser, toUser } = this.state;
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
        await firebase.firestore().collection('chat').doc(fromUser.id).collection(toUser.id).add(messages[0]);
        await firebase.firestore().collection('chat').doc(toUser.id).collection(fromUser.id).add(messages[0]);
        await firebase.firestore().collection('last-messages').doc(fromUser.id).collection('messages').doc(toUser.id).set(messages[0]);
        await firebase.firestore().collection('last-messages').doc(toUser.id).collection('messages').doc(fromUser.id).set(messages[0]);
    }

    render() {
        const { fromUser } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    placeholder="Escreva a sua mensagem"
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: fromUser.id,
                        name: fromUser.name,
                        avatar: fromUser.avatar_url
                    }}
                />
                {Platform.OS === 'android' && <KeyboardSpacer />}
            </View>
        )
    }
}
