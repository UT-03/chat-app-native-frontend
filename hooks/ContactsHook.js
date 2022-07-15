import { useCallback, useContext, useEffect, useState } from "react"
import * as Contacts from 'expo-contacts';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import { useHttpClient } from "./HttpHook";
import variables from "../Constants/envVariables";

// const KEY = 'chat-app-contact-details';

export const useContacts = (token) => {
    const { sendRequest, error } = useHttpClient();

    const [contacts, setContacts] = useState([]);
    const [areContactsReady, setAreContactsReady] = useState(true);

    useEffect(() => {
        if (!!token)
            getContacts();
    }, [token]);


    const getContacts = useCallback(async () => {
        console.log('Getting contacts')
        setAreContactsReady(false);
        const { status } = await Contacts.requestPermissionsAsync();

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers, Contacts.Fields.Name]
            });

            // let contacts$;
            // AsyncStorage.getItem(KEY)
            //     .then(res => {
            //         if (!res)
            //             contacts$ = null;
            //         else
            //             contacts$ = JSON.parse(res);
            //     })

            // const savedContacts = await AsyncStorage.getItem(KEY);

            let contacts$ = data
                .filter(dataItem => !!dataItem.phoneNumbers)
                .map(dataItem => {
                    return {
                        name: dataItem.name,
                        phoneNumbers: [
                            ...new Set(dataItem.phoneNumbers
                                .filter(phno => !(phno.number.includes('*') || phno.number.includes('#') || phno.number.length < 5))
                                .map(phno => phno.number.split(" ").join("").replace("+91", ""))
                            )
                        ]
                    }
                });

            const allPhoneNumbers = contacts$.reduce((numbers, contact) => {
                contact.phoneNumbers.forEach(num => {
                    numbers.push(num);
                })

                return numbers;
            }, [])

            let res;
            try {
                res = await sendRequest(`${variables.backendHost}/user/check-contacts`,
                    'POST',
                    JSON.stringify({
                        phoneNumbers: allPhoneNumbers,
                    }),
                    {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + token
                    }
                );
            } catch (err) {
                console.log(error);
            }


            const projectedContacts = res.contacts.map(contact => {
                const name = contacts$.find(cont => cont.phoneNumbers.includes(contact.phoneNumber)).name;

                return {
                    ...contact,
                    name: name
                }
            });

            // Filtering out saved contacts
            // if(savedContacts)
            // {
            //     contacts$=contacts$.filter(contact=>{
            //         return contact.phoneNumbers.includes()
            //     })
            // }

            setContacts(projectedContacts);
        }

        setAreContactsReady(true);
    });

    return { contacts, areContactsReady, getContacts };
}