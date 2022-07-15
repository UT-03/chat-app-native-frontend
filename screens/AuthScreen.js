import { ScrollView, StyleSheet, View } from 'react-native';
import AuthForm from '../components/AuthForm';
import { StatusBar } from 'expo-status-bar';
import GlobalStyles from '../Constants/style/GlobalStyles';

const AuthScreen = () => {
    return (
        <>
            <StatusBar style="dark" />
            <View style={styles.rootContainer}>
                <AuthForm />
            </View>
        </>
    );
};

export default AuthScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: GlobalStyles.colors.primary100
    }
})