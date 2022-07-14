import { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Text } from 'react-native-paper'
import { ContactsContext } from '../context/ContactsContext';
import { StatusBar } from 'expo-status-bar';
import ContactItem from '../components/ContactItem';

const ContactsScreen = () => {
    const { contacts, areContactsReady } = useContext(ContactsContext);

    console.log(contacts);

    return (
        <>
            <StatusBar style="light" />
            {
                areContactsReady ? (
                    contacts.map((contact, index) => {
                        return (
                            <ContactItem
                                key={contact._id}
                                _id={contact._id}
                                name={contact.name} />
                        )
                    })
                ) : (
                    <ActivityIndicator />
                )
            }
        </>
    );
};

export default ContactsScreen;