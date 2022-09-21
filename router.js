const { Router } = require("express");
const UserController = require("./controllers/user.controller");
const TaskController = require("./controllers/task.controller");
const { checkUser } = require("./middlewares/user.middleware");
const router = Router();

router.post("/users", UserController.createUser);
router.get("/users", UserController.getAllUsers);

router.patch("/users/:userId", UserController.updateUser);
router.get("/users/:userId", UserController.findUserByPk);
router.delete("/users/:userId", checkUser, UserController.deleteUserInstance);

router.patch("/users/:userId/v2", checkUser, UserController.updateUserInstance);

router.post("/users/:userId/tasks", checkUser, TaskController.createTask);
router.get("/users/:userId/tasks", checkUser, TaskController.getTasksByUser);

router.get("/users/:userId/tasks", checkUser, TaskController.getTasksByUser);

module.exports = router;
