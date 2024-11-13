const express = require('express')
const router = express.Router();
const userController = require('../controllers/userController')
const auth = require('../middlewares/auth');
const authenticationController = require('../controllers/authenticationController')

// Public Routs.......
router.post('/register', authenticationController.register)
router.post('/login', authenticationController.login)

router.post('/users', userController.createUser);
router.get('/users/:id', auth , userController.getUser)
router.put('/users/:id', auth , userController.updateUser);
router.delete('/users/:id', auth , userController.deleteUser)

module.exports = router;
  