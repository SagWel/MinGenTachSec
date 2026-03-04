const db = require(`../config/db`);

const TaskModel = {
  //récupère toutes les taches
  async findall() {
    const [rows] = await db
      .query
      // 'SELECT id, titre, description FROM TASK'
      ();
    return rows;
  },

  // Récupérer une tache par ID
  async findById(id) {
    const [rows] = await db.query(
      // 'SELECT id, titre, description FROM TASK WHERE id = ?',
      [id],
    );
    return rows[0];
  },

  // Créer une nouvelle tache
  async create({ titre, description }) {
    const [result] = await db.query(
      "INSERT INTO tasks (titre, descrition) VALUES (?, ?)",
      [titre, description],
    );
    return result.insertId;
  },

  // Mettre à jour une tache
  async update(id, { titre, description }) {
    const [result] = await db.query(
      "UPDATE tasks SET titre = ?, description = ? WHERE id = ?",
      [titre, description, id],
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
