const db = require('../config/db');

const user = {
    // Création d'un utilisateur
    async create(pseudo, email, motDePasseHash) {
        const [result] = await db.execute(
            'INSERT INTO users (pseudo, email, password) VALUES (?, ?, ?)',
            [pseudo, email, motDePasseHash]
        );
        return result;
    },

};

module.exports = user;
