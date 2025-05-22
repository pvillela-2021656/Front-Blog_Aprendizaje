import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import {
    getPublications,
    getPublicationsByCourse,
    getRecentPublications
} from '../../services/api';

export const usePublications = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleFetch = async (fetchFn, errorMessage = 'Error al cargar publicaciones') => {
        setLoading(true);
        try {
            const res = await fetchFn();
            if (res?.data?.publications) {
                setPublications(res.data.publications);
            } else {
                toast.error("No se encontraron publicaciones.");
            }
        } catch (error) {
            toast.error(errorMessage);
            console.error(errorMessage, error);
        } finally {
            setLoading(false);
        }
    };

    const getAllPublications = useCallback(() => handleFetch(getPublications), []);
    const getRecent = () => handleFetch(getRecentPublications, "Error al cargar publicaciones recientes");
    const getByCourse = (courseName) =>
        handleFetch(() => getPublicationsByCourse(courseName), `Error al filtrar publicaciones por ${courseName}`);

    return {
        publications,
        loading,
        getAllPublications,
        getRecent,
        getByCourse
    };
};
