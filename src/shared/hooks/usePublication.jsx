import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { getPublications } from '../../services/api';

export const usePublications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAllPublications = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getPublications();
            if (response?.data) {
                setPublications(response.data.publications);
            } else {
                toast.error("No se encontraron publicaciones");
            }
        } catch (error) {
            toast.error("Error al cargar publicaciones");
            console.error("Error en getAllPublications:", error);
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        publications,
        loading,
        getAllPublications
    };
};