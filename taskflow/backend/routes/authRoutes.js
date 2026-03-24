const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

const router = express.Router();

// Route d'inscription
router.post("/register", async (req, res) => {
    const { name, email, password } = req.body;

    // Vérifie que tous les champs sont remplis
    if (!name || !email || !password) {
        return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    try {
        // Hash du mot de passe avant enregistrement
        const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err) => {
            if (err) {
                return res.status(500).json({ message: "Erreur serveur", error: err });
            }

            res.status(201).json({ message: "Utilisateur créé" });
        }
    );
    } catch (error) {
        res.status(500).json({ message: "Erreur serveur" });
    }
});

// Route de connexion
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    // Recherche l’utilisateur par email
    db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
        if (err) {
            return res.status(500).json({ message: "Erreur serveur" });
        }

        if (results.length === 0) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        const user = results[0];

        // Compare le mot de passe saisi avec le hash stocké
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Email ou mot de passe incorrect" });
        }

        // Génère un token JWT valable 24h
        const token = jwt.sign(
            { id: user.id, email: user.email, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Renvoie le token et les infos utilisateur
        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
            },
        });
    });
});

module.exports = router;