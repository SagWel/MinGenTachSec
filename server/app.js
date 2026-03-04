const express = require('express');

require('dotenv').config();
const tasksRoutes = require('./Routes/TaskRoutes');
const authRoutes = require('./Routes/AuthRoutes');
const app = express();
const cors = require('cors');

const corsOptions = {
    origin: process.env.FRONTURL,
    credentials: true,
}


// Middlewares globaux
app.use(cors(corsOptions));
app.use(express.json());


// Routes
app.use('/tasks', tasksRoutes);
app.use('/api/auth', authRoutes);



// Middleware de gestion d’erreurs
// app.use((err, req, res, next) => {
//     console.error(err);
//     res.status(500).json({
//         message: 'Erreur serveur',
//         error: err.message
//     });
// });

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});


