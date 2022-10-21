const { Router } = require('express');
const TaskController = require('../controllers/task.controller');
const { checkTask } = require('../middlewares/task.middleware');
const { paginate } = require('../middlewares/paginate.mw');
const taskRouter = Router();

taskRouter.get('/', paginate, TaskController.getAllTasks);

taskRouter.delete('/:taskId', checkTask, TaskController.deleteTaskById);
taskRouter.patch('/:taskId', checkTask, TaskController.updateTaskById);

module.exports = taskRouter;
