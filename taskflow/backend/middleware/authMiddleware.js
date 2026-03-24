const jwt = require("jsonwebtoken");

// Middleware qui protège les routes nécessitant une authentification
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    // Vérifie que le header Authorization existe
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Accès refusé" });
    }

    const token = authHeader.split(" ")[1];

    try {
        // Vérifie et décode le token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Ajoute les informations utilisateur dans la requête
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ message: "Token invalide" });
    }
};

module.exports = authMiddleware;