import { StyleSheet, Text, View } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';

const ChatMessage = ({ text, fromSelf, scrollRef }) => {
    return (
        <View style={[styles.chatMessageContainer, {
            backgroundColor: fromSelf ? GlobalStyles.colors.primary500 : GlobalStyles.colors.gray600,
            alignSelf: fromSelf ? 'flex-end' : 'flex-start'
        }
        ]}
            ref={scrollRef}>
            <Text style={styles.messageText}>{text}</Text>
        </View>
    );
};

export default ChatMessage;

const styles = StyleSheet.create({
    chatMessageContainer: {
        maxWidth: '60%',
        padding: 15,
        borderRadius: 30,
        marginVertical: 5,
        alignItems: 'center'
    },
    messageText: {
        color: 'white'
    }
});