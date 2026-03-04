const db = require('../config/db');

const user = {
    // Création d'un utilisateur
    async create(username, email, motDePasseHash) {
        const [result] = await db.execute(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, motDePasseHash]
        );
        return result;
    },

    async findByEmail(email) {
        const [result] = await db.execute(
            `SELECT * FROM users WHERE email = ?`, [email]
        )
        return result;
    }
};

module.exports = user;
