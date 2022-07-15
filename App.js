import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { View, Text } from 'react-native';
import { io } from 'socket.io-client';

import Navigator from './Navigator';
import { useAuth } from './hooks/AuthHook';
import { AuthContext } from './context/AuthContext';
import { useContacts } from './hooks/ContactsHook';
import { ContactsContext } from './context/ContactsContext';
import SocketContext from './context/SocketContext';
import { useState, useEffect } from 'react';
import variables from './Constants/envVariables';
import GlobalStyles from './Constants/style/GlobalStyles';
import ActivityIndicatorComponent from './components/ActivityIndicatorComponent';

const App = () => {
  const [socket, setSocket] = useState();

  const { token, checked, userId, login, logout } = useAuth();

  const { contacts, getContacts, areContactsReady } = useContacts(token);

  const netInfo = useNetInfo();

  useEffect(() => {
    setSocket(io(variables.backendURL));
  }, []);

  useEffect(() => {
    if (!!token && socket && userId) {
      socket.emit('user active', { userId: userId });
    }
  }, [socket, token, userId]);

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
            {socket && (
              <SocketContext.Provider
                value={{
                  socket: socket
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
              </SocketContext.Provider>
            )}
          </ContactsContext.Provider>
        </AuthContext.Provider>
      ) : (
        <ActivityIndicatorComponent />
      )}
    </>
  );
};

export default App;