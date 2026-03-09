const TaskModel = require(`../models/Taskmodel`);


const TaskController = {
    // GET
    async getAll(req, res, next) {
        try {
            const { userId } = req.params
            
            const tasks = await TaskModel.findAll(userId);
            res.json(tasks);
        } catch (err) {
            next(err);
        }
    },

    // GET by id
    async getById(req, res, next) {
        try {
            const { id } = req.params;
            const post = await TaskModel.findById(id);

            if (!task) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }

            res.json(post);
        } catch (err) {
            next(err);
        }
    },

    // POST
    async create(req, res, next) {
        try {
            const { title, description } = req.body;
            
            const { userId } = req.params
            
            if (!title || !description) {
                return res.status(400).json({
                    message: 'Titre et descrption requis'
                });
            }

            const insertId = await TaskModel.create(userId, { title, description });

            res.status(201).json({
                message: 'Tâche ajoutée',
                id: insertId
            });
        } catch (err) {
            next(err);
        }
    },

    // PUT
    async update(req, res, next) {
        try {
            const { id } = req.params;
            const { title, description } = req.body;

            const affectedRows = await TaskModel.update(id, { title, description });

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }

            res.json({ message: 'Tâche mise à jour' });
        } catch (err) {
            next(err);
        }
    },

    // DELETE
    async delete(req, res, next) {
        try {
            const { id } = req.params;

            const affectedRows = await TaskModel.delete(id);

            if (affectedRows === 0) {
                return res.status(404).json({ message: 'Tâche non trouvée' });
            }

            res.json({ message: 'Tâche supprimée' });
        } catch (err) {
            next(err);
        }
    }
};

module.exports = TaskController;


