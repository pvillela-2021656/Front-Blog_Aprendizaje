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
            const filtered = response.data.commentaries.filter((c) => {
                if (!c.publication) return false;

                if (typeof c.publication === 'string') {
                    return c.publication === publicationId;
                }

                if (typeof c.publication === 'object' && c.publication._id) {
                    return c.publication._id === publicationId;
                }

                return false;
            });

            setComments(filtered.reverse());
        } catch (error) {
            toast.error("No se pudieron cargar los comentarios.");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, []);

    const createCommentForPublication = useCallback(async (publicationId, content) => {
        try {
            const authorId = user?._id || user?.uid;

            if (!authorId) {
                toast.error("Usuario no identificado.");
                return;
            }

            const commentData = {
                publication: publicationId,
                author: authorId,
                content
            };

            console.log("🟢 Enviando comentario:", commentData);

            await createComment(commentData);
            toast.success("Comentario agregado.");
        } catch (error) {
            toast.error("Error al crear el comentario.");
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
