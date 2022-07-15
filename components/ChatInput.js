import { useContext, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import variables from '../Constants/envVariables';
import { AuthContext } from '../context/AuthContext';
import { useHttpClient } from '../hooks/HttpHook';
import SendButton from './SendButton';

const ChatInput = ({ userId }) => {
    const auth = useContext(AuthContext);

    const [textMessage, setTextMessage] = useState('');

    const { sendRequest, isLoading } = useHttpClient();

    const sendMessage = async () => {
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
                if (res.message === "sent")
                    console.log('emit here...');
            })
            .catch(err => {
                console.log(err);
            })
    }

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder='Type your message...'
                onChangeText={(message) => setTextMessage(message)} />
            <SendButton
                onPress={sendMessage} />
        </View>
    );
};

export default ChatInput;

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 5
    },
    textInput: {
        width: '85%',
        backgroundColor: 'white',
        borderRadius: 28,
        paddingHorizontal: 10,
        paddingVertical: 5
    }
});