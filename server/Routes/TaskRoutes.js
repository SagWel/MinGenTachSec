const express = require(`express`);
<<<<<<< HEAD
const TaskController = require('../Controllers/TaskController');
=======
const TaskController = require("../Controllers/TaskController");
>>>>>>> Nicolas
const router = express.Router();

router.get("/api/tasks", TaskController.getAll);
router.get("/api/tasks/:id", TaskController.getById);
router.post("/api/tasks", TaskController.create);
router.put("/api/tasks/:id", TaskController.update);
router.delete("/api/tasks/:id", TaskController.delete);

module.exports = router;
