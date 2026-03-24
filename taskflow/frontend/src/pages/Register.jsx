import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../services/api";

function Register() {
    // État du formulaire d’inscription
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    // Met à jour les valeurs du formulaire
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Envoie les données d’inscription à l’API
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/auth/register", form);
            alert("Compte créé avec succès");
            navigate("/");
        } catch (error) {
            alert(error.response?.data?.message || "Erreur lors de l'inscription");
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h1>Inscription</h1>

                <form onSubmit={handleSubmit}>
                    <input
                        name="name"
                        placeholder="Nom"
                        onChange={handleChange}
                    />
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
                        S'inscrire
                    </button>
                </form>

                <p>
                    Déjà un compte ? <Link to="/">Connexion</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;