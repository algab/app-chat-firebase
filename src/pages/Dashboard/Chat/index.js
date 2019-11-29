import React from 'react';
import { View, Platform, KeyboardAvoidingView } from 'react-native';

import '@firebase/firestore';
import { Thumbnail, Text, Icon } from 'native-base';
import { GiftedChat, Send } from 'react-native-gifted-chat'

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
                backgroundColor: '#FE5919',
                marginTop: -25
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
        this.getMessages();
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

    async getMessages() {
        const { fromUser, toUser } = this.state;
        firebase.firestore().collection('chat').doc(fromUser.id).collection(toUser.id).orderBy('createdAt')
            .onSnapshot(snapshot => {
                const messages = [];
                snapshot.docChanges().forEach(change => {
                    if (change.type === 'added') {
                        messages.unshift({ ...change.doc.data(), createdAt: change.doc.data().createdAt.toDate() })
                    }
                });
                this.setState(previousState => ({
                    messages: messages.concat(previousState.messages),
                }));
            })
    }

    async onSend(messages) {
        const { fromUser, toUser } = this.state;
        await firebase.firestore().collection('chat').doc(fromUser.id).collection(toUser.id).add(messages[0]);
        await firebase.firestore().collection('chat').doc(toUser.id).collection(fromUser.id).add(messages[0]);
        await firebase.firestore().collection('last-messages').doc(fromUser.id).collection('messages').doc(toUser.id).set(messages[0]);
        await firebase.firestore().collection('last-messages').doc(toUser.id).collection('messages').doc(fromUser.id).set(messages[0]);
    }

    renderSend = (props) => (
        <Send {...props}>
            <View style={{ marginBottom: 10, marginRight: 5 }}>
                <Icon type="MaterialCommunityIcons" name='send' style={{ color: '#3F51B5' }} />
            </View>
        </Send>
    )

    render() {
        const { fromUser } = this.state;
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    placeholder="Escreva a sua mensagem"
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    renderSend={(props) => this.renderSend(props)}
                    user={{
                        _id: fromUser.id,
                        name: fromUser.name,
                        avatar: fromUser.avatar_url
                    }}
                />
                {Platform.OS === 'android' && <KeyboardAvoidingView enabled />}
            </View>
        )
    }
}
