const express = require("express");
const db = require("../config/db");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Toutes les routes tâches sont protégées par le middleware JWT
router.use(authMiddleware);

// Récupère toutes les tâches de l'utilisateur connecté
router.get("/", (req, res) => {
    db.query(
        "SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC",
        [req.user.id],
        (err, results) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur" });
            }
            res.json(results);
        }
    );
});

// Crée une nouvelle tâche
router.post("/", (req, res) => {
    const { title, description, status } = req.body;

    if (!title) {
        return res.status(400).json({ message: "Le titre est obligatoire" });
    }

    db.query(
        "INSERT INTO tasks (title, description, status, user_id) VALUES (?, ?, ?, ?)",
        [title, description || "", status || "todo", req.user.id],
        (err, result) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur" });
            }

            res.status(201).json({
                id: result.insertId,
                title,
                description,
                status: status || "todo",
            });
        }
    );
});

// Met à jour une tâche existante
router.put("/:id", (req, res) => {
    const { title, description, status } = req.body;
    const taskId = req.params.id;

    db.query(
        "UPDATE tasks SET title = ?, description = ?, status = ? WHERE id = ? AND user_id = ?",
        [title, description, status, taskId, req.user.id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur" });
            }

            res.json({ message: "Tâche mise à jour" });
        }
    );
});

// Supprime une tâche
router.delete("/:id", (req, res) => {
    const taskId = req.params.id;

    db.query(
        "DELETE FROM tasks WHERE id = ? AND user_id = ?",
        [taskId, req.user.id],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur" });
            }

            res.json({ message: "Tâche supprimée" });
        }
    );
});

module.exports = router;