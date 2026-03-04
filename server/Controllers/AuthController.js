const bcrypt = require('bcrypt');
const user = require('../models/UserModel');

exports.register = async (req, res) => {
    const { username, email, password } = req.body;

//création de compte
    if (!username || !email || !password)
        return res.status(400).json({ message: 'Champs manquants' });

    try {
        const passwordHash = await bcrypt.hash(password, 10);
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
