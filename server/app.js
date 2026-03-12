const express = require("express");

require("dotenv").config();
const tasksRoutes = require("./Routes/TaskRoutes");
const authRoutes = require("./Routes/AuthRoutes");
const app = express();
const cors = require("cors");

const cookieParser = require("cookie-parser");//middleware pour lire et décoder cookie

const corsOptions = {
  origin: 'https://mingentachsec-front.onrender.com',
  credentials: true,
};

app.use(cookieParser());

// Middlewares globaux
app.use(cors(corsOptions));

app.use(express.json());

// Routes
app.use("/api/tasks", tasksRoutes);
app.use("/api/auth", authRoutes);


// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
