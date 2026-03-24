import { useState } from "react";

function TaskForm({ onAdd }) {
    // État du champ titre
    const [title, setTitle] = useState("");

    // État du champ description
    const [description, setDescription] = useState("");

    // Envoi du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        // Empêche l’ajout si le titre est vide
        if (!title.trim()) return;

        // Envoie la nouvelle tâche au composant parent (Dashboard)
        onAdd({
            title,
            description,
            status: "todo", // statut par défaut
        });

        // Réinitialisation des champs
        setTitle("");
        setDescription("");
    };

    return (
        <div className="task-form-card">
            <div className="task-form-title">
                <h3>Nouvelle tâche</h3>
                <p className="helper-text">
                    Ajoute une tâche à suivre dans ton tableau personnel.
                </p>
            </div>

            {/* Formulaire d’ajout de tâche */}
            <form onSubmit={handleSubmit} className="task-form">
                <input
                    type="text"
                    placeholder="Titre de la tâche"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button className="primary-btn" type="submit">
                    Ajouter la tâche
                </button>
            </form>
        </div>
    );
}

export default TaskForm;