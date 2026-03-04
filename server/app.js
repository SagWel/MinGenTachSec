const express = require('express');
require('dotenv').config();
const tasksRoutes = require('./Routes/TaskRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const app = express();

// Middlewares globaux
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/tasks', tasksRoutes);
app.use('/api/auth', tasksRoutes);



// Middleware de gestion d’erreurs
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({
        message: 'Erreur serveur',
        error: err.message
    });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


