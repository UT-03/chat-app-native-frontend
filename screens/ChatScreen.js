import { useLayoutEffect } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import ChatInput from '../components/ChatInput';
import ChatMessagesHeader from '../components/ChatMessagesHeader';
import ChatsContainer from '../components/ChatsContainer';
import GlobalStyles from '../Constants/style/GlobalStyles';

const ChatScreen = ({ route, navigation }) => {
    const { chatId, userName } = route.params;

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <ChatMessagesHeader
                    userName={userName}
                    color='white' />
            )
        })
    }, [userName, navigation]);

    return (
        <View style={styles.rootContainer}>
            <ChatsContainer />
            <ChatInput />
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