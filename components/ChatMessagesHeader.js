import { Image, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const ChatMessagesHeader = ({ userName, color }) => {
    return (
        <View style={styles.headerContainer}>
            <AntDesign name="user" size={24} color={color} />
            <Text style={[styles.headerText, { color: color }]}>{userName}</Text>
        </View>
    );
};

export default ChatMessagesHeader;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    headerText: {
        marginLeft: 5,
        fontSize: 16,
        fontWeight: 'bold'
    }
});