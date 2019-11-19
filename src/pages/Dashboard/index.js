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
} from 'native-base';

export default class Dashboard extends React.Component {
    static navigationOptions = {
        title: 'Minhas Conversas',
        headerTintColor: '#FFF',
        headerStyle: {
            backgroundColor: '#FF6F00',
        },
        headerLeft: null,
        headerRight: () => (
            <View style={{ flexDirection: 'row' }}>
                <Button transparent>
                    <Icon name='search' style={{ color: '#fff' }} />
                </Button>
                <Button transparent>
                    <Icon name='log-out' style={{ color: '#fff' }} />
                </Button>
            </View>
        ),
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