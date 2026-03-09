require(`dotenv`).config();
const bcrypt = require("bcrypt");
const user = require("../models/UserModel");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");

const SESSION_SECRET = process.env.SESSION_SECRET;

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  try {
    // Génération du salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    console.log("stop");

    // Hash du mot de passe avec le salt
    const passwordHash = await bcrypt.hash(password, salt);
    console.log("stop1");

    const creatUser = await user.create(username, email, passwordHash);
    console.log("stop2");

    if (!creatUser) {
      return res.status(400).json({
        message: "Utilisateur non crée",
        user: null,
        isAuth: false,
      });
    }

    console.log("stop3");
    const userAuth = await user.findByEmail(email);

    console.log("stop3,5");

    if (!userAuth) {
      return res.status(404).json({
        message: "Utilisateur non trouvé aprés création",
        user: null,
        isAuth: false,
      });
    }

    console.log("stop4");
    const payload = {
      id: userAuth.id,
      username: userAuth.username,
      email: userAuth.email,
    };
    console.log("stop5");

    const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: "24h" });
    console.log("stop6");

    res.cookie("auth_token", token, {
      maxAge: 86400 * 1000,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    });
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        id: userAuth.id,
        username: userAuth.username,
        email: userAuth.email,
      },
      isAuth: true,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Erreur serveur", error: err.message, isAuth: false });
  }
};

//login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const u = await user.findByEmail(email);
    if (!u)
      return res.status(401).json({ message: "Identifiants invalides email" });

    const valid = await bcrypt.compare(password, u.password_hash);
    if (!valid)
      return res
        .status(401)
        .json({ message: "Identifiants invalides password" });

    const payload = {
      id: u.id,
      username: u.username,
      email: u.email,
    };

    const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: "24h" });

    res.cookie("auth_token", token, {
      maxAge: 86400 * 1000,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    });

    console.log(u);

    res.status(201).json({
      message: "Connexion réussi",
      user: {
        id: u.id,
        username: u.username,
        email: u.email,
      },
      isAuth: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Erreur lors de la tentative de connexion",
      erreur: err,
    });
  }
};

exports.context = async (req, res) => {
  const token = req.cookies["auth_token"];
  if (!token) {
    res.status(200).json({
      message: "Aucun token trouvé",
      user: null,
      isAuth: false,
    });
  }

  try {
    const decodedToken = jwt.verify(token, SESSION_SECRET);
    const userAuth = await user.findByEmail(decodedToken.email);

    if (!userAuth) {
      res.status(200).json({
        message: "Aucun utilisateur trouvé",
        user: null,
        isAuth: false,
      });
    }

    res.status(200).json({
      message: "Token valide",
      user: {
        id: userAuth.id,
        username: userAuth.username,
        email: userAuth.email,
      },
      isAuth: true,
    });
  } catch (error) {
    res.status(401).json({
      message: "Token invalide",
      isAuth: false,
      error: error,
    });
  }
};

exports.logout = async (req, res) => {
  res.clearCookie("auth_token");
  res.status(200).json({
    isAuth: false,
    user: null,
    message: "déconnexion effectée",
  });
};
