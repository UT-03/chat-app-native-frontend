import { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { ContactsContext } from '../context/ContactsContext';
import { StatusBar } from 'expo-status-bar';
import ContactItem from '../components/ContactItem';

const HomeScreen = () => {
    const { contacts, areContactsReady } = useContext(ContactsContext);

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

export default HomeScreen;