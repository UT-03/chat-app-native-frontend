import { FlatList, StyleSheet, View } from 'react-native';
import ChatMessage from './ChatMessage';
import { Text } from 'react-native';

const ChatsContainer = ({ messages }) => {
    return (
        <>
            {messages.length > 0 ? (
                <View style={styles.chatsContainer}>
                    <FlatList
                        data={messages}
                        renderItem={({ item }) => (
                            <ChatMessage
                                text={item.text}
                                fromSelf={item.fromSelf} />
                        )}
                        keyExtractor={(item, index) => index} />
                </View>
            ) : (
                <View style={styles.rootContainer}>
                    <Text>You don't have any chat with this user...</Text>
                </View>
            )}
        </>
    );
};

export default ChatsContainer;

const styles = StyleSheet.create({
    chatsContainer: {
        flex: 1,
        paddingHorizontal: 5,
        paddingVertical: 10
    },
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});