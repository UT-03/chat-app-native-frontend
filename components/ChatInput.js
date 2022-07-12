import { View, TextInput, StyleSheet } from 'react-native';
import SendButton from './SendButton';

const ChatInput = () => {
    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.textInput}
                placeholder='Type your message...' />
            <SendButton />
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