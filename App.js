import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';

import Navigator from './Navigator';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './context/AuthContext';
import { FAB } from "@rneui/themed";
import GlobalStyles from './Constants/style/GlobalStyles';

const App = () => {

  const { token, checked, userId, login, logout } = useAuth();

  return (
    <>
      {checked ? (
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            logout: logout,
            userId: userId
          }}
        >
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
          <StatusBar style="light" />
          <Provider>
            <NavigationContainer>
              <Navigator />
            </NavigationContainer>
          </Provider>
        </AuthContext.Provider>
      ) : (
        <ActivityIndicator
          size='large' />
      )}
    </>
  );
};

export default App;