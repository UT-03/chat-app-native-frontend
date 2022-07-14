import { ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { View, Text } from 'react-native';

import Navigator from './Navigator';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './context/AuthContext';
import { useContacts } from './hooks/ContactsHook';
import { ContactsContext } from './context/ContactsContext';

const App = () => {

  const { token, checked, userId, login, logout } = useAuth();

  const { contacts, getContacts, areContactsReady } = useContacts(token);

  const netInfo = useNetInfo();

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
          <ContactsContext.Provider
            value={{
              contacts: contacts,
              getContacts: getContacts,
              areContactsReady: areContactsReady
            }}>
            <Provider>
              <NavigationContainer>
                {netInfo.isConnected ?
                  <Navigator />
                  : (
                    <View>
                      <Text>No internet connection...</Text>
                    </View>
                  )}
              </NavigationContainer>
            </Provider>
          </ContactsContext.Provider>
        </AuthContext.Provider>
      ) : (
        <ActivityIndicator
          size='large' />
      )}
    </>
  );
};

export default App;