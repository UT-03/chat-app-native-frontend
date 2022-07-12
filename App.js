import { View, Text, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';

import Navigator from './Navigator';
import { StatusBar } from 'expo-status-bar';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './context/AuthContext';

const App = () => {

  const { token, checked, userId, login } = useAuth();

  return (
    <>
      {checked ? (
        <AuthContext.Provider
          value={{
            isLoggedIn: !!token,
            token: token,
            login: login,
            userId: userId
          }}
        >
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