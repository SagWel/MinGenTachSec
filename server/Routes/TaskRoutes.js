const express = require(`express`);
const TaskController = require("../Controllers/TaskController");
const router = express.Router();

router.get("/api/tasks/:userId", TaskController.getAll);
router.get("/api/tasks/:userId/:id", TaskController.getById);
router.post("/api/tasks/:userId", TaskController.create);
router.put("/api/tasks/:id", TaskController.update);
router.delete("/api/tasks/:id", TaskController.delete);

module.exports = router;
