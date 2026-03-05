const db = require('../config/db');

const user = {
    // Création d'un utilisateur
    async create(username, email, motDePasseHash) {
        const [result] = await db.query(
            'INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)',
            [username, email, motDePasseHash]
        );
        return result[0];
    },

    async findByEmail(email) {
        const [result] = await db.query(
            `SELECT * FROM users WHERE email = ?`, [email]
        )        
        return result[0];
    }
};

module.exports = user;
