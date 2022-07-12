import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useContext, useEffect } from 'react';
import Button from './components/Button';
import GlobalStyles from './Constants/style/GlobalStyles';
import { AuthContext } from './context/AuthContext';

import AuthScreen from './screens/AuthScreen';
import ChatScreen from './screens/ChatScreen';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const Navigator = () => {
    const auth = useContext(AuthContext);

    return (
        <Stack.Navigator
            // initialRouteName={auth.isLoggedIn ? 'home' : 'auth'}
            screenOptions={{
                headerStyle: {
                    backgroundColor: GlobalStyles.colors.primary500
                },
                headerTintColor: 'white',
            }}
        >
            {auth.isLoggedIn ? (
                <>
                    <Stack.Screen
                        name="home"
                        component={HomeScreen}
                        options={{
                            title: "Chat App",
                            headerRight: () => {
                                return (
                                    <Button
                                        title="Logout"
                                        color="transparent"
                                        textColor="white"
                                        onPress={auth.logout} />
                                )
                            }
                        }} />
                    <Stack.Screen
                        name="chatScreen"
                        component={ChatScreen}
                        options={{
                            headerTitle: '',
                            headerBackVisible: true
                        }} />
                </>
            ) : (
                <Stack.Screen
                    name="auth"
                    component={AuthScreen}
                    options={{
                        headerShown: false
                    }} />
            )}
        </Stack.Navigator>
    );
};

export default Navigator;