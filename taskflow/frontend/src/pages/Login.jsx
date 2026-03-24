import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Login() {
    // État du formulaire de connexion
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Met à jour le champ modifié dans le state
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envoie les identifiants à l’API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await api.post("/auth/login", form);

            // Stockage du token et des infos utilisateur
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("user", JSON.stringify(res.data.user));

            // Redirection vers le dashboard
            window.location.href = "/dashboard";
        } catch (error) {
            alert(error.response?.data?.message || "Connexion impossible");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Connexion</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        onChange={handleChange}
                    />
                    <input
                        name="password"
                        type="password"
                        placeholder="Mot de passe"
                        onChange={handleChange}
                    />
                    <button className="primary-btn" type="submit">
                        Se connecter
                    </button>
                </form>

                <p>
                    Pas de compte ? <Link to="/register">Inscription</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;