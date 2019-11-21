import React from 'react';

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

import firebase from '../../../services/firebase';
import { readData } from '../../../services/storage';

export default class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { users: [], filterUsers: [] };
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
            this.setState({ filterUsers: result });
        }, 500);
    }

    async componentDidMount() {
        this.props.navigation.setParams({ search: this.searchName });
        const user = await readData('user');
        firebase.database().ref('users').once('value')
            .then((snapshot) => {
                const users = [];
                snapshot.forEach(data => {
                    if (data.val().email !== user.email) {
                        users.push({
                            id: data.key,
                            name: data.val().name,
                            email: data.val().email,
                            avatar_url: data.val().avatar_url,
                        });
                    }
                });
                this.setState({ users, filterUsers: users });
            });
    }

    listRender() {
        const { filterUsers } = this.state;
        return filterUsers.map(data => {
            return (
                <ListItem avatar key={data.id} button={true} onPress={() => console.log('OK')}>
                    <Left>
                        <Thumbnail source={{ uri: data.avatar_url }} />
                    </Left>
                    <Body>
                        <Text>{data.name}</Text>
                        <Text note>{data.email}</Text>
                    </Body>
                </ListItem>
            );
        });
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