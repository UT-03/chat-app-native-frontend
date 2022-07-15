import { useContext } from 'react';
import { ContactsContext } from '../context/ContactsContext';
import { StatusBar } from 'expo-status-bar';
import ContactItem from '../components/ContactItem';
import ActivityIndicatorComponent from '../components/ActivityIndicatorComponent';
import { StyleSheet, View } from 'react-native';
import GlobalStyles from '../Constants/style/GlobalStyles';

const HomeScreen = () => {
    const { contacts, areContactsReady } = useContext(ContactsContext);

    return (
        <>
            <StatusBar style="light" />
            {
                areContactsReady ? (
                    <View style={styles.rootContainer}>
                        {
                            contacts.map((contact, index) => {
                                return (
                                    <ContactItem
                                        key={contact._id}
                                        _id={contact._id}
                                        name={contact.name} />
                                )
                            })
                        }
                    </View>
                ) : (
                    <ActivityIndicatorComponent />
                )
            }
        </>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        backgroundColor: GlobalStyles.colors.primary100
    }
})