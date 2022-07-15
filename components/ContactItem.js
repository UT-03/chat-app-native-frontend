import { StyleSheet, View, Text, Pressable } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ContactItem = ({ _id, name }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.chatMessageOuterContainer}>
            <Pressable
                style={styles.chatMessageInnerContainer}
                android_ripple={{ color: GlobalStyles.colors.primary400 }}
                onPress={() => navigation.navigate('chatScreen', { userId: _id, userName: name })}
            >
                <View style={styles.imageContainer}>
                    <AntDesign name="user" size={24} color={GlobalStyles.colors.primary500} />
                </View>
                <View style={styles.userNameContainer}>
                    <Text style={styles.userName}>{name}</Text>
                </View>
            </Pressable>
        </View>
    );
};

export default ContactItem;

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
    userNameContainer: {
        paddingHorizontal: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userName: {
        fontSize: 15,
        fontWeight: 'bold'
    }
})