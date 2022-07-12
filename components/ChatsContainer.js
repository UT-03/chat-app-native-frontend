import { FlatList, StyleSheet, View } from 'react-native';
import ChatMessage from './ChatMessage';

const DUMMY_MESSAGES = [
    {
        id: '1',
        text: 'Hello',
        fromSelf: true
    },
    {
        id: '2',
        text: 'Hi!',
        fromSelf: false
    },
    {
        id: '5',
        text: 'How are you?',
        fromSelf: true
    },
    {
        id: '8',
        text: 'How are you? This is a long message. This is very long message...',
        fromSelf: true
    },
    {
        id: '9',
        text: 'How are you? This is a long message. This is very long message...',
        fromSelf: true
    },
    {
        id: '10',
        text: 'How are you? This is a long message. This is very long message...',
        fromSelf: true
    },
    {
        id: '11',
        text: 'How are you? This is a long message. This is very long message...',
        fromSelf: true
    },
]

const ChatsContainer = () => {
    return (
        <View style={styles.chatsContainer}>
            <FlatList
                data={DUMMY_MESSAGES}
                renderItem={({ item }) => (
                    <ChatMessage
                        text={item.text}
                        fromSelf={item.fromSelf} />
                )}
                keyExtractor={item => item.id} />
        </View>
    );
};

export default ChatsContainer;

const styles = StyleSheet.create({
    chatsContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
})