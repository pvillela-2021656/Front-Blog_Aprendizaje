import { useEffect } from 'react';
import { usePublications } from '../../shared/hooks/usePublication';
import { CommentSection } from '../comments/comments';
import './publications.css';

export const Publications = () => {
    const {
        publications,
        loading,
        getAllPublications,
        getRecent,
        getByCourse
    } = usePublications();

    useEffect(() => {
        getAllPublications();
    }, [getAllPublications]);

    if (loading) return <p className="loading">Cargando publicaciones...</p>;
    if (!publications?.length) return <p className="no-results">No hay publicaciones disponibles.</p>;

    return (
        <>
            <div className="filter-buttons">
                <button onClick={getRecent}>Más recientes</button>
                <button onClick={() => getByCourse("TALLER")}>Taller</button>
                <button onClick={() => getByCourse("TECNOLOGIA")}>Tecnología</button>
                <button onClick={() => getByCourse("PRACTICA")}>Práctica</button>
            </div>

            <section className="publications-container">
                {publications.map((post) => (
                    <div key={post._id || post.uid || post.id} className="publication-box">
                        <div className="publication-header">
                            <h2 className="publication-title">{post.title}</h2>
                            <span className="publication-course">{post.course}</span>
                        </div>
                        <p className="publication-description">{post.description}</p>
                        <p className="publication-date">
                            Publicado el {new Date(post.dateOfCreation).toLocaleDateString()}
                        </p>
                        <CommentSection publicationId={post._id || post.uid || post.id} />
                    </div>
                ))}
            </section>
        </>
    );
};
