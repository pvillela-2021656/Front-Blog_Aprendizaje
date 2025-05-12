import { useCallback, useState } from 'react';
import toast from 'react-hot-toast';
import { useUser } from '../../components/user/userContext';
import { createComment, getCommentaries } from '../../services/api';

export const useComments = () => {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    const { user } = useUser();

    const getCommentsByPublication = useCallback(async (publicationId) => {
        setLoading(true);
        try {
            const response = await getCommentaries();
            const filtered = response.data.commentaries.filter(
                (c) => c.publication === publicationId
            );
            setComments(filtered.reverse());
        } catch (error) {
            toast.error("Error al obtener comentarios");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCommentForPublication = useCallback(async (publicationId, content) => {
        try {
            if (!user?.uid) {
                toast.error("Usuario no identificado");
                return;
            }

            const commentData = {
                publication: publicationId,
                author: user.uid,
                content
            };

            console.log("Comentario que se enviará:", commentData);

            await createComment(commentData);
            toast.success("Comentario agregado");
        } catch (error) {
            toast.error("Error al comentar");
            console.error(error);
        }
    }, [user]);

    return {
        comments,
        loading,
        getCommentsByPublication,
        createCommentForPublication
    };
};
