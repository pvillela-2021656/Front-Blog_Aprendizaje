import { useState } from 'react';
import { useComments } from '../../shared/hooks/useComments';
import './comments.css';

export const CommentSection = ({ publicationId }) => {
    const [newComment, setNewComment] = useState('');
    const [activePubId, setActivePubId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const {
        comments,
        loading,
        getCommentsByPublication,
        createCommentForPublication
    } = useComments();

    const handleInputFocus = () => {
        setActivePubId(publicationId);
    };

    const handleCreateComment = async () => {
        if (!newComment.trim()) return;
        await createCommentForPublication(activePubId, newComment);
        setNewComment('');
        await getCommentsByPublication(activePubId);
    };

    const openModal = async () => {
        setActivePubId(publicationId);
        await getCommentsByPublication(publicationId);
        setShowModal(true);
    };

    return (
        <div className="comment-section">
            <div className="comment-input-box">
                <textarea
                    placeholder="Escribe un comentario..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onFocus={handleInputFocus}
                    rows={2}
                />
                <button onClick={handleCreateComment}>Comentar</button>
            </div>

            <button className="view-comments-btn" onClick={openModal}>
                Ver comentarios
            </button>

            {showModal && (
                <div className="comment-modal">
                    <div className="comment-modal-content">
                        <button className="close-modal" onClick={() => setShowModal(false)}>X</button>
                        <h3>Comentarios</h3>
                        {loading ? (
                            <p>Cargando comentarios...</p>
                        ) : comments.length === 0 ? (
                            <p className="no-comments">Ningún comentario</p>
                        ) : (
                            comments.map((c) => (
                                <div key={c.uid} className="comment-item">
                                    <div className="comment-header">
                                        <strong>{c.author?.username || 'Usuario'}</strong>
                                        <span className="comment-date">
                                            {new Date(c.dateOfComment).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <p className="comment-content">{c.content}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};