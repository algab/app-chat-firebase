import React from 'react';

import '@firebase/firestore';
import {
    Container,
    Content,
    List,
    ListItem,
    Left,
    Body,
    Text,
    Thumbnail,
    Icon,
    Item,
    Input,
} from 'native-base';
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder';

import firebase from '../../../services/firebase';
import { readData } from '../../../services/storage';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], filter: [], loading: true };
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#FF6F00',
            },
            headerTitle: () => (
                <Item>
                    <Icon active name='search' style={{ color: '#fff' }} />
                    <Input placeholder='Pesquisar' onChangeText={navigation.getParam('search')} />
                </Item>
            ),
        }
    }

    searchName = (text) => {
        setTimeout(() => {
            const result = [];
            const { users } = this.state;
            users.map(data => {
                if (data.name.search(new RegExp(text, 'i')) !== -1) {
                    result.push(data);
                }
            });
            this.setState({ filter: result });
        }, 500);
    }

    async componentDidMount() {
        this.props.navigation.setParams({ search: this.searchName });
        const user = await readData('user');
        firebase.firestore().collection('users').get()
            .then(snapshot => {
                const users = [];
                snapshot.forEach(doc => {
                    if (doc.data().email !== user.email) {
                        users.push({ ...doc.data(), id: doc.id });
                    }
                });
                this.setState({ users, filter: users, loading: false });
            });
    }

    listRender() {
        const { filter } = this.state;
        const { navigation } = this.props;
        if (filter.length === 0) {
            return this.skeleton([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        } else {
            return filter.map(data => (
                <ListItem avatar key={data.id} button={true} onPress={() => navigation.navigate('Chat', { id: data.id })}>
                    <Left>
                        <Thumbnail style={{ height: 40, width: 40 }} source={{ uri: data.avatar_url }} />
                    </Left>
                    <Body>
                        <Text>{data.name}</Text>
                        <Text note>{data.email}</Text>
                    </Body>
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
            </ListItem>
        ));
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        {this.listRender()}
                    </List>
                </Content>
            </Container>
        )
    }
}