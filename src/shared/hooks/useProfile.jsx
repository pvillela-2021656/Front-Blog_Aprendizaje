import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { currentUser } from '../../services/api';

export const useProfile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);

    const getProfile = useCallback(async () => {
        setLoading(true);
        try {
            const response = await currentUser();
            if (response?.data && response.data.uid) {
                setProfile(response.data);
            } else {
                toast.error("No se pudo obtener el perfil del usuario");
                console.error("Respuesta inválida:", response);
            }
        } catch (error) {
            toast.error("Error al cargar el perfil");
            console.error("Error en getProfile:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        profile,
        loading,
        getProfile
    };
};