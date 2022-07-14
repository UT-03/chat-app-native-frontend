import { Pressable, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const HomeScreenHeader = () => {
    const navigation = useNavigation();

    const auth = useContext(AuthContext);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => navigation.navigate('contactsScreen')}
                style={({ pressed }) => [styles.iconContainer, pressed && styles.pressed]}>
                <AntDesign
                    name="contacts"
                    size={22}
                    color="white" />
            </Pressable>
            <Pressable
                onPress={() => auth.logout()}
                style={({ pressed }) => [styles.iconContainer, pressed && styles.pressed]}>
                <AntDesign
                    name="poweroff"
                    size={22}
                    color="white" />
            </Pressable>
        </View>
    );
};

export default HomeScreenHeader;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row'
    },
    iconContainer: {
        marginHorizontal: 6
    },
    pressed: {
        opacity: 0.75
    }
})