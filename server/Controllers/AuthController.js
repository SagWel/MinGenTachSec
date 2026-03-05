require(`dotenv`).config();
const bcrypt = require("bcrypt");
const user = require("../models/UserModel");
const SALT_ROUNDS = 10;
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password)
    return res.status(400).json({ message: "Champs manquants" });

  try {
    // Génération du salt
    const salt = await bcrypt.genSalt(SALT_ROUNDS);

    // Hash du mot de passe avec le salt
    const passwordHash = await bcrypt.hash(password, salt);

    const res = await user.create(username, email, passwordHash);
    if (res) {
      const userAuth = await user.findByEmail(email);
      if (userAuth) {
        const payload = JSON.stringify({
          id: userAuth.id,
          username: userAuth.username,
          email: userAuth.email,
          iat: new Date(),
        });
        const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: "24h" });
        res.cookie(auth_token, token, {
          maxAge: 86400 * 1000,
          path: "/",
          secure: false,
          httpOnly: true,
          sameSite: "Lax",
        });
      }
    }
    res.status(201).json({
      message: "Utilisateur créé",
      user: {
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
    if (!u) return res.status(401).json({ message: "Identifiants invalides" });

    const valid = await bcrypt.compare(password, u.password);
    if (!valid)
      return res.status(401).json({ message: "Identifiants invalides" });

    const payload = JSON.stringify({
      id: userAuth.id,
      username: userAuth.username,
      email: userAuth.email,
      iat: new Date(),
    });
    const token = jwt.sign(payload, SESSION_SECRET, { expiresIn: "24h" });
    res.cookie(auth_token, token, {
      maxAge: 86400 * 1000,
      path: "/",
      secure: false,
      httpOnly: true,
      sameSite: "Lax",
    });

    res.status(201).json({
      message: "Utilisateur créé",
      user: {
        username: userAuth.username,
        email: userAuth.email,
      },
      isAuth: true,
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur :", err });
  }
};

exports.context = async (req, res) => {
  const token = await cookieStore.get("auth_token").value;
  if (!token) {
    res.status(500).json({
      message: "Aucun token trouvé",
      user: null,
      isAuth: false,
    });
    return;
  }

  const payload = jwt.decode(token);

  const userAuth = await user.findByEmail(payload.email);

  if (!userAuth) {
    res.status(500).json({
      message: "Aucun utilisateur trouvé",
      user: null,
      isAuth: false,
    });
    return;
  }

  res.status(200).json({
    message: "Token valide",
    user: {
      username: userAuth.username,
      email: userAuth.email,
    },
    isAuth: true,
  });
};

exports.logout = async (req, res) => {
  cookieStore.delete("auth_token");
  res.status(200).json({
    isAuth: false,
    user: null,
    message: "déconnexion effectée",
  });
};
