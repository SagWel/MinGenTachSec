<<<<<<< HEAD
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



=======
const express = require("express");
require("dotenv").config();
const tasksRoutes = require("./Routes/TaskRoutes");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cors = require(`cors`);
>>>>>>> Nicolas

// Middlewares globaux
app.use(cors(corsOptions));
app.use(express.json());


// Routes
<<<<<<< HEAD
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
=======
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", tasksRoutes);

// Middleware de gestion d’erreurs
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    message: "Erreur serveur",
    error: err.message,
  });
});
>>>>>>> Nicolas

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
