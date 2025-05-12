import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { currentUser } from '../../services/api';

const UserContext = createContext(); // ✅ Cambiado a mayúscula

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
                toast.error("No se pudo obtener el perfil del usuario");
            }
        } catch (err) {
            toast.error("Error al cargar perfil");
            console.error(err);
        } finally {
            setLoadingUser(false);
        }
    }, []);

    useEffect(() => {
        getUserProfile();
    }, [getUserProfile]);

    return (
        <UserContext.Provider value={{ user, loadingUser, getUserProfile }}> {/* ✅ CORRECTO */}
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext); // ✅ CORRECTO
