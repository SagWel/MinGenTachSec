const bcrypt = require('bcrypt');
const user = require('../models/UserModel');

exports.register = async (req, res) => {
    const { pseudo, email, motDePasse } = req.body;

//création de compte
    if (!pseudo || !email || !motDePasse)
        return res.status(400).json({ message: 'Champs manquants' });

    try {
        const motDePasseHash = await bcrypt.hash(motDePasse, 10);
        await user.create(pseudo, email, motDePasseHash);
        res.status(201).json({ message: 'Utilisateur créé' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur', error: err.message });
    }
};

//login
exports.login = async (req, res) => {
    const { email, motDePasse } = req.body;

    try {
        const u = await user.findByEmail(email);
        if (!u) return res.status(401).json({ message: 'Identifiants invalides' });

        const valid = await bcrypt.compare(motDePasse, u.password);
        if (!valid) return res.status(401).json({ message: 'Identifiants invalides' });

        req.session.userId = u.id;
        res.json({ message: 'Connexion réussie' });
    } catch (err) {
        res.status(500).json({ message: 'Erreur serveur' });
    }
};
