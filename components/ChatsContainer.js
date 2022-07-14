import { useContext, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, StyleSheet, View } from 'react-native';
import variables from '../Constants/envVariables';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import ChatMessage from './ChatMessage';
import { Text } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';

const ChatsContainer = ({ userId }) => {
    const [messages, setMessages] = useState([]);

    const { isLoading, sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);

    useEffect(() => {
        const fetchMessages = async () => {
            const messages$ = await sendRequest(
                `${variables.backendHost}/user/messages/${userId}`,
                'GET',
                null,
                {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + auth.token
                }
            )
            setMessages(messages$.messages);
        }
        fetchMessages();
    }, []);

    return (
        <>
            {isLoading ? (
                <View style={styles.rootContainer}>
                    <ActivityIndicator size='large' color={GlobalStyles.colors.primary400} />
                </View>
            ) : (
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
                                keyExtractor={item => item.text} />
                        </View>
                    ) : (
                        <View style={styles.rootContainer}>
                            <Text>You don't have any chat with this account...</Text>
                        </View>
                    )}
                </>
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