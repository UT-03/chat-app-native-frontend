import { useState, useCallback, useEffect } from 'react';
import storage from '../data/Storage';

const KEY = 'chat-app-user-details';

export const useAuth = () => {
    const [token, setToken] = useState();
    const [userId, setUserId] = useState();
    const [checked, setChecked] = useState(false);

    const login = useCallback((token, userId) => {
        setToken(token);
        setUserId(userId);

        storage.save({
            key: KEY,
            data: {
                token: token,
                userId: userId
            }
        });
    }, []);

    useEffect(() => {
        storage
            .load({
                key: KEY,
                autoSync: false
            })
            .then(data => {
                login(data.token, data.userId)
            })
            .finally(() => {
                setChecked(true);
            })
    }, [login]);

    return { token, userId, checked, login };
};