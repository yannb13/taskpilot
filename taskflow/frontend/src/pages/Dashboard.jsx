import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

function Dashboard() {
    // Stocke toutes les tâches de l'utilisateur connecté
    const [tasks, setTasks] = useState([]);

    // Filtre par statut
    const [filter, setFilter] = useState("all");

    // Champ de recherche
    const [search, setSearch] = useState("");

    // Message toast affiché temporairement
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    // Affiche un message temporaire à l’écran
    const showMessage = (text) => {
        setMessage(text);
        setTimeout(() => {
            setMessage("");
        }, 3000);
    };

    // Récupère toutes les tâches depuis l’API
    const fetchTasks = async () => {
        try {
            const res = await api.get("/tasks");
            setTasks(res.data);
        } catch (error) {
            console.error(error);
        }
    };

    // Vérifie la présence du token au chargement puis récupère les tâches
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/");
            return;
        }

        fetchTasks();
    }, []);

    // Ajoute une nouvelle tâche puis recharge la liste
    const addTask = async (task) => {
        await api.post("/tasks", task);
        fetchTasks();
        showMessage("Tâche ajoutée avec succès.");
    };

    // Supprime une tâche après confirmation
    const deleteTask = async (id) => {
        const confirmDelete = window.confirm("Supprimer cette tâche ?");
        if (!confirmDelete) return;

        await api.delete(`/tasks/${id}`);
        fetchTasks();
        showMessage("Tâche supprimée.");
    };

    // Met à jour le statut d’une tâche avec un affichage optimiste
    const updateStatus = async (id, status) => {
        const previousTasks = [...tasks];

        const updatedTasks = tasks.map((task) =>
            task.id === id ? { ...task, status } : task
        );

        setTasks(updatedTasks);

        try {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;

            await api.put(`/tasks/${id}`, {
                ...task,
                status,
            });

            showMessage("Statut mis à jour.");
        } catch (error) {
            console.error("Erreur mise à jour statut :", error.response?.data || error.message);
            setTasks(previousTasks);
            alert("Erreur lors de la mise à jour du statut");
        }
    };

    // Gère le déplacement drag & drop entre les colonnes
    const onDragEnd = async (event) => {
        const { active, over } = event;

        if (!over) return;

        const taskId = parseInt(active.id, 10);
        const task = tasks.find((t) => t.id === taskId);
        if (!task) return;

        let newStatus = null;

        // Si la tâche est déposée directement sur une colonne
        if (["todo", "in_progress", "done"].includes(over.id)) {
            newStatus = over.id;
        } else {
            // Si la tâche est déposée sur une autre carte
            const overTask = tasks.find((t) => t.id.toString() === over.id.toString());
            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (!newStatus) return;
        if (task.status === newStatus) return;

        await updateStatus(taskId, newStatus);
    };

    // Applique le filtre de statut et la recherche texte
    const visibleTasks = tasks.filter((task) => {
        const matchesFilter = filter === "all" ? true : task.status === filter;

        const searchText = search.toLowerCase();
        const matchesSearch =
        task.title.toLowerCase().includes(searchText) ||
        (task.description || "").toLowerCase().includes(searchText);

        return matchesFilter && matchesSearch;
    });

    // Calcul des statistiques affichées dans le dashboard
    const totalTasks = tasks.length;
    const todoTasks = tasks.filter((task) => task.status === "todo").length;
    const progressTasks = tasks.filter((task) => task.status === "in_progress").length;
    const doneTasks = tasks.filter((task) => task.status === "done").length;

    return (
        <div>
            <Navbar />

            <div className="container">
                <div className="dashboard-header">
                    <div className="dashboard-title">
                        <h1>Mes tâches</h1>
                        <p>Organise, suis et mets à jour tes tâches en temps réel.</p>
                    </div>
                </div>

                {/* Message toast affiché après une action utilisateur */}
                {message && <div className="toast-message">{message}</div>}

                <div className="stats-grid">
                    <div className="stat-card stat-total">
                        <h4>Total</h4>
                        <p>{totalTasks}</p>
                    </div>

                    <div className="stat-card stat-todo">
                        <h4>À faire</h4>
                        <p>{todoTasks}</p>
                    </div>

                    <div className="stat-card stat-progress">
                        <h4>En cours</h4>
                        <p>{progressTasks}</p>
                    </div>

                    <div className="stat-card stat-done">
                        <h4>Terminées</h4>
                        <p>{doneTasks}</p>
                    </div>
                </div>

                <div className="filter-box">
                    <label>Recherche :</label>
                    <input
                        type="text"
                        placeholder="Rechercher une tâche..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />

                    <label>Filtre :</label>
                    <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                        <option value="all">Toutes</option>
                        <option value="todo">À faire</option>
                        <option value="in_progress">En cours</option>
                        <option value="done">Terminées</option>
                    </select>
                </div>

                <TaskForm onAdd={addTask} />
                <TaskList
                    tasks={visibleTasks}
                    onDelete={deleteTask}
                    onDragEnd={onDragEnd}
                />
            </div>
        </div>
    );
}

export default Dashboard;