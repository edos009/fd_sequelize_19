const path = require('path');
const { Router } = require('express');
const multer = require('multer');
const GroupController = require('../controllers/group.controller');
const { checkUser } = require('../middlewares/user.middleware');
const { checkGroup } = require('../middlewares/group.mw');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../public/images'));
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

const groupRouter = Router();

groupRouter.post('/', checkUser, GroupController.createGroup);
groupRouter.get('/', GroupController.getAllGroups);
groupRouter.get('/:groupId', GroupController.getAllUserFromGroup);
groupRouter.patch(
  '/:groupId',
  checkUser,
  checkGroup,
  GroupController.addUserToGroup
);
groupRouter.delete('/:groupId', checkGroup, GroupController.deleteGroup);
groupRouter.post(
  '/:groupId/image',
  upload.single('image'),
  checkGroup,
  GroupController.addGroupImage
);

module.exports = groupRouter;
