require("dotenv").config();
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

// Autorise les requêtes entre le frontend et le backend
app.use(cors());

// Permet de lire le JSON envoyé dans les requêtes
app.use(express.json());

// Route de test simple pour vérifier que l’API fonctionne
app.get("/", (req, res) => {
  res.send("API TaskPilot en ligne");
});

// Routes d’authentification
app.use("/api/auth", authRoutes);

// Routes de gestion des tâches
app.use("/api/tasks", taskRoutes);

const PORT = process.env.PORT || 5000;

// Démarrage du serveur
app.listen(PORT, () => {
  console.log(`Serveur lancé sur le port ${PORT}`);
});