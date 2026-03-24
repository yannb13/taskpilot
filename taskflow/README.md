# TaskPilot

Application web full-stack de gestion de tâches avec authentification sécurisée et tableau Kanban interactif en drag & drop.

---

## Présentation

TaskPilot permet à un utilisateur de gérer ses tâches quotidiennes dans une interface moderne et intuitive.

Chaque utilisateur possède un espace personnel sécurisé pour :

- créer des tâches  
- modifier des tâches  
- supprimer des tâches  
- organiser les tâches par statut  

---

## Fonctionnalités

- Authentification sécurisée avec JWT  
- CRUD complet des tâches  
- Tableau Kanban avec drag & drop (dnd-kit)  
- Recherche dynamique  
- Filtrage par statut  
- Dashboard avec statistiques  
- Interface responsive  

---

## Technologies

### Frontend

- React  
- React Router  
- Axios  
- dnd-kit  
- CSS responsive  

### Backend

- Node.js  
- Express  
- MySQL  
- JWT  
- bcrypt  

---

## Installation

### 1. Cloner le projet

git clone https://github.com/yannb13/taskpilot.git
cd taskpilot


### 2. Configurer le backend

Créer un fichier `.env` dans le dossier backend :

PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=taskpilot
JWT_SECRET=my_secret_key


Installer et lancer :

cd backend
npm install
npm run dev

### 3. Lancer le frontend

cd frontend
npm install
npm run dev

Application accessible sur :

http://localhost:5173

---

## Base de données

Créer une base MySQL :

taskpilot

Puis exécuter :

CREATE TABLE tasks (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(255) NOT NULL,
description TEXT,
status VARCHAR(50) DEFAULT 'todo',
user_id INT,
created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

---

## Structure

taskpilot/
backend/
frontend/

---

## Sécurité

- Authentification JWT  
- Hash des mots de passe avec bcrypt  
- Protection des routes API  
- Données isolées par utilisateur  

---

## Améliorations possibles

- Mode sombre  
- Priorité des tâches  
- Dates d’échéance  
- Notifications temps réel  
- Version mobile optimisée  
- Déploiement cloud  

---

## Auteur

Yann BOISSON  
Formation Développeur Web et Web Mobile
