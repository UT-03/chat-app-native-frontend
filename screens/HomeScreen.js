import { FlatList, StyleSheet, View } from 'react-native';
import ChatMessageItem from '../components/ChatMessageItem';
import GlobalStyles from '../Constants/style/GlobalStyles';
import { FAB } from "@rneui/themed";
import { Portal } from 'react-native-paper';

const DUMMY_CHATS = [
    {
        id: '1',
        name: 'Rambo',
        recentMessage: {
            text: 'Hello!',
            sent: false
        },
        numberOfNewMessages: 1
    },
    {
        id: '2',
        name: 'Bambi',
        recentMessage: {
            text: 'Hello!',
            sent: false
        },
        numberOfNewMessages: 1
    },
    {
        id: '3',
        name: 'Chaiwala',
        recentMessage: {
            text: 'Hello!',
            sent: false
        },
        numberOfNewMessages: 1
    },
    {
        id: '4',
        name: 'Senorita',
        recentMessage: {
            text: 'Hello!',
            sent: false
        },
        numberOfNewMessages: 1
    },
    {
        id: '6',
        name: '<unknown>',
        recentMessage: {
            text: 'Hello! This is a long message. This is for testing purspose',
            sent: true
        },
        numberOfNewMessages: 1
    }
]
const HomeScreen = ({ navigation }) => {
    return (
        <View style={styles.rootContainer}>
            <Portal>
                <FAB
                    visible={true}
                    icon={{ name: 'chat', color: 'white' }}
                    color={GlobalStyles.colors.primary500}
                    placement='right'
                    onPress={() => {
                        console.log('FAB pressed')
                        navigation.navigate('chatScreen')
                    }}
                />
            </Portal>
            <FlatList
                data={DUMMY_CHATS}
                renderItem={(itemData) => (
                    <ChatMessageItem
                        chatId={itemData.item.id}
                        userName={itemData.item.name}
                        sent={itemData.item.recentMessage.sent}
                        recentMessage={itemData.item.recentMessage.text} />
                )}
                keyExtractor={item => item.id} />
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary100
    }
})