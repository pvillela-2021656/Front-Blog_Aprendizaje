import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { currentUser } from '../services/api';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    const getUserProfile = useCallback(async () => {
        setLoadingUser(true);
        try {
            const response = await currentUser();
            if (response?.data?.uid) {
                setUser(response.data);
            } else {
                toast.error("Couldnt load the user profile.");
            }
        } catch (err) {
            toast.error("Error while loading profile.");
            console.error(err);
        } finally {
            setLoadingUser(false);
        }
    }, []);

    useEffect(() => {
        getUserProfile();
    }, [getUserProfile]);

    return (
        <UserContext.Provider value={{ user, loadingUser, getUserProfile }}>
            {children}

        </UserContext.Provider>
    )
};

export const useUser = () => useContext(UserContext);
