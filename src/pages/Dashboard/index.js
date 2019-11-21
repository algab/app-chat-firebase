import React from 'react';
import { View } from 'react-native';

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
    Toast,
} from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import firebase from '../../services/firebase';
import { removeData } from '../../services/storage';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: 'Minhas Conversas',
            headerTintColor: '#FFF',
            headerStyle: {
                backgroundColor: '#FF6F00',
            },
            headerLeft: null,
            headerRight: () => (
                <View style={{ flexDirection: 'row' }}>
                    <Button transparent onPress={() => navigation.navigate('Search')}>
                        <Icon name='search' style={{ color: '#fff' }} />
                    </Button>
                    <Button transparent onPress={navigation.getParam('signOut')}>
                        <Icon name='log-out' style={{ color: '#fff' }} />
                    </Button>
                </View>
            ),
        }
    }

    componentDidMount() {
        this.props.navigation.setParams({ signOut: this.signOut });
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
            })
            .catch(() => {
                Toast.show({
                    text: 'Por favor, tente novamente mais tarde.',
                    type: 'danger',
                    position: 'top'
                });
            })
    }

    render() {
        return (
            <Container>
                <Content>
                    <List>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.gravatar.com/avatar/afaf2a2b5191167f6ce0d32ee8216372?d=identicon' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.gravatar.com/avatar/afaf2a2b5191167f6ce0d32ee8216372?d=identicon' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.gravatar.com/avatar/afaf2a2b5191167f6ce0d32ee8216372?d=identicon' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.gravatar.com/avatar/afaf2a2b5191167f6ce0d32ee8216372?d=identicon' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                        <ListItem avatar>
                            <Left>
                                <Thumbnail source={{ uri: 'https://www.gravatar.com/avatar/afaf2a2b5191167f6ce0d32ee8216372?d=identicon' }} />
                            </Left>
                            <Body>
                                <Text>Kumar Pratik</Text>
                                <Text note>Doing what you like will always keep you happy . .</Text>
                            </Body>
                            <Right>
                                <Text note>3:43 pm</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}