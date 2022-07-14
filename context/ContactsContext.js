import { createContext } from 'react';

export const ContactsContext = createContext({
    contacts: null,
    getContacts: () => { },
    areContactsReady: null
});