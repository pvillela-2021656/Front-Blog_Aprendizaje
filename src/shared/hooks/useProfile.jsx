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
                toast.error("Couldnt load the user profile.");
                console.error("Invalid answer:", response);
            }
        } catch (error) {
            toast.error("Couldnt load the profile.");
            console.error("Error while doing getProfile:", error);
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