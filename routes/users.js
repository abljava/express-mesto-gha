const router = require('express').Router();
const {
  validateEditUser,
  validateEditAvatar,
  validateUserId,
} = require('../middlewares/celebrate');

const {
  getUserInfo,
  getUsers,
  getUserById,
  editUser,
  editAvatar,
} = require('../controllers/users');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);
router.patch('/me', validateEditUser, editUser);
router.patch('/me/avatar', validateEditAvatar, editAvatar);

module.exports = router;
