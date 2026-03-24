function Navbar() {
    // Récupère les informations utilisateur stockées après connexion
    const user = JSON.parse(localStorage.getItem("user"));

    // Déconnecte l'utilisateur en supprimant les données locales
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>TaskPilot</h2>
                <span className="navbar-subtitle">
                    Organisez, suivez et terminez vos tâches
                </span>
            </div>

            <div className="navbar-right">
                <span className="navbar-user">{user?.name}</span>
                <button className="logout-btn" onClick={handleLogout}>
                    Déconnexion
                </button>
            </div>
        </nav>
    );
}

export default Navbar;