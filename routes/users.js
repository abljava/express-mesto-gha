const router = require('express').Router();
const {
  createUser, getUsers, getUserById, editUser, editAvatar,
} = require('../controllers/users');

router.post('/', createUser);
router.get('/', getUsers);
router.get('/:userId', getUserById);
router.patch('/me', editUser);
router.patch('/me/avatar', editAvatar);

module.exports = router;
