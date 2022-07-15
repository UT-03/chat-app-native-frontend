import { useLayoutEffect, useEffect, useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import ChatInput from '../components/ChatInput';
import ChatMessagesHeader from '../components/ChatMessagesHeader';
import ChatsContainer from '../components/ChatsContainer';
import GlobalStyles from '../Constants/style/GlobalStyles';
import { useHttpClient } from '../hooks/HttpHook';
import { AuthContext } from '../context/AuthContext';
import SocketContext from '../context/SocketContext';
import variables from '../Constants/envVariables';
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent';

const ChatScreen = ({ route, navigation }) => {
    const { userId, userName } = route.params;

    const [messages, setMessages] = useState([]);
    const [isLoadingMessages, setIsLoadingMessages] = useState(true);

    const { sendRequest } = useHttpClient();

    const auth = useContext(AuthContext);

    const { socket } = useContext(SocketContext);

    const messageReceivedHandler = (sender, message) => {
        if (sender.toString() === userId.toString()) {
            setMessages(prevState => {
                return [
                    ...prevState,
                    message
                ]
            })
        }
    }

    useEffect(() => {
        socket.on("msg-recieve", ({ sender, message }) => messageReceivedHandler(sender, message));

        return () => {
            socket.removeAllListeners("msg-recieve");
        }
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            setIsLoadingMessages(true);
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
            setIsLoadingMessages(false);
        }
        fetchMessages();
    }, []);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <ChatMessagesHeader
                    userName={userName}
                    color='white' />
            )
        })
    }, [userName, navigation]);

    const sendMessage = async (textMessage) => {
        if (textMessage === '')
            return;

        return sendRequest(
            `${variables.backendHost}/user/send-message`,
            'POST',
            JSON.stringify({
                text: textMessage,
                to: userId
            },
            ),
            {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + auth.token
            }
        )
            .then(res => {
                if (res.message === "sent") {
                    socket.emit("send-msg", {
                        from: auth.userId,
                        to: userId,
                        text: textMessage
                    })
                    setMessages(prevState => [
                        ...prevState,
                        {
                            text: textMessage,
                            fromSelf: true
                        }
                    ])
                }
            })
            .catch(err => { })
    }

    return (
        <View style={styles.rootContainer}>
            {isLoadingMessages ? (
                <ActivityIndicatorComponent />
            ) : (
                <ChatsContainer
                    messages={messages} />
            )}
            <ChatInput
                onMessageSend={sendMessage} />
        </View>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary100
    }
})