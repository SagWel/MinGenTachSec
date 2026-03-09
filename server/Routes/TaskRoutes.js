const express = require(`express`);
const TaskController = require("../Controllers/TaskController");
const router = express.Router();

router.get("/:userId", TaskController.getAll);
router.get("/:userId/:id", TaskController.getById);
router.post("/:userId", TaskController.create);
router.put("/:id", TaskController.update);
router.delete("/:id", TaskController.delete);

module.exports = router;
