const bcrypt = require('bcrypt');
const user = require('../models/UserModel');
const SALT_ROUNDS = 10;

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password)
        return res.status(400).json({ message: 'Champs manquants' });

    try {
        // Génération du salt
        const salt = await bcrypt.genSalt(SALT_ROUNDS);

        // Hash du mot de passe avec le salt
        const passwordHash = await bcrypt.hash(password, salt);

        await user.create(username, email, passwordHash);
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};


//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const u = await user.findByEmail(email);
        if (!u) return res.status(401).json({ message: 'Identifiants invalides' });

        const valid = await bcrypt.compare(password, u.password);
        if (!valid) return res.status(401).json({ message: 'Identifiants invalides' });

        req.session.userId = u.id;
        res.json({ message: 'Connexion réussie' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
