const db = require(`../config/db`);

(async () => {
  try {
    await db.query('SELECT 1');
    console.log('✅ Base de données connectée');
  } catch (err) {
    console.error('❌ BDD indisponible', err);
  }
})();

const TaskModel = {
  //récupère toutes les taches
  async findall(userId) {
    try {
      const [rows] = await db.query(
          'SELECT * FROM tasks WHERE user_id = ?', [userId]
        );
        return rows[0];
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
  async create({ titre, description }) {
    const [result] = await db.query(
      "INSERT INTO tasks (title, description) VALUES (?, ?)",
      [titre, description],
    );
    return result.insertId;
  },

  // Mettre à jour une tache
  async update(id, { titre, description }) {
    const [result] = await db.query(
      "UPDATE tasks SET title = ?, description = ? WHERE id = ?",
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
