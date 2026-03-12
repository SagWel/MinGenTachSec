const db = require(`../config/db`);

const TaskModel = {
  //récupère toutes les taches
  async findAll(userId) {
    try {
      const [rows] = await db.query(
          'SELECT * FROM tasks WHERE user_id = ?', [userId]
        );
        
        return rows;
    } catch (err) {
      console.error("Erreur lors de la récupèration des taches de l'utilisateur :", err);      
    }
  },

  // Récupérer une tache par ID
  async findById(id) {
    const [rows] = await db.query(
      'SELECT id, title, description FROM tasks WHERE id = ?',
      [id],
    );
    return rows[0];
  },

  // Créer une nouvelle tache
  async create(userId, { title, description }) {
    const [result] = await db.query(
      "INSERT INTO tasks (title, description, user_id) VALUES (?, ?, ?)",
      [title, description, userId],
    );
    return result.insertId;
  },

  // Mettre à jour une tache
  async update(id, { title, description }) {
    const [result] = await db.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
      [title, description, id],
    );
    return result.affectedRows;
  },

  // Supprimer une tache
  async delete(id) {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);
    return result.affectedRows;
  },
};
module.exports = TaskModel;
