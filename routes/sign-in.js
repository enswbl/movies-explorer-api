const usersRouter = require('express').Router();

const { login } = require('../controllers/users');

const { loginValidation } = require('../middlewares/validation');

usersRouter.post('/signin', loginValidation, login);

module.exports = usersRouter;
