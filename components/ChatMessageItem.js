import { StyleSheet, View, Text, Pressable } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ChatMessageItem = ({ chatId, userName, recentMessage, sent }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.chatMessageOuterContainer}>
            <Pressable
                style={styles.chatMessageInnerContainer}
                android_ripple={{ color: GlobalStyles.colors.primary400 }}
                onPress={() => navigation.navigate('chatScreen', { chatId: chatId, userName: userName })}
            >
                <View style={styles.imageContainer}>
                    <AntDesign name="user" size={24} color={GlobalStyles.colors.primary500} />
                </View>
                <View style={styles.detailContainer}>
                    <Text style={styles.userName}>{userName}</Text>
                    <Text numberOfLines={1}>{sent && 'You: '}{recentMessage}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default ChatMessageItem;

const styles = StyleSheet.create({
    chatMessageOuterContainer: {
        backgroundColor: GlobalStyles.colors.primary100
    },
    chatMessageInnerContainer: {
        flexDirection: 'row',
        padding: 10
    },
    imageContainer: {
        backgroundColor: GlobalStyles.colors.gray400,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        margin: 5,
        width: '100%'
    },
    detailContainer: {
        paddingHorizontal: 5
    },
    userName: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})