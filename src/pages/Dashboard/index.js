import React from 'react';
import { View, StatusBar } from 'react-native';

import '@firebase/firestore';
import { format } from 'date-fns';
import {
    Container,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Right,
    Text,
    Button,
    Thumbnail,
    Icon,
} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import firebase from '../../services/firebase';
import { readData, removeData } from '../../services/storage';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = { messages: [], loading: true };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Minhas Conversas',
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#FE5919',
                marginTop: -25
            },
            headerLeft: null,
            headerRight: () => (
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Button transparent onPress={() => navigation.navigate('Search')}>
                        <Icon name='search' style={{ color: '#fff' }} />
                    </Button>
                    <Button transparent onPress={navigation.getParam('signOut')}>
                        <Icon type="MaterialCommunityIcons" name='logout' style={{ color: '#fff' }} />
                    </Button>
                </View>
            ),
        }
    }

    async componentDidMount() {
        const user = await readData('user');
        this.props.navigation.setParams({ signOut: this.signOut });
        firebase.firestore().collection('last-messages').doc(user.id).collection('messages')
            .onSnapshot(snapshot => {
                const messages = [];
                snapshot.forEach(doc => {
                    messages.push({ ...doc.data(), createdAt: doc.data().createdAt.toDate(), id: doc.id });
                });
                this.searchUsers(messages);
            })
    }

    searchUsers(messages) {
        const map = messages.map(async data => {
            const user = await firebase.firestore().collection('users').doc(data.id).get();
            return { ...data, user: user.data() };
        });
        Promise.all(map).then(data => {
            data.sort((obj1, obj2) => {
                if (new Date(obj1.createdAt) < new Date(obj2.createdAt)) {
                    return 1;
                }
                if (new Date(obj1.createdAt) > new Date(obj2.createdAt)) {
                    return -1;
                }
                return 0;
            });
            this.setState({ messages: data, loading: false });
        });
    }

    signOut = () => {
        firebase.auth().signOut()
            .then(async () => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [NavigationActions.navigate({ routeName: 'Login' })],
                });
                this.props.navigation.dispatch(resetAction);
                await removeData('user');
            });
    }

    listChat() {
        const { messages } = this.state;
        const { navigation } = this.props;
        if (messages.length === 0) {
            return this.skeleton([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        } else {
            return messages.map(data => (
                <ListItem avatar key={data.id} button={true} onPress={() => navigation.navigate('Chat', { id: data.id })}>
                    <Left>
                        <Thumbnail style={{ width: 40, height: 40 }} source={{ uri: data.user.avatar_url }} />
                    </Left>
                    <Body>
                        <Text>{data.user.name}</Text>
                        <Text note>{data.text}</Text>
                    </Body>
                    <Right>
                        <Text note>{`${format(data.createdAt, 'HH:mm')}`}</Text>
                    </Right>
                </ListItem>
            ));
        }
    }

    skeleton(arr) {
        const { loading } = this.state;
        return arr.map((data, index) => (
            <ListItem avatar key={index}>
                <Left>
                    <ShimmerPlaceHolder style={{ width: 37, height: 37, borderRadius: 18 }} autoRun={true} visible={!loading} />
                </Left>
                <Body>
                    <ShimmerPlaceHolder style={{ height: 10, marginBottom: 10 }} autoRun={true} visible={!loading} />
                    <ShimmerPlaceHolder autoRun={true} visible={!loading} />
                </Body>
                <Right>
                    <ShimmerPlaceHolder style={{ width: 30 }} autoRun={true} visible={!loading} />
                </Right>
            </ListItem>
        ));
    }

    render() {
        const { messages, loading } = this.state;
        if (messages.length === 0 && loading === false) {
            return (
                <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <StatusBar backgroundColor="#FE5919" barStyle="dark-content" />
                    <Text style={{ color: 'gray', fontSize: 12 }}>NENHUMA CONVERSA</Text>
                </Container>
            )
        } else {
            return (
                <Container>
                    <StatusBar backgroundColor="#FE5919" barStyle="dark-content" />
                    <Content>
                        <List>
                            {this.listChat()}
                        </List>
                    </Content>
                </Container>
            )
        }
    }
}