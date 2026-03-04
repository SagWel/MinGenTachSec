const express = require(`express`);
const PostController = require('../Controllers/TaskController');
const router = express.Router();


router.get('/api/tasks', TaskController.getAll);
router.get('/api/tasks/:id', TaskController.getById);
router.post('/api/tasks', TaskController.create);
router.put('/api/tasks/:id', TaskController.update);
router.delete('/api/tasks/:id', TaskController.delete);

module.exports = router;
