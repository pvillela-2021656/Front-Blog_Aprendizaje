import "./NavigationBar.css";

export const NavigationBar = () => {
    return (
        <nav className="navigationBar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <img src="/logo.png" alt="Logo" className="navbar-logo" />
                    <h1 className="navbar-title">Blog Personal</h1>
                </div>
                <ul className="navbar-menu">
                    <li className="navbar-item">Inicio</li>
                    <li className="navbar-item">Blog</li>
                    <li className="navbar-item">Contacto</li>
                    <li className="navbar-item">Soporte</li>
                </ul>
            </div>
        </nav>
    );
};
