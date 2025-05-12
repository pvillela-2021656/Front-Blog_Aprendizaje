import { useUser } from '../../components/user/userContext';
import "../../pages/Home/homePage.css";

export const Profile = () => {
    const { user, loadingUser } = useUser();

    if (loadingUser) return <p className="profile-loading">Cargando perfil...</p>;
    if (!user) return <p className="profile-error">No se pudo cargar el perfil.</p>;

    return (
        <section className="user-profile-container">
            <div className="user-profile-box">
                <h2 className="user-name">{user.name} {user.surname}</h2>
                <p className="user-username">@{user.username}</p>
                <p className="user-email">{user.email}</p>
                <p className="user-role">
                    Rol: <span>{user.role === 'ADMIN_ROLE' ? 'Administrador' : 'Visitante'}</span>
                </p>
            </div>
        </section>
    );
};
