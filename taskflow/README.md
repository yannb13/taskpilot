# TaskPilot

Application web full-stack de gestion de tâches personnelles avec authentification sécurisée et tableau interactif en drag & drop.

---

## Présentation

TaskPilot est une application permettant à un utilisateur de gérer efficacement ses tâches quotidiennes grâce à une interface moderne inspirée des tableaux Kanban.

Chaque utilisateur possède son propre espace sécurisé dans lequel il peut créer, organiser et suivre ses tâches en temps réel.

---

## Fonctionnalités

* Inscription et connexion sécurisées (JWT)
* Gestion complète des tâches (CRUD)
* Organisation des tâches en tableau Kanban
* Drag & Drop fluide avec **dnd-kit**
* Filtrage des tâches par statut
* Recherche dynamique
* Notifications visuelles (toast)
* Dashboard avec statistiques
* Interface responsive

---

## Technologies utilisées

### Frontend

* React
* React Router DOM
* Axios
* dnd-kit (drag & drop)
* CSS moderne responsive

### Backend

* Node.js
* Express
* MySQL
* JSON Web Token
* bcrypt

---

## Architecture

Application full-stack séparée en deux parties :

* **Frontend** : interface utilisateur React (SPA)
* **Backend** : API REST sécurisée avec Express
* **Base de données** : MySQL

Chaque requête vers l’API est protégée par un token JWT.

---

## Installation du projet

### 1. Cloner le projet

```bash
git clone https://github.com/yannb13/taskpilot.git
cd taskpilot
```

---

### 2. Installation du backend

```bash
cd backend
npm install
npm run dev
```

---

### 3. Installation du frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Configuration base de données

Créer une base MySQL puis exécuter :

```sql
CREATE TABLE tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  status VARCHAR(50) DEFAULT 'todo',
  user_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## Structure du projet

```
taskpilot/
│
├── backend/
│   ├── config/
│   ├── middleware/
│   ├── routes/
│   └── server.js
│
└── frontend/
    ├── components/
    ├── pages/
    ├── services/
    └── App.jsx
```

---

## Améliorations futures

* Mode sombre (dark mode)
* Priorité des tâches
* Dates d’échéance
* Partage de tableaux
* Notifications en temps réel
* Version mobile optimisée

---

## Yann BOISSON

Projet réalisé dans le cadre de la formation **Développeur Web et Web Mobile Full-Stack**.

---
